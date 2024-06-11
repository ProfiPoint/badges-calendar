function getStringData(date) {
    //return yyyy-mm-dd
    return date.toISOString().split('T')[0];
}

function calendarInit(uid, created) {
    startDate = new Date(created);

    var diffTime = Math.abs(currentDate - startDate);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    for (i = 0; i < diffDays; i++) {
        var newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + i);
        allDaysInBetween[getStringData(newDate)] = {"year": newDate.getFullYear(), "month": [newDate.getMonth() + 1], "monthIndex":newDate.getMonth()+1 , "day": newDate.getDate(), "dayOfWeek": newDate.toDateString().split(' ')[0], "dayOfWeekIndex": dayIndexR[newDate.toDateString().split(' ')[0]], "special": 0, "badges": []};
       
        calendarMonths[newDate.getMonth() + 1 +","+ newDate.getFullYear()] = [];
       
        if (i == 0) {
            allDaysInBetween[getStringData(newDate)]["special"] = -1;
        }
        if (i == diffDays - 1) {
            allDaysInBetween[getStringData(newDate)]["special"] = 1;
        }
    }

    //check if "2020-01" is in Object.keys(calendarMonths) if so get the index of it else set it to 0
    var tempIndexYYMMUrl = Object.keys(calendarMonths).indexOf(urlYM);
    if (tempIndexYYMMUrl != -1) {
        calendarMonthsINDEX = tempIndexYYMMUrl;
    }


    resetBadgeIcons();
    setCalendarUI();
    setCurrentMonthBadgeIcons();
}

function addImageToCell(cellId, imageUrl,badgeId) {
    const cell = document.getElementById(cellId);
    const container = cell.querySelector('.image-container');
    const img = document.createElement('img');
    var isDefault = true;

    //check if badgeid = [1651,651,321,6544,65165] is in badgeUploadedIcons
    if (labBadges.includes(badgeId)) {
        img.src = `./assets/${badgeId}.png`;
        isDefault = false;
    } else if (badgeUploadedIcons.includes(badgeId) && labOnly != "true") {
        img.src = `./assets/${badgeId}.png`;
        isDefault = false;
    } else { 
        img.src = imageUrl;
    }

    //store somehow in the img the badge id
    img.onclick = function() {
        badgeClicked(badgeId, isDefault);
    }

    container.appendChild(img);
    allBadgeIcons.push(img);
}

function resetBadgeIcons() {
    allBadgeIcons.forEach((img) => {
        img.remove();
    });
    allBadgeIcons = [];
}

function previousMonth() {
    calendarMonthsINDEX -= 1;
    if (calendarMonthsINDEX < 0) {
        calendarMonthsINDEX = 0;
    } else {
        resetBadgeIcons();
        setCalendarUI();
        setCurrentMonthBadgeIcons();
    }
}

function nextMonth() {
    calendarMonthsINDEX += 1;
    if (calendarMonthsINDEX > Object.keys(calendarMonths).length-1) {
        calendarMonthsINDEX = Object.keys(calendarMonths).length-1;
    } else {
        resetBadgeIcons();
        setCalendarUI();
        setCurrentMonthBadgeIcons();
    }
}

function setCurrentMonthBadgeIcons() {
    var indexMMYYYY = Object.keys(calendarMonths)[calendarMonthsINDEX].split(",");
    var curMonth = parseInt(indexMMYYYY[0]);
    var curYear = parseInt(indexMMYYYY[1]);
    document.getElementById('month-year').textContent = monthIndex[curMonth] + " " + curYear;
}

function setCalendarUI() {
    var indexMMYYYY = Object.keys(calendarMonths)[calendarMonthsINDEX].split(",");
    var curMonth = parseInt(indexMMYYYY[0]);
    var curYear = parseInt(indexMMYYYY[1]);
    window.location.href = mainUrl + "#" + curYear + "-" + (curMonth + "").padStart(2, "0");
    for (i = 1; i <= 42; i++) {
        document.getElementById(`cell${i}`).textContent = '';
        document.getElementById(`cell${i}`).style.backgroundColor = '#303030';
    }

    var indexDay = 1;
    badgesThisMonth = 0;

    for (i = getFirstDayOfMonth(curYear, curMonth); i <= getNumberOfDaysInMonth(curYear, curMonth)+getFirstDayOfMonth(curYear, curMonth)-1; i++) {
        //check if the dd-mm-yyyy is in the allDaysInBetween
        const indexYYYYMMDD = curYear + "-" + (curMonth + "").padStart(2, "0") + "-" + (indexDay + "").padStart(2, "0")
        const isInRange = allDaysInBetween.hasOwnProperty(indexYYYYMMDD);
        if (isInRange) {
            const dayData = allDaysInBetween[indexYYYYMMDD];
            document.getElementById(`cell${i}`).innerHTML = indexDay+`<div class="image-container"></div>`;
            document.getElementById(`cell${i}`).style.backgroundColor = '#f0f0f0';
            if (dayData.special == -1 || dayData.special == 1) {
                document.getElementById(`cell${i}`).style.backgroundColor = '#ff5500';
            
            } else if (dayData.badges.length > 0) {
                document.getElementById(`cell${i}`).style.backgroundColor = '#ff9900';
                badgesThisMonth += dayData.badges.length;
                for (j = 0; j < dayData.badges.length; j++) {
                    addImageToCell(`cell${i}`, './assets/badge.png', dayData.badges[j]);
                }
            }
        }
        indexDay++;
    }
    document.getElementById("footer").textContent = `${username} (${uid}) | ${Object.keys(allDaysInBetween)[0].replace("-","/").replace("-","/")} – ${Object.keys(allDaysInBetween)[Object.keys(allDaysInBetween).length-1].replace("-","/").replace("-","/")} | ${Object.keys(allBadgesData).length} total badges | ${badgesThisMonth} badges this month | Roblox Badges Calendar – ProfiPoint © 2024`;
}

function getFirstDayOfMonth(year, month) {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    return dayOfWeek === 0 ? 7 : dayOfWeek;
}

function getNumberOfDaysInMonth(year, month) {
    const nextMonth = new Date(year, month, 1);
    nextMonth.setDate(nextMonth.getDate() - 1);
    return nextMonth.getDate();
}

