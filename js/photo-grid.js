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

      $(photoContainer).append(albumAttribution);
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
	var modalImageEl = new Image();
	var $modalImageEl = $(modalImageEl);
	var $modalContainer = $('.modal-container');
	$('.modal-container img')[0].remove();

	// Add img element to modal content 
	$modalImageEl.attr('src', bigUrl);
	$modalImageEl.data('imageIndex', imageIndex);
	$modalContainer.prepend($modalImageEl);
	// Add link to flickr page to modal content 
	// template -- https://www.flickr.com/photos/{flickr_user_id}/{photo_id}
	var flickrLink = "<a target='_blank' href='https://www.flickr.com/photos/" + flickrUserId + "/" + $(el).data().id + "'>Flickr page</a>";

	$('.modal-image-description').html(flickrLink);
	$modalImageEl.load(function() {
		isImagePortrait(this);
	});
	
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

function isImagePortrait(imageInQuestion) {
	var width = imageInQuestion.width;
	var height = imageInQuestion.height;

	if (width < height) {
		$(imageInQuestion).closest('.modal-container').addClass('vertical-image');
	} else {
		$(imageInQuestion).closest('.modal-container').removeClass('vertical-image');
	}
}

function resizeImageContainer(containerEl, imageInQuestion) {

	// determine if image is landscape or portrait
	// imageInQuestion.naturalWidth, imageInQuestion.naturalHeight

	// switch maxWidth, maxHeight, auto, etc

}

function handleSwipeGesture(gestureElement) {
	var touchstartX = 0;
	var touchstartY = 0;
	var touchendX = 0;
	var touchendY = 0;

	var gestureElementId = gestureElement.id;

	var gesuredZone = document.getElementById(gestureElementId);

	gesuredZone.addEventListener('touchstart', function(event) {
	    touchstartX = event.changedTouches[0].screenX;
	    touchstartY = event.changedTouches[0].screenY;
	}, false);

	gesuredZone.addEventListener('touchend', function(event) {
	    touchendX = event.changedTouches[0].screenX;
	    touchendY = event.changedTouches[0].screenY;
	    handleGesure();
	}, false); 

	function handleGesure() {
	    var swiped = 'swiped: ';
	    if (touchendX < touchstartX) {
	        moveImage('right');
	        return 'left';
	    }
	    if (touchendX > touchstartX) {
	        moveImage('left');
	        return 'right';
	    }
	    if (touchendY < touchstartY) {
	        return 'down';
	    }
	    if (touchendY > touchstartY) {
	        return 'up';
	    }
	    if (touchendY == touchstartY) {
	        return 'tap';
	    }
	}

}

handleSwipeGesture(document.getElementById('modalContainer'));
















