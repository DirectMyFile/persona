const manageTime = () => {
  const time = document.querySelector('.datetime-container > .time');
  const date = document.querySelector('.datetime-container > .date');

  function loop() {
    var now = new Date();

    var hours = now.getHours() % 12;
    if(!hours)
      hours = '12';
    if(hours < 10)
      hours = `0${hours}`;

    var minutes = now.getMinutes();
    if(minutes < 10)
      minutes = `0${minutes}`;

    time.innerHTML = `${hours}:${minutes} ${now.getHours() > 11 ? 'PM' : 'AM'}`;

    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    date.innerHTML = `${weekdays[now.getDay()]} ${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
  }

  var d = 60 - (new Date()).getSeconds();

  setTimeout(() => {
    loop();
    setInterval(loop, 60 * 1000);
  }, d * 1000);

  loop();

  document.querySelector('.datetime-container').style.display = 'flex';
};
