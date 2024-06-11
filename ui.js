function getParameterByName(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

document.addEventListener("DOMContentLoaded", function() {
    if (username == null || username == '' || uid == null || uid == '') {
        openPopup();
    } else {
        try {
            getUserInfo(uid,0,"").then((userInfo) => {
                console.log(userInfo);
                document.getElementById("footer").textContent = `${username} (${uid}) | yyyy/mm/dd – yyyy/mm/dd | 0 total badges | 0 badges this month | Roblox Badges Calendar – ProfiPoint © 2024`;
                calendarInit(uid, userInfo.created);
                loadAllBadges(uid);
            });
        } catch (error) { 
            console.error('Error setting username:', error);
        }
        
    }
});

function includeImages() {
    alert('Include Images: ' + document.getElementById('includeImages').value);
}

async function searchUsername() {
    var username = document.getElementById('username').value;
    if (username == '' || username == null) {
        alert('Please enter a valid username');
        return;
    } else {
        try {
            var uid;
            for (i = 0; i < 30; i++) {
                uid = await getRobloxUid(username);
                if (uid) {
                    break;
                }
                await wait(2000);
            }

            if (uid) {
                var url = window.location.href + '?username=' + username + '&uid=' + uid + '&labOnly=' + document.getElementById('labOnlyBadges').checked;
                window.location.href = url;
            } else {
                alert('No user ID found');
            }
        } catch (error) {
            alert('Error occurred while searching for user ID');
            console.error(error);
        }
    }
}

async function createFooterMessage(message, type) {
    var footerMessage = document.getElementById('footer');
    // save the current text, change it to the error message and to red color, wait 5 seconds and then change it back to the original text if the text has not changed and return the color to white no matter what>
    var originalText = footerMessage.textContent;
    var originalColor = footerMessage.style.color;
    footerMessage.textContent = message;
    footerMessage.style.color = type === 'error' ? 'red' : 'green';
    setTimeout(function() {
        if (footerMessage.textContent === message) {
            footerMessage.textContent = originalText;
        }
        footerMessage.style.color = originalColor;
    }, 6000);
}

async function loadingFooter(){
    while (true) {
        var textUpdated = false;
        for (n = 0; n < 3; n++) {
            messageContent = document.getElementById('footer').textContent;
            for (i = 0; i < 4; i++) {
                for (t = 0; t < 20; t++){
                    document.getElementById('footer').textContent = "[Loading" + ".".repeat(i) + "] " + messageContent;
                    await wait(50);
                    if (badgesLoaded){
                        return;
                    }
                    if (document.getElementById('footer').textContent != "[Loading" + ".".repeat(i) + "] " + messageContent) {
                        messageContent = document.getElementById('footer').textContent;
                        textUpdated = true;
                    } 
                }
            }
            document.getElementById('footer').textContent = messageContent;
        }
        if (!textUpdated) {
            createFooterMessage("LOADING BADGES ERROR (api/proxy issues)", "error")
            break;
        }
    }
}