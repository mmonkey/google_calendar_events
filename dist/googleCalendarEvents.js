/**
  * Google Calendar Events - jQuery Plugin
  * By: CJ O'Hara
  * https://github.com/mmonkey/google_calendar_events
*/
!function(e) {
    e.GoogleCalendarEvents = function(n) {
        function l(l) {
            var a = l.items;
            e(n.element).html(""), n.displayCount && e(n.element).html(a.length + " upcoming events"), 
            //Create google event list
            e(n.element).append('<ul class="google_event_list"></ul>');
            for (var s = null, g = 0; g < a.length; g++) {
                var i = a[g], p = i.summary, r = new Date(i.start.dateTime), c = i.htmlLink, _ = i.description, d = r.getDay(), u = r.getMonth(), v = r.getFullYear(), m = r.getDate(), h = t[d], y = o[u], b = i.location, L = "am", f = r.getHours();
                f > 11 && (L = "pm"), f > 12 && (f -= 12), 0 === f && (f = 12);
                var w = r.getMinutes();
                w += "", 1 === w.length && (w = "0" + w);
                var A = f + ":" + w + L;
                n.groupDates ? (null === s && (s = new Array(d, u, v), e(n.element).children(".google_event_list").append('<li><span class="google_event_group_date">' + n.dateLabel + " " + h + " " + y + " " + m + '</span><ul class="google_event_group"></ul></li>')), 
                s.toString() === new Array(d, u, v).toString() ? (eventhtml = '<span class="google_event_title"><a href="' + c + '" rel="' + p + '">' + p + '</a></span> <span class="google_event_location">' + n.locationLabel + " " + b + '</span> <span class="google_event_description">' + n.descriptionLabel + " " + _ + "</span> ", 
                e(n.element).find("ul.google_event_group").last().append("<li>" + eventhtml + "</li>")) : (s = new Array(d, u, v), 
                e(n.element).children(".google_event_list").append('<li><span class="google_event_group_date">' + n.dateLabel + " " + h + " " + y + " " + m + '</span><ul class="google_event_group"></ul></li>'), 
                eventhtml = '<span class="google_event_title"><a href="' + c + '" rel="' + p + '">' + p + '</a></span> <span class="google_event_location">' + n.locationLabel + " " + b + '</span> <span class="google_event_description">' + n.descriptionLabel + " " + _ + "</span> ", 
                e(n.element).find("ul.google_event_group").last().append("<li>" + eventhtml + "</li>"))) : (eventhtml = '<span class="google_event_title"><a href="' + c + '" rel="' + p + '">' + p + '</a></span> <span class="google_event_date">' + n.dateLabel + " " + h + " " + y + " " + m + ", " + v + " " + A + '</span> <span class="google_event_location">' + n.locationLabel + " " + b + '</span> <span class="google_event_description">' + n.descriptionLabel + " " + _ + "</span> ", 
                e(n.element).children(".google_event_list").append("<li>" + eventhtml + "</li>"));
            }
        }
        var a = {
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
        n = e.extend(a, n);
        //Day and Month Defaults
        var t = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"), o = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"), s = new Date().toISOString();
        e.get("https://www.googleapis.com/calendar/v3/calendars/" + n.calendarId + "/events", {
            maxResults: n.maxResults,
            singleEvents: !0,
            timeMin: s,
            key: n.apiKey
        }).done(function(e) {
            l(e);
        });
    };
}(jQuery);