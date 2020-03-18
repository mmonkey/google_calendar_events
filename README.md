Google Calendar Events
======================  
Google calendar events is a javascript library that displays a public google calendar events feed.

## Prerequisites  
- [Google Calendar API Key](https://developers.google.com/calendar)

## Usage  
### Moment  
For better time formatting, include the following libraries:
- [Moment.js](https://momentjs.com/)
- [Moment-Timezone](https://momentjs.com/timezone/)

### Javascript  
```html
<head>
	<!-- Moment.js and Moment-Timezone (Optional) -->
	<script src="moment.min.js"></script>
	<script src="moment-timezone.min.js"></script>

	<script src="google-calendar-events.js"></script>
</head>
<body>
	<div id="my-element"></div>
	<script type="text/javascript">
		new GoogleCalendarEvents('<YOUR_GOOGLE_CALENDAR_API_KEY>')
			.calendarId('usa__en@holiday.calendar.google.com')
			.maxResults(50)
			.momentDateFormat('MMMM Do YYYY')
			.render('#my-element');
	</script>
</body>
```

### jQuery (legacy)  
```html
<head>
	<!-- Moment.js and Moment-Timezone (Optional) -->
	<script src="moment.min.js"></script>
	<script src="moment-timezone.min.js"></script>

	<script src="jquery.min.js"></script>
	<script src="jquery-google-calendar-events.min.js"></script>
</head>
<body>
	<div id="my-element"></div>
    <script type="text/javascript">
    	$('#my-element').google_calendar_events({
    		key: '<YOUR_GOOGLE_CALENDAR_API_KEY>',
    		calendarId: 'usa__en@holiday.calendar.google.com',
    		maxResults: 20
    	});
    </script>
</body>
```

## Options  
The following options are available. All but `key` are callable functions for the Javascript implementation.  

| Parameter | Description | Type | Default |
| --------- | ----------- | ---- | ------- |
| `key` | Google Calendar API Key | String | N/A |
| `calendarId` | Google Calendar identifier | String | N/A |
| `maxResults` | Max number of results | Number | 10 |
| `momentDateFormat` | Moment.js format for displaying the date | String | "dddd, MMMM Do YYYY" |
| `momentTimeFormat` | Moment.js format for displaying the time | String | "h:mm a" |
| `orderBy` | The order to display the events | String | "startTime" |
| `q` | Search terms to find events to display | String | N/A |
| `showDeleted` | Display events that have been "cancelled"? | Boolean | False |
| `singleEvents` | Display recurring events as single instances? | Boolean | True |
| `timeMax` | Upper bound (exclusive) for an event's start time | String,Date | N/A |
| `timeMin` | Lower bound (exclusive) for an event's end time | String,Date | Today @ 00:00:00 |
| `timeZone` | The time zone to display the results in | String,Date | Client's time zone |
| `updatedMin` | Lower bound for an event's last modified time | Boolean | True |


## License  
Google Calendar Events is licensed under the MIT License.