document.addEventListener("DOMContentLoaded", function() {
    var courseListItems = document.querySelectorAll('#courseList li');
    courseListItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var videoId = this.getAttribute('data-video');
            var description = this.getAttribute('data-description');
            changeVideo(videoId);
            updateCourseDescription(description);
        });
    });
});

function changeVideo(videoId) {
    var videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = '/uploads/' + videoId;
}

function updateCourseDescription(description) {
    var courseDescription = document.getElementById('courseDescription');
    courseDescription.textContent = description;
}
