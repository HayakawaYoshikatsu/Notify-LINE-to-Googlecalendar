var lineToken = "your lineToken";

function main()
{
    var calendars = CalendarsApp.getAllCalendars();
    var text = Utilities.formatDate(new Date(),'JST','yyyy/MM/dd')+"\n";

    for(i in calendars) 
    {
        var calendar = calendars[i];
        var events = calendar.getEventsForDay(new Date());

        if( events.length > 0 )
        {
            text += "◆ " + calendar.getName() + "\n";
        }
    
        for(j in events) 
        {
            var event = events[j];
      	    var title = event.getTitle();
      	    var start = toTime(event.getStartTime());
            var end = toTime(event.getEndTime());
            text += start +'-'+ end +""+ title + '\n';
        }
        if( events.length > 0 )
        {
            text += "\n";
        }
    }
    sendToLine(text);
}

function sendToLine(text)
{
    var token = lineToken;
    var options =
     {
       "method"  : "post",
       "payload" : "message=" + text,
       "headers" : {"Authorization" : "Bearer "+ token}
     };
     UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}
  
function toTime(str)
{
    return Utilities.formatDate(str, 'JST', 'HH:mm');
}
