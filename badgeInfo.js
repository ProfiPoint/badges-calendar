function closeButton() {
    document.getElementById('badge').style.display = 'none';
}

function getDifference(date1, date2) {
    var diff = date2 - date1;
    var diffSeconds = diff / 1000;
    var diffMinutes = diffSeconds / 60;
    var diffHours = diffMinutes / 60;
    var diffDays = diffHours / 24;
    var diffMonths = diffDays / 30;
    var diffYears = diffMonths / 12;

    if (diffYears >= 1) {
        return Math.floor(diffYears) + "y " + Math.floor(diffMonths % 12) + "m " + Math.floor(diffDays % 30) + "d" + " (" + Math.floor(diffDays) + " days)";
    } else if (diffMonths >= 1) {
        return Math.floor(diffMonths) + "m " + Math.floor(diffDays % 30) + "d" + " (" + Math.floor(diffDays) + " days)";
    } else if (diffDays >= 1) {
        return Math.floor(diffDays) + "d " + Math.floor(diffHours % 24) + "h" + " (" + Math.floor(diffHours) + " hours)";
    } else if (diffHours >= 1) {
        return Math.floor(diffHours) + "h " + Math.floor(diffMinutes % 60) + "m" + " (" + Math.floor(diffMinutes) + " minutes)";
    } else if (diffMinutes >= 1) {
        return Math.floor(diffMinutes) + "m " + Math.floor(diffSeconds % 60) + "s" + " (" + Math.floor(diffSeconds) + " seconds)";
    } else {
        return Math.floor(diffSeconds) + "s";
    }
}

function badgeClicked(badgeId, defaultBadge=true) {
    document.getElementById('badge').style.display = 'block';
    var badge = allBadgesData[badgeId];
    var badgeElement = document.getElementById('badge');
    badgeElement.style.display = 'block';
    badgeElement.querySelector('.badge-title').textContent = badge.name;
    document.getElementById("unlockedStatsV").textContent = getStringData(badge.awardedDate).replace("-","/").replace("-","/");
    document.getElementById("createdStatsV").textContent = getStringData(badge.created).replace("-","/").replace("-","/");;
    document.getElementById("differenceStatsV").textContent = getDifference(badge.created, badge.awardedDate);
    document.getElementById("gameStatsV").textContent = badge.awarder.id;
    document.getElementById("allAwardedStatsV").textContent = badge.statistics.awardedCount;
    document.getElementById("yesterdayAwardedStatsV").textContent = badge.statistics.pastDayAwardedCount;
    document.getElementById("percentageAwardedStatsV").textContent = Math.round(badge.statistics.winRatePercentage*10000)/100+"%";
    document.getElementById("idStatsV").textContent = badge.id;
    document.getElementById("enabledStatsV").textContent = badge.enabled;
    document.getElementById("descriptionStatsV").textContent = badge.description || "-";
    if (defaultBadge){
        document.getElementById("badge-info-image").src = "./assets/badge.png";
    } else {
        document.getElementById("badge-info-image").src = "./assets/" + badgeId + ".png";
    }
    
}

