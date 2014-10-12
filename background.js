const NOTIFICATIONS_INTERVAL = 5000;

var feedUrl2contentLength = {};

function runNotificationsTimer(url, title, icon, text) {
    setInterval(function(){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function(e) {

            var oldContentLength = feedUrl2contentLength[url];

            if (!oldContentLength || oldContentLength != e.target.responseText.length) {
                showNotification(title, icon, text);

                feedUrl2contentLength[url] = e.target.responseText.length;
            }

        };
        xhr.send(null);
    }, 20000);
}

/* Creates an Entry to Google Calendar.
    
   Created by Vizay Soni(vs4vijay@gmail.com)
*/
function addToGoogleCalendar(info, tab) {
    //alert(JSON.stringify(info));
    var selectionText = info.selectionText;
    var googleCalendarUrl = "https://www.google.com/calendar/render?action=TEMPLATE&text=";
    chrome.tabs.create({
        "url" : googleCalendarUrl+selectionText,
        "selected" : true
    });
};

var parent = chrome.contextMenus.create({"title": "Add to Google Calendar", "contexts":["selection"], "onclick": addToGoogleCalendar});

function showNotification(title, icon, text) {
    var opt = {
        type: "basic",
        title: title,
        message: text,
        iconUrl : icon
    };

    chrome.notifications.create("alert-notification", opt, function(notificationId){
        setTimeout(function(){
            chrome.notifications.clear(notificationId, function(){});
        }, 5000);
    });
}


document.addEventListener('DOMContentLoaded', function () {
    
});