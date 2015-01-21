/**
  * Google Calendar Events - jQuery Plugin
  * By: CJ O'Hara
  * https://github.com/mmonkey/google_calendar_events
*/
Date.prototype.toISOString || !function() {
    function e(e) {
        var t = String(e);
        return 1 === t.length && (t = "0" + t), t;
    }
    Date.prototype.toISOString = function() {
        return this.getUTCFullYear() + "-" + e(this.getUTCMonth() + 1) + "-" + e(this.getUTCDate()) + "T" + e(this.getUTCHours()) + ":" + e(this.getUTCMinutes()) + ":" + e(this.getUTCSeconds()) + "." + String((this.getUTCMilliseconds() / 1e3).toFixed(3)).slice(2, 5) + "Z";
    };
}(), function(e) {
    e.GoogleCalendarEvents = function(t) {
        function n(n) {
            var l = n.items;
            e(t.element).html(""), t.displayCount && e(t.element).html(l.length + " upcoming events"), 
            //Create google event list
            e(t.element).append('<ul class="google_event_list"></ul>');
            for (var s = null, i = 0; i < l.length; i++) {
                var g = l[i], r = g.summary, p = new Date(g.start.dateTime), c = g.htmlLink, u = g.description, d = p.getDay(), _ = p.getMonth(), v = p.getFullYear(), h = p.getDate(), m = a[d], y = o[_], S = g.location, b = "am", f = p.getHours();
                f > 11 && (b = "pm"), f > 12 && (f -= 12), 0 === f && (f = 12);
                var L = p.getMinutes();
                L += "", 1 === L.length && (L = "0" + L);
                var T = f + ":" + L + b;
                t.groupDates ? (null === s && (s = new Array(d, _, v), e(t.element).children(".google_event_list").append('<li><span class="google_event_group_date">' + t.dateLabel + " " + m + " " + y + " " + h + '</span><ul class="google_event_group"></ul></li>')), 
                s.toString() === new Array(d, _, v).toString() ? (eventhtml = '<span class="google_event_title"><a href="' + c + '" rel="' + r + '">' + r + '</a></span> <span class="google_event_location">' + t.locationLabel + " " + S + '</span> <span class="google_event_description">' + t.descriptionLabel + " " + u + "</span> ", 
                e(t.element).find("ul.google_event_group").last().append("<li>" + eventhtml + "</li>")) : (s = new Array(d, _, v), 
                e(t.element).children(".google_event_list").append('<li><span class="google_event_group_date">' + t.dateLabel + " " + m + " " + y + " " + h + '</span><ul class="google_event_group"></ul></li>'), 
                eventhtml = '<span class="google_event_title"><a href="' + c + '" rel="' + r + '">' + r + '</a></span> <span class="google_event_location">' + t.locationLabel + " " + S + '</span> <span class="google_event_description">' + t.descriptionLabel + " " + u + "</span> ", 
                e(t.element).find("ul.google_event_group").last().append("<li>" + eventhtml + "</li>"))) : (eventhtml = '<span class="google_event_title"><a href="' + c + '" rel="' + r + '">' + r + '</a></span> <span class="google_event_date">' + t.dateLabel + " " + m + " " + y + " " + h + ", " + v + " " + T + '</span> <span class="google_event_location">' + t.locationLabel + " " + S + '</span> <span class="google_event_description">' + t.descriptionLabel + " " + u + "</span> ", 
                e(t.element).children(".google_event_list").append("<li>" + eventhtml + "</li>"));
            }
        }
        var l = {
            apiKey: "AIzaSyA4PFeb8HH5jSBgRUebGpxno_jByColDms",
            calendarId: "usa__en@holiday.calendar.google.com",
            element: "#gcal",
            maxResults: 10,
            displayCount: !0,
            dateLabel: "When:",
            locationLabel: "Where:",
            descriptionLabel: "",
            groupDates: !1
        };
        t = e.extend(l, t);
        //Day and Month Defaults
        var a = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"), o = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"), s = new Date().toISOString();
        e.getJSON("https://www.googleapis.com/calendar/v3/calendars/" + t.calendarId + "/events", {
            maxResults: t.maxResults,
            singleEvents: !0,
            orderBy: "startTime",
            timeMin: s,
            key: t.apiKey
        }).done(function(e) {
            n(e);
        });
    };
}(jQuery);