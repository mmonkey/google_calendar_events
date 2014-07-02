/**
  * Google Calendar Events - jQuery Plugin
  * By: CJ O'Hara
  * https://github.com/mmonkey/google_calendar_events
*/

/*global google*/
(function ($) {
  $.GoogleCalendarEvents = function (options) {
    //Default settings
    var settings = {
      feedUri: 'https://www.google.com/calendar/feeds/en.usa%23holiday%40group.v.calendar.google.com/public/full',
      element: '#gcal',
      maxresults: 10,
      displayCount: true,
      dateLabel: "When:",
      locationLabel: "Where:",
      descriptionLabel: "",
      groupDates: false
    };
    var feedUri = options.feedUri;
    if(feedUri.indexOf("public/full") === -1) {
      feedUri = settings.feedUri;
    }

    //Populate missing options
    options = $.extend(settings, options);
    var element = options.element;

    function _run() {
      var calendarService = new google.gdata.calendar.CalendarService('GoogleInc-jsguide-1.0');

      //The "public/full" feed is used to retrieve events from the named public calendar with full projection.
      var query = new google.gdata.calendar.CalendarEventQuery(feedUri);
      query.setOrderBy('starttime');
      query.setSortOrder('ascending');
      query.setFutureEvents(true);
      query.setSingleEvents(true);
      query.setMaxResults(options.maxresults);

      //Day and Month Defaults
      var d_names = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
      var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

      var callback = function (result) {

        var entries = result.feed.getEntries();
        $(element).html('');
        if(options.displayCount) {
          $(element).html(entries.length + ' upcoming events');
        }

        //Create google event list
        $(element).append('<ul class="google_event_list"></ul>');

        var groupDate = null;

        //Loop through events
        for(var i = 0; i < entries.length; i++) {
          var eventEntry = entries[i];
          var eventTitle = eventEntry.getTitle().getText();
          var startDateTime = null;
          var eventDate = null;
          var eventContent = eventEntry.getContent().getText();
          var eventLink = eventEntry.getLink().getHref();
          var eventhtml = null;

          var times = eventEntry.getTimes();
          if(times.length > 0) {
            startDateTime = times[0].getStartTime();
            eventDate = startDateTime.getDate();
          }

          var day = eventDate.getDay();
          var month = eventDate.getMonth();
          var year = eventDate.getFullYear();
          var date = eventDate.getDate();
          var dayname = d_names[day];
          var monthname = m_names[month];
          var location = eventEntry.getLocations();
          var eventWhere = location[0].getValueString();

          //Format Time
          var ap = "am";
          var hour = eventDate.getHours();
          if(hour > 11) { ap = "pm"; }
          if(hour > 12) { hour = hour - 12; }
          if(hour === 0) { hour = 12; }
          var min = eventDate.getMinutes();
          min = min + "";
          if(min.length === 1) { min = "0" + min; }
          var time = hour + ':' + min + ap;


          if(options.groupDates) {
            if(groupDate === null) {
              groupDate = new Array(day, month, year);
              $(element).children('.google_event_list').append('<li><span class="google_event_group_date">'+options.dateLabel+' '+dayname+' '+monthname+' '+date+'</span><ul class="google_event_group"></ul></li>');
            }

            if( groupDate.toString() === new Array(day, month, year).toString() ) {
              eventhtml =
                '<span class="google_event_title"><a href="'+eventLink+'" rel="'+eventTitle+'">'+eventTitle+'</a></span> '+
                '<span class="google_event_location">'+options.locationLabel+' '+eventWhere+'</span> '+
                '<span class="google_event_description">'+options.descriptionLabel+' '+eventContent+'</span> ';
              
              $(element).find('ul.google_event_group').last().append('<li>'+eventhtml+'</li>');

            } else {
              groupDate = new Array(day, month, year);
              $(element).children('.google_event_list').append('<li><span class="google_event_group_date">'+options.dateLabel+' '+dayname+' '+monthname+' '+date+'</span><ul class="google_event_group"></ul></li>');
              
              eventhtml =
                '<span class="google_event_title"><a href="'+eventLink+'" rel="'+eventTitle+'">'+eventTitle+'</a></span> '+
                '<span class="google_event_location">'+options.locationLabel+' '+eventWhere+'</span> '+
                '<span class="google_event_description">'+options.descriptionLabel+' '+eventContent+'</span> ';
              
              $(element).find('ul.google_event_group').last().append('<li>'+eventhtml+'</li>');
            }

          } else {
            eventhtml =
              '<span class="google_event_title"><a href="'+eventLink+'" rel="'+eventTitle+'">'+eventTitle+'</a></span> '+
              '<span class="google_event_date">'+options.dateLabel+' '+dayname+' '+monthname+' '+date+', '+year+' '+time+'</span> '+
              '<span class="google_event_location">'+options.locationLabel+' '+eventWhere+'</span> '+
              '<span class="google_event_description">'+options.descriptionLabel+' '+eventContent+'</span> ';
            $(element).children('.google_event_list').append('<li>'+eventhtml+'</li>');
          }

        }
      };

      // Error handler to be invoked when getEventsFeed() produces an error
      var handleError = function (error) {
        $(element).html('<pre>' + error + '</pre>');
      };

      // Submit the request using the calendar service object
      calendarService.getEventsFeed(query, callback, handleError);
    }
    
    //Call _run() on page load
    google.setOnLoadCallback(_run);

    $(window).load(function () {

    });
  };

})(jQuery);
