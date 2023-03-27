window.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(index = 0) {
    tabsContent[index].classList.remove('hide');
    tabsContent[index].classList.add('show', 'fade');
    tabs[index].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', e => {
    const target = e.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, index) => {
        if (item === target) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  // Timer
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

  // Modal window
  const modalTriggers = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');

  function openModal() {
    modal.classList.toggle('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerID);
  }

  function closeModal() {
    modal.classList.toggle('hide');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(item => {
    item.addEventListener('click', openModal);
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hide')) {
      closeModal();
    }
  });

  const modalTimerID = setTimeout(openModal, 30000);

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  // Using classes for cards
  class MenuCard {
    constructor(src, alt, title, descr, price, perentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 27;
      this.parent = document.querySelector(perentSelector);
      this.classes = classes;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      !this.classes.length ? this.classes.push('menu__item') : this.classes;
      this.classes.forEach(className => element.classList.add(className));

      element.innerHTML = `
      <img src=${this.src} alt=${this.alt} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">
       ${this.descr}
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>
      `;
      this.parent.append(element);
    }
  }

  new MenuCard(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше
  свежих овощей и фруктов. Продукт активных и здоровых людей. Это
  абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    '9',
    '.menu .container',
    'menu__item'
  ).render();
  new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    `В меню “Премиум” мы используем не только красивый дизайн упаковки,
    но и качественное исполнение блюд. Красная рыба, морепродукты,
    фрукты - ресторанное меню без похода в ресторан!`,
    '20',
    '.menu .container',
    'menu__item'
  ).render();
  new MenuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    `Меню “Постное” - это тщательный подбор ингредиентов: полное
    отсутствие продуктов животного происхождения, молоко из миндаля,
    овса, кокоса или гречки, правильное количество белков за счет тофу
    и импортных вегетарианских стейков.`,
    '16',
    '.menu .container'
  ).render();

  // Forms

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так'
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
       display: block;
       margin: 0 auto;
       `;

      form.insertAdjacentElement('afterend', statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      // request.setRequestHeader('Content-type', 'multipart/form-data');
      request.setRequestHeader(
        'Content-type',
        'application/json; charset=utf-8'
      );
      const formData = new FormData(form);

      const object = {};

      formData.forEach(function (value, key) {
        object[key] = value;
      });

      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(message.success);
          form.reset();
          statusMessage.remove();
        } else {
          showThanksModal(message.failure);
        }
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.toggle('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
     <div class="modal__content">
       <div class="modal__close" data-close>&times;</div>
       <div class="modal__title">
        ${message}
       </div>
     </div>`;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.toggle('hide');
      closeModal();
    }, 4000);
  }
});
