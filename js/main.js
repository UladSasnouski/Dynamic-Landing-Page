// DOM Elements
const time = document.getElementById('time'),
  dateNow = document.getElementById('date'),
  greeting = document.getElementById('greeting'),
  video = document.getElementById('video'),
  name = document.getElementById('name'),
  focu = document.getElementById('focus');

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
      console.log(e.target.innerText);
      if (e.target.innerText === '') {
        name.textContent = '[Enter Name]';
      }
    }
  }  else {
    localStorage.setItem('name', e.target.innerText);
    if (e.target.innerText === '') {
        name.textContent = '[Enter Name]';
      }
  }
}

function setHour(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      yourHour = e.target.innerText;
      this.blur();
      if (e.target.innerText === '' || e.target.innerText === ' ') {
        e.target.innerText = '__';
        yourHour.textContent = e.target.innerText;
      }
    }
  } else {
    yourHour = e.target.innerText;
    if (e.target.innerText === '' || e.target.innerText === ' ') {
      e.target.innerText = '__';
      yourHour.textContent = e.target.innerText;
    }
  }
}
function setMins(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      yourMins = e.target.innerText;
      this.blur();
      setInterval();
      if (e.target.innerText === '' || e.target.innerText === ' ') {
        e.target.innerText = '__';
        yourMins.textContent = e.target.innerText;
      }
    }
  } else {
    yourMins = e.target.innerText;
    setInterval();
    if (e.target.innerText === '' || e.target.innerText === ' ') {
      e.target.innerText = '__';
      yourMins.textContent = e.target.innerText;
    }
  }
}

function setInterval() {
  let start = new Date(),
  hour = start.getHours(),
  min = start.getMinutes();
  let hourNew = +yourHour;
  let minsNew = +yourMins;
  
  hour = hour * 60 + min;
  hourNew = hourNew * 60 + minsNew;
  if (yourHour - hour < 0) {
    hourNew = 1440 - (( 1440 - hour ) + hourNew);
    if (hourNew < 0) {
      hourNew = Math.abs(hourNew);
      hourNew = hourNew * 60000;
      notifOn = true;
      setTimeout(callNotification, hourNew);
    } else if (hourNew > 0) {
      hourNew = ( 1440 - hour ) + ( hour - hourNew );
      hourNew = hourNew * 60000;
      notifOn = true;
      setTimeout(callNotification, hourNew);
    }
  }
};

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focu.textContent = '[Enter Focus]';
  } else {
    focu.textContent = localStorage.getItem('focus');
  }
}

function callNotification() {
      let hourNew = +yourHour;
      let minsNew = +yourMins;
      let target = localStorage.getItem('focus');

      let notific = 'Today at ' + hourNew + ':' + minsNew + ' you scheduled: ' + target;
      notific = String(notific);

    if (notifOn === true) {
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
        notifOn === false;
    };
  }

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focu.blur();
      if (e.target.innerText === '') {
        focu.textContent = '[Enter Focus]';
      }
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
    if (e.target.innerText === '') {
      focu.textContent = '[Enter Focus]';
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
focu.onclick = function() {
  if (focu.textContent === '[Enter Focus]') {
    focu.textContent = ' ';
  } else {
    return false;
  }
}
yourMins.onclick = function() {
  if (yourMins.textContent === '__') {
    yourMins.textContent = ' ';
  } else {
    return false;
  }
}
yourHour.onclick = function() {
  if (yourHour.textContent === '__') {
    yourHour.textContent = ' ';
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
focu.addEventListener('keypress', setFocus);
focu.addEventListener('blur', setFocus);

// Run
showTime();
showDate();
setBgGreet();
getName();
getFocus();
