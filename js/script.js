"use strict";

const modalAdd = document.querySelector('.modal__add');
const modalItem = document.querySelector('.modal__item');
const addBtn = document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit')
const cards = document.querySelectorAll('.card')


// Открытие окна. В качестве аргемента передается переменная модального окна
function openMoodal(modalName) {
  modalName.classList.remove('hide')
  document.body.style.overflow = "hidden"
}


/* 
- Закрытие окна. 
- В качестве аргемента передается переменная модального окна. 
- Без event-а не работает. ДОРАБОТАТЬ (коммент для себя)
*/
function closeModal(modalName, event) {
  if (event.target.classList.contains('modal__close') ||
    event.target === modalName
  ) {
    modalName.classList.add('hide');
    document.body.style.overflow = "";
    modalSubmit.reset(); // Сброс данных формы после закрытия окна
  }

}

//Закрытие пнри нажатии "esc". В качестве аргемента передается переменная модального окна. 
function closeByEsc(modalName) {
  document.addEventListener('keydown', event => {
    if (event.keyCode === 27) {
      modalName.classList.add('hide')
      document.body.style.overflow = ""
    }
  })
}


addBtn.addEventListener('click', () => {
  openMoodal(modalAdd);
  closeByEsc(modalAdd);
  modalBtnSubmit.disabled = true
});

modalAdd.addEventListener('click', () => {
  closeModal(modalAdd, event);
});

cards.forEach(item => {
  item.addEventListener('click', () => {
    openMoodal(modalItem);
    closeByEsc(modalItem);
  })
});

modalItem.addEventListener('click', () => {
  closeModal(modalItem, event)
})