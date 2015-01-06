/**
  * Google Calendar Events - jQuery Plugin
  * By: CJ O'Hara
  * https://github.com/mmonkey/google_calendar_events
*/

(function ($) {
  $.GoogleCalendarEvents = function (options) {
    var defaults = {
      apiKey: 'AIzaSyA4PFeb8HH5jSBgRUebGpxno_jByColDms',
      calendarId: 'usa__en@holiday.calendar.google.com',
      element: '#gcal',
      maxResults: 10,
      displayCount: true,
      dateLabel: "When:",
      locationLabel: "Where:",
      descriptionLabel: "",
      groupDates: false
    };

    options = $.extend(defaults, options);

    //Day and Month Defaults
    var d_names = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
    var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

    var today = new Date().toISOString();
    var events = {};
    $.get('https://www.googleapis.com/calendar/v3/calendars/' + options.calendarId + '/events', {maxResults: options.maxResults, singleEvents: true, orderBy: "startTime", timeMin: today, key: options.apiKey})
      .done(function(data) {
        loaded(data);
      });

    function loaded(data) {
      var events = data.items;

      console.log(events);

      $(options.element).html('');
      if(options.displayCount) {
        $(options.element).html(events.length + ' upcoming events');
      }

      //Create google event list
      $(options.element).append('<ul class="google_event_list"></ul>');

      var groupDate = null;
      for(var i = 0; i < events.length; i++) {
        var eventEntry = events[i];
        var eventTitle = eventEntry.summary;
        var eventDate = new Date(eventEntry.start.dateTime);
        var eventLink = eventEntry.htmlLink;
        var eventDescription = eventEntry.description;

        var day = eventDate.getDay();
        var month = eventDate.getMonth();
        var year = eventDate.getFullYear();
        var date = eventDate.getDate();
        var dayname = d_names[day];
        var monthname = m_names[month];
        var location = eventEntry.location;

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
            $(options.element).children('.google_event_list').append('<li><span class="google_event_group_date">'+options.dateLabel+' '+dayname+' '+monthname+' '+date+'</span><ul class="google_event_group"></ul></li>');
          }

          if( groupDate.toString() === new Array(day, month, year).toString() ) {
            eventhtml =
              '<span class="google_event_title"><a href="'+eventLink+'" rel="'+eventTitle+'">'+eventTitle+'</a></span> '+
              '<span class="google_event_location">'+options.locationLabel+' '+location+'</span> '+
              '<span class="google_event_description">'+options.descriptionLabel+' '+eventDescription+'</span> ';

            $(options.element).find('ul.google_event_group').last().append('<li>'+eventhtml+'</li>');

          } else {
            groupDate = new Array(day, month, year);
            $(options.element).children('.google_event_list').append('<li><span class="google_event_group_date">'+options.dateLabel+' '+dayname+' '+monthname+' '+date+'</span><ul class="google_event_group"></ul></li>');

            eventhtml =
              '<span class="google_event_title"><a href="'+eventLink+'" rel="'+eventTitle+'">'+eventTitle+'</a></span> '+
              '<span class="google_event_location">'+options.locationLabel+' '+location+'</span> '+
              '<span class="google_event_description">'+options.descriptionLabel+' '+eventDescription+'</span> ';

            $(options.element).find('ul.google_event_group').last().append('<li>'+eventhtml+'</li>');
          }

        } else {
          eventhtml =
            '<span class="google_event_title"><a href="'+eventLink+'" rel="'+eventTitle+'">'+eventTitle+'</a></span> '+
            '<span class="google_event_date">'+options.dateLabel+' '+dayname+' '+monthname+' '+date+', '+year+' '+time+'</span> '+
            '<span class="google_event_location">'+options.locationLabel+' '+location+'</span> '+
            '<span class="google_event_description">'+options.descriptionLabel+' '+eventDescription+'</span> ';
          $(options.element).children('.google_event_list').append('<li>'+eventhtml+'</li>');
        }
      }
    }
    
  };
})(jQuery);
