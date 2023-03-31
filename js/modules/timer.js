function timer() {
  const deadline = '2023-05-02';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - new Date(),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      t,
      days,
      hours,
      minutes,
      seconds
    };
  }

  const getZero = num => (num < 10 ? '0' + num : num);
  const endedTimer = num => (num <= 0 ? '00' : getZero(num));

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = endedTimer(t.days);
      hours.innerHTML = endedTimer(t.hours);
      minutes.innerHTML = endedTimer(t.minutes);
      seconds.innerHTML = endedTimer(t.seconds);

      if (t.t <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);
}

module.exports = timer;
