async function getUserInfo(userId, attempt, resp) {
    if (resp !== "" && resp !== undefined && resp !== null && resp !== "undefined" && resp !== "null" && resp !== "Error: HTTP error! Status: 429" && resp !== "Error: HTTP error! Status: 500" && resp !== "Error: HTTP error! Status: 502" && resp !== "Error: HTTP error! Status: 503" && resp !== "Error: HTTP error! Status: 504") { 
        return resp;
    }
    try {
        const response = await fetch(`https://users.roproxy.com/v1/users/${userId}`);

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            return getUserInfo(userId, attempt+1, resp)
        } else {
            const data = await response.json();
            return data;
        }      
    } catch (error) {
        console.error('Error fetching user info:', error);
        return getUserInfo(userId, attempt+1, resp)
    }
}

async function getRobloxUid(username) {
    try {
        const response = await fetch('https://users.roproxy.com/v1/usernames/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                usernames: [username],
                excludeBannedUsers: true
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.data && data.data.length > 0) {
            return data.data[0].id;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user ID:', error);
        return {}
    }
}

async function getAwardedBadges(userId, badgeString) {
    try {
        const response = await fetch(`https://badges.roproxy.com/v1/users/${userId}/badges/awarded-dates?badgeIds=`+badgeString);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            const data = await response.json();
            return data
        }
    } catch (error) {
        console.error('Error fetching user badges:', error);
        return {}
    }
}

async function getUserBadges(userId, cursor) {
    if (cursor === "" || cursor === undefined || cursor === null || cursor === "undefined" || cursor === "null") {
        cursor = "";
    }
    try {
        const response = await fetch(`https://badges.roproxy.com/v1/users/${userId}/badges?limit=100&cursor=${cursor}&sortOrder=Asc`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            const data = await response.json();
            return data;
        }

        
    } catch (error) {
        console.error('Error fetching user badges:', error);
        return {}
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadAllBadges(userId) {
    let cursor = null;
    loadingFooter();
    while (true) {
        badgesData = [];
        badgesIds = [];
        requestStringUrl = ""

        var badges; 
        
        for (i = 0; i < 30; i++) {
            badges = await getUserBadges(userId, cursor);
            if (badges.data.length > 0) {
                break;
            }
            await wait(2000);
        }
        

        if (badges.data.length === 0) {
            break;
        }

        for (const badge of badges.data) {
            badgesData.push(badge);
            badgesIds.push(badge.id);
            requestStringUrl += badge.id + ",";
        }

        cursor = badges.nextPageCursor

        var badges2; 
        
        for (i = 0; i < 30; i++) {
            badges2 = await getAwardedBadges(userId, requestStringUrl);
            if (badges2.data.length > 0) {
                break;
            }
            await wait(2000);
        }
        
        var tempIndex = 0;
        for (const badge of badges2.data) {
            badgesData[tempIndex]["awardedDate"] = new Date(badge.awardedDate);
            badgesData[tempIndex]["created"] = new Date(badgesData[tempIndex]["created"]);
            allBadgesData[badge.badgeId] = badgesData[tempIndex];
            allDaysInBetween[getStringData(new Date(badge.awardedDate))]["badges"].push(badge.badgeId);
            tempIndex += 1;
        }
        setCalendarUI();

        if (cursor === null || cursor === undefined || cursor === "undefined" || cursor === "null" || cursor === "") {
            createFooterMessage("LOADING BADGES HAS COMPLETED, NUMBER OF BADGES: "+  Object.keys(allBadgesData).length, 'success');
            badgesLoaded = true;
            break;
        }
    }
}
