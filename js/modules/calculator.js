function calculator() {
  const result = document.querySelector('.calculating__result span');

  let sex = localStorage.getItem('sex') || 'male',
    height,
    weight,
    age,
    ratio = localStorage.getItem('ratio') || 1.375;

  !localStorage.getItem('sex') && localStorage.setItem('sex', 'male');
  !localStorage.getItem('ratio') && localStorage.setItem('ratio', 1.375);

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(item => {
      item.classList.remove(activeClass);
      if (item.id === localStorage.getItem('sex')) {
        item.classList.add(activeClass);
      }
      if (item.dataset.ratio === localStorage.getItem('ratio')) {
        item.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '0000';
      return;
    }

    if (sex === 'female') {
      result.textContent = (
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) *
        ratio
      ).toFixed(0);
    } else {
      result.textContent = (
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) *
        ratio
      ).toFixed(0);
    }
  }

  calcTotal();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        if (e.target.dataset.ratio) {
          ratio = +e.target.dataset.ratio;
          localStorage.setItem('ratio', +e.target.dataset.ratio);
        } else {
          sex = e.target.id;
          localStorage.setItem('sex', e.target.id);
        }

        elements.forEach(item => item.classList.remove(activeClass));
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.id) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;

        default:
          break;
      }
      calcTotal();
    });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

export default calculator;
