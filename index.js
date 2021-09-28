const inputDate=document.querySelector("#input");
const showBtn=document.querySelector("#output-btn");
const textShow=document.querySelector("#text");

// function to reverse string
function reverseString(str)
{
  var list=str.split('');
  var rev=list.reverse();
  return rev.join('');
}
// function to check fror palindrome
function checkPalindrome(str)
{
  return (str===reverseString(str));
}
// function to convert number to string  =>date to reverseString

function convertToString(date)
{
  var dateStr={day:'',month:'',year:''};
  if(date.day<10)
    dateStr.day='0'+date.day;
  else
    dateStr.day=date.day;
  if(date.month<10)
      dateStr.month='0'+date.month;
  else
      dateStr.month=date.month.toString();
  dateStr.year=date.year.toString();
  return dateStr;
}

// function which convert date in all its formats
function convertDateFormat(date)
{
  // DD-MM-YYYY
// MM-DD-YYYY
// YYYY-MM-DD
// DD-MM-YY
// MM-DD-YY
// YY-MM-DD
date=convertToString(date);
ddmmyyyy=date.day+date.month+date.year;
mmddyyyy=date.month+date.day+date.year;
yyyymmdd=date.year+date.month+date.day;
ddmmyy=date.day+date.month+date.year.slice(-2);
mmddyy=date.month+date.day+date.year.slice(-2);
yymmdd=date.year.slice(-2)+date.month+date.day;
return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

// chceking plaindrome for all date format
function checkPalindromeInAllFormat(date)
{
  var formatList=convertDateFormat(date);
  var isPalindrome=false;
  for(let i=0;i<formatList.length;i++)
  {
    if(checkPalindrome(formatList[i]))
    {
       isPalindrome=true;
       break;
    }
  }
  return isPalindrome;
}
// function to check lrap leapYear

function leapYear(year)
{
  if(year%400===0)
    return true;
  if(year%100===0)
    return false;
  if(year%4===0)
    return true;
  return false;
}
// function to get next date from given date
function getNextDate(date)
{
  var day=date.day+1;
  var month=date.month;
  var year=date.year;
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if(month===2)
  {
    if(leapYear(year))
    {
      if(day>29)
      {
        day=1;
        month=month+1;
      }
    }
    else
    {
      if(day>28)
      {
        day=1;
        month=month+1;
      }
    }
  }
  else{
    if(day>daysInMonth[month-1])
    {
      day=1;
      month=month+1;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

//Find the next palindrome date, also how many days are in between
function nextPalidrome(date)
{
  var nextDate=getNextDate(date);
  var count=0;
  while(1)
  {
    count++;
    if(checkPalindromeInAllFormat(nextDate))
    {
      return [count,nextDate];
    }
    nextDate=getNextDate(nextDate);
  }
}
showBtn.addEventListener("click",function()
{
  var bdayStr = inputDate.value;
  if (bdayStr !== '') {
    var date = bdayStr.split('-');
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy)
    };
    if(checkPalindromeInAllFormat(date))
      textShow.innerText="🎉Yay! Your birthday is palindrome!";
    else
    {
      [dayAhead,nextDate]=nextPalidrome(date);
      textShow.innerText="The nearest palindrome date is "+nextDate.day+"-"+nextDate.month+"-"+nextDate.year+", you missed by "+dayAhead +" days.";
    }
  }
  else{
    textShow.innerText="Enter your Birthday date first!";
  }
});
