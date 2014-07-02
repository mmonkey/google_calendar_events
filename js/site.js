/* ================================================================================================
	Google Calendar Events
================================================================================================ */
$.GoogleCalendarEvents({
    feedUri: 'https://www.google.com/calendar/feeds/en.usa%23holiday%40group.v.calendar.google.com/public/full',
    element: '.google_cal',
    maxresults: 25,
    displayCount: false,
    dateLabel: "",
    locationLabel: "",
    descriptionLabel: "",
    groupDates: true
});

$.GoogleCalendarEvents({
    feedUri: 'https://www.google.com/calendar/feeds/en.usa%23holiday%40group.v.calendar.google.com/public/full',
    element: '.google_cal_2',
    maxresults: 3,
    displayCount: false,
    dateLabel: "",
    locationLabel: "",
    descriptionLabel: "",
    groupDates: false
});