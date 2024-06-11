//when user preses ESC key close the badge info
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        document.getElementById('badge').style.display = 'none';
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowLeft") {
        previousMonth();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowRight") {
        nextMonth();
    }
});

function openPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    window.onerror = function(message, source, lineno, colno, error) {
        // Get the element by ID
        var errorPopup = document.querySelector('.error-popup');

        // Ensure the element exists before attempting to set its textContent
        if (errorPopup) {
            // Construct the error message
            var errorMessage = `Error: ${message} at ${source}:${lineno}:${colno}`;
            createFooterMessage(errorMessage, 'error');
            // Update the text of the element
            errorPopup.textContent = errorMessage;
        } else {
            console.error('Error popup element not found.');
        }

        // Return true to prevent the error from being logged in the console
        // Return false to allow the error to be logged in the console
        return false;
    };
});

function goToHome () {
    window.location.href = mainUrl.split('?')[0];
}