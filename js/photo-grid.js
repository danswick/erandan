---
---


function buildGalleryFromFlickrAlbum(apiKey, albumID, userId){
	// Build AJAX request 
	var requestURL = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + apiKey + "&photoset_id=" + albumID + "&user_id=" + userId + "&format=json&nojsoncallback=1";

	$.ajax({
		url: requestURL,
		type: "GET",
		dataType: "JSON"
	}).done(function(data){ return buildGallery(data); });
    
    // On AJAX callback, iterate through images and 
    function buildGallery(data) {
      var photoArray = data.photoset.photo;
      console.log(photoArray);

      // Map square and large URLs onto photo array 
      function mapPhotoUrls(photos) {
      	return photos.map(function(photo){
      		// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
      		photo.squareUrl = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_q.jpg";
      		photo.largeUrl = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
      		return photo;
      	});
      }

      var photosWithUrls = mapPhotoUrls(photoArray);
      var photoContainer = $(".photos-container")[0];

      // Build image elements for square thumbnails 
      for (i = 0; i < photosWithUrls.length; i++) {
      	var currentPicture = photosWithUrls[i];

      	var currentEl = "<div class='thumbnail-container'><img class='thumbnail' src='" + currentPicture.squareUrl + "' alt='" + currentPicture.title + "' data-largeUrl='" + currentPicture.largeUrl + "' data-id='" + currentPicture.id + "' data-index='" + i + "'></div>";
      	
      	$(photoContainer).append(currentEl);
      }

      setThumbnailClick();
    }

  // If modal is open, 
  	// Use data-index to get photo object & largeUrl from master photo array

  // On left and right arrows, move to previous or next image in image array
}

function setThumbnailClick() {
	$('img.thumbnail').click(function(){
		var el = this;
		setImageAndFlickrLink(el);
		setKeyboardBrowse();
		modal.classList.toggle('closed');
	});
}

function setKeyboardBrowse() {
	$(document).on('keydown', function(e) {
		switch(e.which) {
			case 37: // left
				moveImage("left");
			break;
			case 39: // right
				moveImage("right");
			break;

			case 27: // esc
				modal.classList.toggle('closed');
				$(document).off('keydown');
			break;

			default: return;
		}
		e.preventDefault();
	});
}

function setImageAndFlickrLink(el) {

	var bigUrl = $(el).data().largeurl;
	var imageIndex = $(el).data().index;
	var $modalImageEl = $($('.modal-container img')[0]);
	/*modalOverlay.classList.toggle('closed');*/

	// Add img element to modal content 
	$modalImageEl.attr('src', bigUrl);
	$modalImageEl.data('imageIndex', imageIndex);
	// Add link to flickr page to modal content 
	// template -- https://www.flickr.com/photos/{flickr_user_id}/{photo_id}
	var flickrLink = "<a target='_blank' href='https://www.flickr.com/photos/" + flickrUserId + "/" + $(el).data().id + "'>Flickr page</a>";

	$('.modal-image-description').html(flickrLink);
}

function moveImage(leftOrRight) {
	var direction = leftOrRight;
	var currentIndex = $('.modal .modal-container img').data().imageIndex;

	if(direction == 'left') {
		var nextIndex = currentIndex - 1;
		if (nextIndex >= 0) {
			var nextThumbnailToClick = $('.thumbnail')[nextIndex];
			setImageAndFlickrLink(nextThumbnailToClick);	
		} else {
			modal.classList.toggle('closed');
			$(document).off('keydown');
		}
	} else {
		var nextIndex = currentIndex + 1;
		if (nextIndex <= $('.thumbnail').length - 1) {
			var nextThumbnailToClick = $('.thumbnail')[nextIndex];
			setImageAndFlickrLink(nextThumbnailToClick);	
		} else {
			modal.classList.toggle('closed');
			$(document).off('keydown');
		}
	}
}

var modal = document.querySelector('#modal');
var modalOverlay = document.querySelector('#modalOverlay');

modal.addEventListener("click", function(){
	modal.classList.toggle('closed');
	$(document).off('keydown');
	/*modalOverlay.classList.toggle('closed');*/
});















