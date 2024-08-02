/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/addNote.js":
/*!***********************************!*\
  !*** ./src/js/modules/addNote.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addNote: () => (/* binding */ addNote),
/* harmony export */   newNote: () => (/* binding */ newNote),
/* harmony export */   styleToggle: () => (/* binding */ styleToggle)
/* harmony export */ });
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ "./src/js/modules/localStorage.js");
// Импорт функций


// Переменные для использования
const btnAdd = document.querySelector('[data-btn="add"]');
const input = document.querySelector('[data-input]');

// Функция динамически создает новую заметку
function newNote (value) {
    class Note {
        constructor (title) {
            this.title = title;
        }

        render () {
            const wrapperCard = document.querySelector('.notes-cards__block');

            const element = document.createElement('div');
            element.className = 'notes-card';
            element.setAttribute('data-card', '');
            wrapperCard.appendChild(element);

            element.innerHTML = `
            <div class="notes-card__title">${this.title}</div>
            <div class="notes-card__block">
                <img data-delete src="img/delete.png" alt="" class="notes-card__img">
                <img data-checked src="img/checked.png" alt="" class="notes-card__img">
            </div>
        </div>`
        }
    }
    new Note(value).render(value);
    
}

// Функция проверяет если в инпут ничего нет, то она ничего не делает, если есть то переиспользует функцию newNote которая динамически добавляет елемент
function addNote () {
    btnAdd.addEventListener('click', () => {
        const value = input.value;

        if (value.length === 0) {
            console.log('Ничего');
        } else {
            console.log(value);
            newNote(value);
            input.value = '';

            // Для каждой новой заметки добавляем имя notes и значение заметки в notesData
            const notesData = Array.from(document.getElementsByClassName('notes-card')).map(noteCard => {
                return {
                    // Для каждого элемента noteCard, он создает новый объект с одним свойством title
                    title: noteCard.querySelector('.notes-card__title').textContent
                    // noteCard.querySelector('.notes-card__title').textContent получает текстовое содержимое элемента с классом notes-card__title внутри текущего noteCard.
                };
            });
            // Сохраняем эти данные в localStorage
            (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.localStorageSave)('notes', notesData);
        }

        
    });
}
addNote();

// Функция меняет стили при конкретном условии
function styleToggle(noteCard, noteTitle) {
    const noteCardIsToggle = noteCard.style.opacity === '0.5';
    
    if (noteCardIsToggle) {
        noteCard.style.opacity = '1';
        noteTitle.style.textDecoration = 'none';
        noteCard.style.transition = '0.5s all';
    } else {
        noteCard.style.opacity = '0.5';
        noteTitle.style.textDecoration = 'line-through';
        noteCard.style.transition = '0.5s all';
    }
}



/***/ }),

/***/ "./src/js/modules/checked.js":
/*!***********************************!*\
  !*** ./src/js/modules/checked.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkedNote: () => (/* binding */ checkedNote)
/* harmony export */ });
/* harmony import */ var _addNote__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addNote */ "./src/js/modules/addNote.js");
// Импорт функций



// Функция отвечает за отметку сделанной заметки
function checkedNote() {
    document.addEventListener('click', (event) => { // Используем весь документ для клика по елементу, для этого выполняем доп. проверку
        if (event.target.matches('.notes-card__img[data-checked]')) {
            const noteCard = event.target.closest('.notes-card');
            const noteTitle = noteCard.querySelector('.notes-card__title');
            
            if (noteCard && noteTitle) {
                (0,_addNote__WEBPACK_IMPORTED_MODULE_0__.styleToggle)(noteCard, noteTitle);
            }

        }
    });
}
checkedNote();



/***/ }),

/***/ "./src/js/modules/delete.js":
/*!**********************************!*\
  !*** ./src/js/modules/delete.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteAllNotes: () => (/* binding */ deleteAllNotes),
/* harmony export */   deleteCard: () => (/* binding */ deleteCard)
/* harmony export */ });
// Переменные для использования
const btnDeleteAll = document.querySelector('[data-btn="deleteAll"]');
const cardTitle = document.querySelector('#title');

// Удаления карточки
function deleteCard () {
    document.addEventListener('click', (event) => {
        const noteCards = document.getElementsByClassName('notes-card');

        if (event.target.matches('.notes-card__img[data-delete]')) {
            const noteCard = event.target.closest('.notes-card');
            noteCard.remove();
            if (noteCard.style.opacity === '0.5') {
                localStorage.removeItem('checked')
            }
        }


        if (noteCards.length < 1) {
            cardTitle.style.display = 'block';
            localStorage.removeItem('notes');
        } else {
            cardTitle.style.display = 'none';
        }
    })
}
deleteCard();

// Удаление всех заметок
function deleteAllNotes () {
    btnDeleteAll.addEventListener('click', () => {
        const noteCards = Array.from(document.getElementsByClassName('notes-card'));
        console.log(noteCards);

        if (noteCards.length >= 1) {
            noteCards.forEach(element => element.remove());
            localStorage.removeItem('notes');
        }
    })
}
deleteAllNotes();



/***/ }),

/***/ "./src/js/modules/localStorage.js":
/*!****************************************!*\
  !*** ./src/js/modules/localStorage.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkCardsForTitle: () => (/* binding */ checkCardsForTitle),
/* harmony export */   loadChecked: () => (/* binding */ loadChecked),
/* harmony export */   loadNotes: () => (/* binding */ loadNotes),
/* harmony export */   localStorageSave: () => (/* binding */ localStorageSave),
/* harmony export */   saveLocalStorageChecked: () => (/* binding */ saveLocalStorageChecked),
/* harmony export */   takeDataFromLocalStorage: () => (/* binding */ takeDataFromLocalStorage)
/* harmony export */ });
/* harmony import */ var _addNote__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addNote */ "./src/js/modules/addNote.js");
// Импорт функций


// Переменные для использования
const cardTitle = document.querySelector('#title');

// Localstorage

// Функция для сохранения данных в localStorage и преобразования в json строку
function localStorageSave(key, value) {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
}


// Получения данных из localStorage
function takeDataFromLocalStorage(key) {
    // Извлекаем данные из localStorage по указанному ключу
    const retrievedData = localStorage.getItem(key);
    
    // Проверяем, существуют ли данные
    if (retrievedData) {
        // Преобразуем JSON-строку обратно в объект JavaScript
        const parsedData = JSON.parse(retrievedData);
        
        // Выводим объект в консоль для проверки
        console.log(parsedData);
        
        // Возвращаем объект
        return parsedData;
    }
}


// Загрузка наших заметок
function loadNotes() {
    const notesData = takeDataFromLocalStorage('notes');

    if (notesData) {
        notesData.forEach(note => {
            (0,_addNote__WEBPACK_IMPORTED_MODULE_0__.newNote)(note.title);
        });
    }
}
loadNotes();


// CHATGPT
function loadChecked() {
    const checkedData = takeDataFromLocalStorage('checked');

    if (Array.isArray(checkedData)) {
        checkedData.forEach(checked => {
            const noteCard = Array.from(document.querySelectorAll('.notes-card')).find(el => el.querySelector('.notes-card__title').textContent === checked.title);
            if (noteCard && checked.opacity === '0.5') {
                noteCard.style.opacity = '0.5';
                noteCard.querySelector('.notes-card__title').style.textDecoration = 'line-through';
            }
        });
    }
}
loadChecked();


// Функция проверяет есть ли у нас в localStorage ключ notes, если есть то убирает название добавить новую заметку
function checkCardsForTitle () {
    if (localStorage.getItem('notes')) {
        cardTitle.style.display = 'none';
    }
}
checkCardsForTitle();


// CHATGPT
// Сохранение состояния карточки в localStorage при нажатии на кнопку
function saveLocalStorageChecked() {
    document.addEventListener('click', (event) => {
        const noteCard = event.target.closest('.notes-card');
        
        if (event.target.matches('[data-checked]') && noteCard) {
            let checkedData = takeDataFromLocalStorage('checked') || [];
            
            const noteCardData = {
                title: noteCard.querySelector('.notes-card__title').textContent,
                opacity: noteCard.style.opacity
            };

            // Проверка стиля opacity
            if (noteCard.style.opacity === '0.5') {
                console.log('Произошёл клик');
                
                // Удаление существующей записи, если она уже была сохранена
                checkedData = checkedData.filter(item => item.title !== noteCardData.title);
                
                // Добавление новой записи
                checkedData.push(noteCardData);
                
            } else if (noteCard.style.opacity === '1') {
                console.log('Клик произошёл не туда');
                
                // Удаление записи из массива, если opacity равно 1
                checkedData = checkedData.filter(item => item.title !== noteCardData.title);
            }
            
            localStorageSave('checked', checkedData);
        }
    });
}
saveLocalStorageChecked();



/***/ }),

/***/ "./src/js/modules/other.js":
/*!*********************************!*\
  !*** ./src/js/modules/other.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   enterEvent: () => (/* binding */ enterEvent)
/* harmony export */ });
/* harmony import */ var _addNote__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addNote */ "./src/js/modules/addNote.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ "./src/js/modules/localStorage.js");
// Импорт функций



// Переменные для использования
const cardTitle = document.querySelector('#title');

// Функция будет улавливать нажатие enter и добавлять input содержимое в карточку
function enterEvent () {
    document.addEventListener('keydown', (e) => {
        const input = document.querySelector('[data-input]');
        const value = input.value.trim();

        if (e.code === 'Enter') {
            e.preventDefault(); // Предотвращаем стандартное поведение формы
        }
    
        if (e.code === 'Enter' && value) {
            (0,_addNote__WEBPACK_IMPORTED_MODULE_0__.newNote)(value);
            console.log('Нажался Enter');
    
            // Обновляем сохраненные заметки в localStorage
            const notesData = Array.from(document.getElementsByClassName('notes-card')).map(noteCard => {
                return {
                    title: noteCard.querySelector('.notes-card__title').textContent
                };
            });
    
            (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.localStorageSave)('notes', notesData);
            
            // Очищаем поле ввода после добавления заметки
            input.value = '';
        } else if (e.code === 'Enter') {
            console.log('Энтер не нажался или значение пустое');
        }

        if (localStorage.getItem('notes')) {
            cardTitle.style.display = 'none';
        }
    });
}
enterEvent();



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_addNote__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/addNote */ "./src/js/modules/addNote.js");
/* harmony import */ var _modules_checked__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/checked */ "./src/js/modules/checked.js");
/* harmony import */ var _modules_delete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/delete */ "./src/js/modules/delete.js");
/* harmony import */ var _modules_localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/localStorage */ "./src/js/modules/localStorage.js");
/* harmony import */ var _modules_other__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/other */ "./src/js/modules/other.js");







// Переменные для использования
const btnAdd = document.querySelector('[data-btn="add"]');
const btnDeleteAll = document.querySelector('[data-btn="deleteAll"]');
const input = document.querySelector('[data-input]');
const deleteNote = document.querySelector('[data-delete]');
const cardImg = document.querySelectorAll('.notes-card__img');
const checked = document.querySelector('.notes-card__img')
const cardTitle = document.querySelector('#title');

(0,_modules_localStorage__WEBPACK_IMPORTED_MODULE_3__.saveLocalStorageChecked)();
/******/ })()
;
//# sourceMappingURL=bundle.js.map