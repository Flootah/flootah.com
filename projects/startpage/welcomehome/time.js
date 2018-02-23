var mydate=new Date()
var year=mydate.getYear()
if (year < 1000) year+=1900;
var day=mydate.getDay() // Current Day of week - 2
var month=mydate.getMonth() // Current Month 2
var daym=mydate.getDate() // Current Date -24
var h=mydate.getHours(); //Hours
var m=mydate.getMinutes();//Minutes
var s=mydate.getSeconds();//Seconds
var ampm = h >= 12 ? 'pm' : 'am';

    //list days and months...
var dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday",
"Friday","Saturday")
var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun",
"Jul","Aug","Sep","Oct","Nov","Dec")

updateTime();
// time initialization and loop.
function updateTime() {
    mydate=new Date()
    day=mydate.getDay() // Current Day of week - 2
    month=mydate.getMonth() // Current Month 2
    daym=mydate.getDate() // Current Date -24
    h=mydate.getHours(); //Hours    
    m=mydate.getMinutes();//Minutes
    s=mydate.getSeconds();//Seconds
    //time formatting
    m = checkTime(m);
    s = checkTime(s);
    
    ampm = h >= 12 ? 'pm' : 'am';
    time = dayarray[day]+"\xa0\xa0\xa0"+montharray[month]+" "+daym+", "+year;
    date = checkHour(h)+":"+m+":"+s;
    document.getElementById("time").innerHTML = time + "<br/>" + date;

    var t = setTimeout(function(){updateTime()},1000);
}

function checkTime(i) {
if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
return i;
}

function checkHour(i) {
if(i > 12){i -= 12};
if(i == 0) {i = 12};
return i;
}