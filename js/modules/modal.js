function openModal(modalSelector, modalTimerID) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  console.log(modalTimerID);
  if (modalTimerID) {
    clearInterval(modalTimerID);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerID) {
  const modalTriggers = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalTriggers.forEach(item => {
    item.addEventListener('click', () =>
      openModal(modalSelector, modalTimerID)
    );
  });

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      // modalCloseBtn.addEventListener('click', closeModal);
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hide')) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal(modalSelector, modalTimerID);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { closeModal };
export { openModal };
