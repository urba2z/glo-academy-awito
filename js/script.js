"use strict";

const dataBase = [];

const addBtn = document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector('.catalog');
const warning = document.querySelector('.modal__btn-warning')

const elementsModalSubmit = [...modalSubmit]
  .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit')

// Открытие окна. В качестве аргемента передается селектор модального окна
function openMoodal(modalName) {
  const MODAL = document.querySelector(modalName)
  MODAL.classList.remove('hide')
  document.body.style.overflow = "hidden";
  closeModal(modalName)
}

// Закрытие окна. В качестве аргемента передается селектор модального окна
function closeModal(modalName) {
  const MODAL = document.querySelector(modalName)
  const closeByEsc = event => {
    if (event.key === 'Escape') {
      MODAL.classList.add('hide')
      document.body.style.overflow = "";
      document.removeEventListener('keydown', closeByEsc)
    }
  }
  document.addEventListener('keydown', closeByEsc)
  MODAL.addEventListener('click', event => {
    if (event.target.classList.contains('modal__close') ||
      event.target === MODAL
    ) {
      MODAL.classList.add('hide');
      document.body.style.overflow = "";
      modalSubmit.reset(); // Сброс данных формы после закрытия окна
    }
  })
}

// Модальное окно нового товара
addBtn.addEventListener('click', () => {
  openMoodal('.modal__add');
  modalBtnSubmit.disabled = true
});

//Открытие модального окна товара
catalog.addEventListener('click', event => {
  if (event.target.closest('.card')) {
    openMoodal('.modal__item');
  }
})

//Валидация
modalSubmit.addEventListener('input', () => {
  const valid = elementsModalSubmit.every(elem => elem.value)
  modalBtnSubmit.disabled = !valid
  warning.style.display = valid ? 'none' : 'block'
});

//Новое объявление
modalSubmit.addEventListener('submit', event => {
  event.preventDefault();
  const itemObj = {};
  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value
  }
  dataBase.push(itemObj);
  modalSubmit.reset();
  closeModal('.modal__add');
})
