Google Calendar Events
======================

Google calendar events is a jQuery plugin that displays a public google calendar events feed.

## Usage

```html
<div id="my-element"></div>

<script>
	$('#my-element').google_calendar_events({
		key: '<your-key-here>', // Google Calendar API Key see: https://console.developers.google.com
		calendar: '<google-calendar-id>',
		max: 10
	});
</script>
```

Example Output

```html
<div id="my-element">
    <ul class="google_event_list">
        <li>
            <div class="google_event_title">
                <a href="#" rel="Easter Sunday">Easter Sunday</a>
            </div>
            <div class="google_event_date">Sat Mar 31, 2018</div>
        </li>
        <li>
            <div class="google_event_title">
                <a href="#" rel="Cinco de Mayo">Cinco de Mayo</a>
            </div>
            <div class="google_event_date">Fri May 4, 2018</div>
        </li>
        <li>
            <div class="google_event_title">
                <a href="#" rel="Columbus Day (regional holiday)">Columbus Day (regional holiday)</a>
            </div>
            <div class="google_event_date">Sun Oct 7, 2018</div>
            <div class="google_event_description">Description</div>
        </li>
    </ul>
</div>
```

## Options

| Parameter | Description | Type |
| --------- | ----------- | ---- |
| `key` | Google Calendar API Key | String |
| `calendar` | Google Calendar Id | String |
| `max` | Max number of results (default 10) | Number |

## License

Google Calendar Events is licensed under the MIT License.