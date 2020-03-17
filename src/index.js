export default class GoogleCalendarEvents {

	/**
	 * GoogleCalendarEvents constructor
	 *
	 * @param {string} key
	 */
	constructor(key) {
		this._key = key;

		const startOfToday = new Date();
		startOfToday.setHours(0, 0, 0, 0);

		// Default options
		this._calendarId = null;
		this._maxResults = 10;
		this._momentDateFormat = 'dddd, MMMM Do YYYY';
		this._momentTimeFormat = 'h:mm a';
		this._orderBy = 'startTime';
		this._q = null;
		this._showDeleted = false;
		this._singleEvents = true;
		this._timeMax = null;
		this._timeMin = startOfToday.toISOString();
		this._timeZone = null;
		this._updatedMin = null;
	}

	/**
	 * Calendar identifier.
	 * Default: not defined
	 *
	 * @param {string} calendarId
	 * @return {GoogleCalendarEvents}
	 */
	calendarId(calendarId) {
		this._calendarId = calendarId;
		return this;
	}

	/**
	 * Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value,
	 * or none at all, even if there are more events matching the query.
	 * Default: 10
	 * Acceptable Values: 1 - 2500
	 *
	 * @param {int} maxResults
	 * @return {GoogleCalendarEvents}
	 */
	maxResults(maxResults) {
		if (maxResults < 1 || maxResults > 2500) {
			throw new Error('Invalid maxResults value. Acceptable values are: 1 - 2500.');
		}
		this._maxResults = maxResults;
		return this;
	}

	/**
	 * MomentJS format for the date display.
	 * Default: "dddd, MMMM Do YYYY"
	 *
	 * @param {string} momentDateFormat
	 * @return {GoogleCalendarEvents}
	 */
	momentDateFormat(momentDateFormat) {
		this._momentDateFormat = momentDateFormat;
		return this;
	}

	/**
	 * MomentJS format for the time display.
	 * Default: "h:mm a"
	 *
	 * @param {string} momentTimeFormat
	 * @return {GoogleCalendarEvents}
	 */
	momentTimeFormat(momentTimeFormat) {
		this._momentTimeFormat = momentTimeFormat;
		return this;
	}

	/**
	 * The order of the events returned in the result.
	 * Default: "startTime"
	 * Acceptable values: "startTime", "updated"
	 *
	 * @param {string} orderBy
	 * @return {GoogleCalendarEvents}
	 */
	orderBy(orderBy) {
		const acceptableValues = ['startTime', 'updated'];
		if (!acceptableValues.includes(orderBy)) {
			throw new Error('Invalid orderBy value. Acceptable values are: "startTime", "updated".');
		}
		this._orderBy = orderBy;
		return this;
	}

	/**
	 * Free text search terms to find events that match these terms in any field, except for extended properties.
	 * Default: not defined
	 *
	 * @param {string} q
	 * @return {GoogleCalendarEvents}
	 */
	q(q) {
		this._q = q;
		return this;
	}

	/**
	 * Whether to include deleted events (with status equals "cancelled") in the result.
	 * Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False.
	 * If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned.
	 * Default: false
	 *
	 * @param {boolean} showDeleted
	 * @return {GoogleCalendarEvents}
	 */
	showDeleted(showDeleted) {
		this._showDeleted = showDeleted;
		return this;
	}

	/**
	 * Whether to expand recurring events into instances and only return single one-off events and instances of recurring events,
	 * but not the underlying recurring events themselves.
	 * Default: true
	 *
	 * @param {boolean} singleEvents
	 * @return {GoogleCalendarEvents}
	 */
	singleEvents(singleEvents) {
		this._singleEvents = singleEvents;
		return this;
	}

	/**
	 * Upper bound (exclusive) for an event's start time to filter by.
	 * Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z.
	 * Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin.
	 * Default: not defined
	 *
	 * @param {string|Date} timeMax
	 * @return {GoogleCalendarEvents}
	 */
	timeMax(timeMax) {
		this._timeMax = timeMax instanceof Date ? timeMax.toISOString() : timeMax;
		return this;
	}

	/**
	 * Lower bound (exclusive) for an event's end time to filter by.
	 * Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z.
	 * Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax.
	 * Default: beginning of today
	 *
	 * @param {string|Date} timeMin
	 * @return {GoogleCalendarEvents}
	 */
	timeMin(timeMin) {
		this._timeMin = timeMin instanceof Date ? timeMin.toISOString() : timeMin;
		return this;
	}

	/**
	 * Time zone used in the response.
	 * Default: the time zone of the calendar
	 *
	 * @param {string} timeZone
	 * @return {GoogleCalendarEvents}
	 */
	timeZone(timeZone) {
		this._timeZone = timeZone;
		return this;
	}

	/**
	 * Lower bound for an event's last modification time (as a RFC3339 timestamp) to filter by. When specified,
	 * entries deleted since this time will always be included regardless of showDeleted.
	 * Default: not defined
	 *
	 * @param {string|Date} updatedMin
	 * @return {GoogleCalendarEvents}
	 */
	updatedMin(updatedMin) {
		this._updatedMin = updatedMin instanceof Date ? updatedMin.toISOString() : updatedMin;
		return this;
	}

	/**
	 * Render the calendar events.
	 *
	 * @param {string|Node|NodeList|jQuery} target
	 */
	async render(target) {
		if (!this._key) {
			throw new Error('You must provide an apiKey.');
		}

		if (!this._calendarId) {
			throw new Error('You must provide a calendarId.');
		}

		// Get the events
		const url = `https://www.googleapis.com/calendar/v3/calendars/${this._calendarId}/events`;
		const params = {
			key: this._key,
			maxResults: this._maxResults,
			orderBy: this._orderBy,
			q: this._q,
			showDeleted: this._showDeleted,
			singleEvents: this._singleEvents,
			timeMax: this._timeMax,
			timeMin: this._timeMin,
			timeZone: this._timeZone,
			updatedMin: this._updatedMin
		};
		const response = await this._get(url, params);
		const events = response.items || [];

		// Render the events
		const ul = this._renderList(events);
		const element = this._parseTarget(target);
		element.appendChild(ul);
	}

	/**
	 * Send a get request to the provided url.
	 *
	 * @param {string} url
	 * @param {{}} parameters
	 * @return {Promise}
	 * @private
	 */
	_get(url, parameters) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			Object.keys(parameters).forEach(key => {
				if (parameters[key] === null) {
					delete parameters[key];
				}
			});

			const query = Object.keys(parameters).map(key => key + '=' + parameters[key]);
			url = query.length ? url + '?' + query.join('&') : url;

			xhr.onload = () => resolve(JSON.parse(xhr.responseText));
			xhr.ontimeout = () => reject(new Error(`The request for "${url}" timed out.`));
			xhr.onerror = () => reject(new Error(xhr.statusText));
			xhr.open('GET', url, true);
			xhr.send(null);
		});
	}

	/**
	 * Parse target element for rendering the events list.
	 * Default: not defined
	 * Acceptable values:
	 *  string - the selector of the target element
	 *  NodeList - the NodeList object representing the target element (will take the first matching element)
	 *  Node - the Node object referencing the target element.
	 *  jQuery - the jQuery object containing the target element (will take the first matching element)
	 *
	 * @param {string|Node|NodeList|jQuery} target
	 * @return {Node}
	 * @private
	 */
	_parseTarget(target) {
		if (!target) {
			throw new Error('You must provide a target element for Google Calendar Events.');
		}

		if (typeof target === 'string') {
			return document.querySelector(target);
		} else if (target instanceof Node) {
			return target;
		} else if (target instanceof NodeList && target.length) {
			return options.target[0];
		} else if (typeof jQuery === 'function' && target instanceof jQuery && typeof target.length) {
			return target[0];
		} else {
			throw new Error(`Unsupported value for the target: ${target}.`);
		}
	}

	/**
	 * Render the google calendar events list.
	 *
	 * @param {[]} events
	 * @return {Element}
	 * @private
	 */
	_renderList(events) {
		const lib = this;

		const ul = document.createElement('ul');
		ul.setAttribute('class', 'google_event_list');

		events.forEach(event => {
			const li = document.createElement('li');
			li.setAttribute('class', 'google_event_list_item');

			lib._renderListItemTitle(event, li);
			lib._renderListItemDate(event, li);
			lib._renderListItemLocation(event, li);
			lib._renderListItemDescription(event, li);

			ul.appendChild(li);
		});

		return ul;
	}

	/**
	 * Create the nodes for the Event's title
	 *
	 * @param {{}} event
	 * @param {Node} li
	 * @private
	 */
	_renderListItemTitle(event, li) {
		if (event.summary) {
			const title = document.createElement('div');
			title.setAttribute('class', 'google_event_title');

			if (event.htmlLink) {
				const link = document.createElement('a');
				link.setAttribute('href', event.htmlLink);
				link.setAttribute('rel', event.summary);
				link.innerText = event.summary;

				title.appendChild(link);
			} else {
				title.innerText = event.summary;
			}

			li.appendChild(title);
		}
	}

	/**
	 * Create the nodes for the Event's date
	 *
	 * @param {{}} event
	 * @param {Node} li
	 * @private
	 */
	_renderListItemDate(event, li) {
		let formatted = '';
		const {date, dateTime} = event.start;

		if (date) {
			if (moment) {
				formatted = moment(date).format(this._momentDateFormat);
			} else {
				formatted = this._formatDate(date);
			}
		}

		if (dateTime) {
			const userTimeZone = this._timeZone || moment.tz.guess();
			if (moment && moment.tz) {
				formatted = moment.tz(dateTime, userTimeZone).format(this._momentDateFormat + ', ' + this._momentTimeFormat);
			} else if (moment) {
				formatted = moment(dateTime).format(this._momentDateFormat + ', ' + this._momentTimeFormat);
			} else {
				formatted = this._formatDate(dateTime) + ', ' + this._formatTime(dateTime, userTimeZone);
			}
		}

		if (formatted) {
			const dateElement = document.createElement('div');
			dateElement.setAttribute('class', 'google_event_date');
			dateElement.innerText = formatted;

			li.appendChild(dateElement);
		}
	}

	/**
	 * Create the nodes for the Event's location
	 *
	 * @param {{}} event
	 * @param {Node} li
	 * @private
	 */
	_renderListItemLocation(event, li) {
		if (event.location) {
			const location = document.createElement('div');
			location.setAttribute('class', 'google_event_location');
			location.innerText = event.location;

			li.appendChild(location);
		}
	}

	/**
	 * Create the nodes for the Event's description
	 *
	 * @param {{}} event
	 * @param {Node} li
	 * @private
	 */
	_renderListItemDescription(event, li) {
		if (event.description) {
			const description = document.createElement('description');
			description.setAttribute('class', 'google_event_description');
			description.innerHTML = event.description;

			li.appendChild(description);
		}
	}

	/**
	 * Format the date (without moment)
	 *
	 * @param {string|Date} date
	 * @private
	 */
	_formatDate(date) {
		date = (date instanceof Date) ? date : new Date(date);
		return date.toLocaleDateString([], {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	/**
	 * Format the time (without moment)
	 *
	 * @param {string|Date} date
	 * @param {string} timeZone
	 * @private
	 */
	_formatTime(date, timeZone) {
		date = (date instanceof Date) ? date : new Date(date);
		return date.toLocaleTimeString([], {
			timeZone: timeZone,
			hour: 'numeric',
			minute: '2-digit',
			hourCycle: 'h12'
		});
	}
}