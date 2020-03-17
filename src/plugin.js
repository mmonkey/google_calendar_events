;(function ($) {
	'use strict';

	const GoogleCalendarEvents = require('./index');
	$.fn['google_calendar_events'] = function (options) {
		let lib = new GoogleCalendarEvents(options.key);
		const $el = this;

		Object.keys(options).forEach(option => {
			if (typeof lib[option] === 'function') {
				lib = lib[option](options[option]);
			}
		});

		if (!$.data($el, 'plugin_google_calendar_events')) {
			$.data($el, 'plugin_google_calendar_events', lib.render($el));
		}

		return $el;
	};
}(jQuery));