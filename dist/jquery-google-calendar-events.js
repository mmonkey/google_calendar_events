(function(t, e, n, a) {
    "use strict";
    var i = "google_calendar_events";
    var s = {
        key: null,
        calendar: null,
        max: 10
    };
    function r(e, n) {
        this.element = e;
        this.settings = t.extend({}, s, n);
        this.init();
    }
    r.prototype.init = function() {
        var t = this;
        if (!t.settings.key || !t.settings.calendar) {
            return false;
        }
        t.getCalendarEvents();
    };
    r.prototype.getCalendarEvents = function() {
        var e = this;
        e.settings.apiUrl = "https://www.googleapis.com/calendar/v3/calendars/" + e.settings.calendar + "/events";
        t.get(e.settings.apiUrl, {
            maxResults: e.settings.max,
            singleEvents: true,
            orderBy: "startTime",
            timeMin: new Date().toISOString(),
            key: e.settings.key
        }, function(t) {
            if (t.hasOwnProperty("items")) {
                e.build(t.items);
            }
        });
    };
    r.prototype.build = function(e) {
        var n = this;
        t(n.element).html('<ul class="google_event_list"></ul>');
        for (var a = 0; a < e.length; a++) {
            var i = e[a];
            var s = !i.start.hasOwnProperty("dateTime");
            var r = s ? new Date(i.start.date) : new Date(i.start.dateTime);
            var o = "<li>";
            if (i.summary && i.htmlLink) {
                o += '<div class="google_event_title"><a href="' + i.htmlLink + '" rel="' + i.summary + '">' + i.summary + "</a></div>";
            }
            o += '<div class="google_event_date">' + n.formatDate(r, s) + "</div>";
            if (i.location) {
                o += '<div class="google_event_location">' + i.location + "</div>";
            }
            if (i.description) {
                o += '<div class="google_event_description">' + i.description + "</div>";
            }
            o += "</li>";
            t(n.element).find("ul.google_event_list").append(o);
        }
    };
    r.prototype.formatDate = function(t, e) {
        t = t instanceof Date ? t : new Date(t);
        var n = [ "Sun", "Mon", "Tues", "Weds", "Thu", "Fri", "Sat" ];
        var a = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        var i = t.getHours();
        var s = t.getMinutes();
        var r = i > 11 ? "pm" : "am";
        i = i > 12 ? i - 12 : i;
        s = s < 10 ? "0" + s : s;
        var o = i + ":" + s + r;
        var l = n[t.getDay()] + " " + a[t.getMonth()] + " " + t.getDate() + ", " + t.getFullYear();
        return e ? l : l + " - " + o;
    };
    t.fn[i] = function(e) {
        return this.each(function() {
            if (!t.data(this, "plugin_" + i)) {
                t.data(this, "plugin_" + i, new r(this, e));
            }
        });
    };
})(jQuery, window, document);