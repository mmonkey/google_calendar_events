;(function ($, window, document, undefined) {
	"use strict";

	var pluginName = 'google_calendar_events';
	var defaults = {
		key: null,
		calendar: null,
		max: 10,
	};

	function GoogleCalendarEvents(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this.init();
	}

	GoogleCalendarEvents.prototype.init = function () {
		var plugin = this;

		if (!plugin.settings.key || !plugin.settings.calendar) {
			return false;
		}
		plugin.getCalendarEvents();
	};

	GoogleCalendarEvents.prototype.getCalendarEvents = function () {
		var plugin = this;

		plugin.settings.apiUrl = 'https://www.googleapis.com/calendar/v3/calendars/' + plugin.settings.calendar + '/events';
		$.get(plugin.settings.apiUrl, {
			maxResults: plugin.settings.max,
			singleEvents: true,
			orderBy: 'startTime',
			timeMin: new Date().toISOString(),
			key: plugin.settings.key
		}, function (data) {
			if (data.hasOwnProperty('items')) {
				plugin.build(data.items);
			}
		});
	};

	GoogleCalendarEvents.prototype.build = function (events) {
		var plugin = this;

		$(plugin.element).html('<ul class="google_event_list"></ul>');

		for (var i = 0; i < events.length; i++) {
			var event = events[i];
			var isFullDay = !event.start.hasOwnProperty('dateTime');
			var date = isFullDay ? new Date(event.start.date) : new Date(event.start.dateTime);

			var item = '<li>';
			if (event.summary && event.htmlLink) {
				item += '<div class="google_event_title"><a href="' + event.htmlLink + '" rel="' + event.summary + '">' + event.summary + '</a></div>';
			}
			item += '<div class="google_event_date">' + plugin.formatDate(date, isFullDay) + '</div>';
			if (event.location) {
				item += '<div class="google_event_location">' + event.location + '</div>';
			}
			if (event.description) {
				item += '<div class="google_event_description">' + event.description + '</div>';
			}
			item += '</li>';

			$(plugin.element).find('ul.google_event_list').append(item);
		}
	};

	GoogleCalendarEvents.prototype.formatDate = function (date, isFullDay) {
		date = (date instanceof Date) ? date : new Date(date);
		var days = ['Sun', 'Mon', 'Tues', 'Weds', 'Thu', 'Fri', 'Sat'];
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		var h = date.getHours();
		var m = date.getMinutes();
		var ap = (h > 11) ? "pm" : "am";
		h = (h > 12) ? h - 12 : h;
		m = (m < 10) ? '0' + m : m;
		var t = h + ':' + m + ap;

		var formatted = days[date.getDay()] + ' ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
		return isFullDay ? formatted : formatted + ' - ' + t;
	};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new GoogleCalendarEvents(this, options));
			}
		});
	};

})(jQuery, window, document);