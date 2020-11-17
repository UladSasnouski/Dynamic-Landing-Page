// DOM Elements
const time = document.getElementById('time'),
  dateNow = document.getElementById('date'),
  greeting = document.getElementById('greeting'),
  video = document.getElementById('video'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');

var yourHour = document.getElementById('YourHour'),
    yourMins = document.getElementById('YourMins');

var notifOn = false;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

// Show Date
function showDate() {
    let todayDate = new Date(),
      day = todayDate.getDay(),
      month = todayDate.getMonth(),
      year = todayDate.getFullYear();

      switch (month) {
        case 0:
            month = 'January';
            break;
        case 1:
            month = 'February';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'June';
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8:
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 10:
            month = 'November';
            break;
        case 11:
            month = 'December';
            break;    
      }
  
    // Output Time
    dateNow.innerHTML = `${day}<span> </span>${month}<span> </span>${year}`;
  
    setTimeout(showTime, 1000);
  }

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
    document.querySelector('video').playbackRate = 0.1;

  if (hour < 12) {
    // Morning
    video.src = 'video/morning.mp4';
    greeting.textContent = 'Good Morning, ';
    document.body.style.color = 'white';
  } else if (hour < 18) {
    // Afternoon
    video.src = 'video/afternoon.mp4';
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'white';
  } else {
    // Evening
    video.src = 'video/evening.mp4';
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

function setHour(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      yourHour = e.target.innerText;
    }
  } else {
    yourHour = e.target.innerText;
  }
  console.log (yourHour);
}
function setMins(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      yourMins = e.target.innerText;
    }
  } else {
    yourMins = e.target.innerText;
  }
  console.log (yourMins);
  notifOn = true;
  callNotification();
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

function callNotification() {
  if (notifOn === true) {
    let today = new Date(),
      hour = today.getHours();
      min = today.getMinutes();
      sec = today.getSeconds();

      let hourNew = +yourHour;
      let minsNew = +yourMins;
      let target = localStorage.getItem('focus');

      let notific = 'Today at ' + hourNew + ':' + minsNew + ' you scheduled: ' + target;
      notific = String(notific);

      var time = setTimeout(callNotification, 20000);

    if (hour === hourNew && min === minsNew && notifOn === true) {
        Push.create("Hello! This is your reminder!", {
          body: notific,
          icon: '/images/Jingles.png',
          timeout: 4000,
          onClick: function () {
              window.focus();
              this.close();
          }
      });
        console.log (notific);
        clearTimeout(time);
        notifOn === false;
    };
    
  } else {
    return false;
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "default") {
      Notification.requestPermission(function(permission){
        console.log('Результат запроса прав:', permission);
      });
    } else {
      return true;
    }
  }
}

name.onclick = function() {
  if (name.textContent === '[Enter Name]') {
    name.textContent = ' ';
  } else {
    return false;
  }
}
focus.onclick = function() {
  if (name.textContent === '[Enter Focus]') {
    name.textContent = ' ';
  } else {
    return false;
  }
}

yourHour.addEventListener('keypress', setHour);
yourHour.addEventListener('blur', setHour);
yourMins.addEventListener('keypress', setMins);
yourMins.addEventListener('blur', setMins);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
showDate();
setBgGreet();
getName();
getFocus();
