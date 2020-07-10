"use strict";

const dataBase = JSON.parse(localStorage.getItem('awito')) || [];
const addBtn = document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector('.catalog');
const warning = document.querySelector('.modal__btn-warning');
const modalFileInput = document.querySelector('.modal__file-input');
const modalFileBtn = document.querySelector('.modal__file-btn');
const modalImageAdd = document.querySelector('.modal__image-add');

const FileBtnText = modalFileBtn.textContent;
const modalImageSrc = modalImageAdd.src;

//Фильтр элементов модального окна
const elementsModalSubmit = [...modalSubmit]
  .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');

// Запушить товар в базу даных
const saveDataBase = () => localStorage.setItem('awito', JSON.stringify(dataBase));

const infoPhoto = {};

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
      modalImageAdd.src = modalImageSrc;
      modalFileBtn.textContent = FileBtnText;
    }
  })
}

//Вывод карточек
const renderCard = () => {
  catalog.textContent = '';
  dataBase.forEach((item, index) => {
    catalog.insertAdjacentHTML('beforeend', `
      <li class ="card" data-id="${index}">
    		<img class = "card__image" src = "data:image/jpeg;base64,${item.image}"
    		alt = "test" >
    		<div class = "card__description">
          <h3 class = "card__header">${item.nameItem}</h3> 
          <div class = "card__price">${item.costItem}</div>
        </div> 
      </li>
    `);
  });
}

// Модальное окно нового товара
addBtn.addEventListener('click', () => {
  openMoodal('.modal__add');
  modalBtnSubmit.disabled = true
});

//Открытие модального окна товара
catalog.addEventListener('click', event => {
  if (event.target.closest('.card')) {
    openMoodal('.modal__item')
  }
})


// Выгрузка изображения
modalSubmit.addEventListener('change', event => {
  const reader = new FileReader();
  const file = event.target.files[0];

  infoPhoto.name = file.name;
  infoPhoto.size = file.size;

  reader.readAsBinaryString(file);

  reader.addEventListener('load', event => {

    if (infoPhoto.size < 200000) {
      modalFileBtn.textContent = infoPhoto.name;
      infoPhoto.base64 = btoa(event.target.result);
      modalImageAdd.src = `data:image/jpeg;base64, ${infoPhoto.base64}`;
    } else {
      modalFileBtn.textContent = "Размер файда не более 200кб";
      modalFileInput.value = '';
    }
  });
});

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
    itemObj[elem.name] = elem.value;
  }
  itemObj.image = infoPhoto.base64;
  dataBase.push(itemObj);
  modalSubmit.reset();
  //КОСТЫЛЬ. Исправить!
  document.querySelector('.modal__add').classList.add('hide');
  document.body.style.overflow = "";
  saveDataBase();
  renderCard();
});

renderCard();
