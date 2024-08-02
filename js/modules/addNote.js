// Импорт функций
import {localStorageSave, takeDataFromLocalStorage, loadNotes, loadChecked, checkCardsForTitle, saveLocalStorageChecked} from './localStorage';

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
            localStorageSave('notes', notesData);
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

export {newNote, addNote, styleToggle};