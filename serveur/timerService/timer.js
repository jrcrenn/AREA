const fetch = require('node-fetch');

setTimeout(timer, 6000)

function timer() {
    var day = new Date().getDay()
    var date = [new Date().getDate(), new Date().getMonth() + 1]
    var hour = [new Date().getHours() + 1, new Date().getMinutes()]
    if (hour[0] == 24)
        hour[0] = 0
    console.log(day, date, hour)
    fetch("https://area.pinteed.com/services/timer/subscriptions", {
        method: "GET"
    })
    .then((resp) => {
        resp.json()
        .then(function(result) {
            result.data.forEach(element => {
                console.log(element)
                var bool = false;
                var param = ""
                if (element.subtype == 1) {
                    param = element.day
                    if (element.day.toLowerCase() == "monday" && day == 1)
                        bool = true;
                    if (element.day.toLowerCase() == "tuesday" && day == 2)
                        bool = true;
                    if (element.day.toLowerCase() == "wednesday" && day == 3)
                        bool = true;
                    if (element.day.toLowerCase() == "thursday" && day == 4)
                        bool = true;
                    if (element.day.toLowerCase() == "friday" && day == 5)
                        bool = true;
                    if (element.day.toLowerCase() == "saturday" && day == 6)
                        bool = true;
                    if (element.day.toLowerCase() == "sunday" && day == 7)
                        bool = true;
                } else if (element.subtype == 2) {
                    param = element.date
                    var parsed = element.date.split("/");
                    if (parsed[0] == date[0] && parsed[1] == date[1])
                        bool = true;
                } else if (element.subtype == 3) {
                    param = element.hour
                    var splited = element.hour.split(":");
                    if (splited[0] == hour[0] && splited[1] == hour[1])
                        bool = true;
                } else if (element.subtype == 4) {
                    param = element.later
                    if (element.later + element.now <= (Date.now() / 1000))
                        bool = true
                }
                console.log(bool)
                if (bool) {
                    fetch("https://area.pinteed.com/webhook/timer?id=" + String(element.id) + "&areaId=" + String(element.area_id) + "&type=" + String(element.subtype) + "&param=" + param, {
                        method: "GET"
                    }).then(() => {
                        console.log("server notified: area_id:" + String(element.area_id))
                        fetch("https://area.pinteed.com/services/timer/subscription?id=" + element.id, {
                            method: "DELETE"
                        })
                    })
                    
                }
            });
        })
    })
    setTimeout(timer, 10000)
}