function modal() {
  const modalTriggers = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

  function openModal() {
    // modal.classList.toggle('hide');
    // document.body.style.overflow = 'hidden';
    // clearInterval(modalTimerID);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerID);
  }

  function closeModal() {
    // modal.classList.toggle('hide');
    // document.body.style.overflow = '';

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(item => {
    item.addEventListener('click', openModal);
  });

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      // modalCloseBtn.addEventListener('click', closeModal);
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
}

module.exports = modal;
