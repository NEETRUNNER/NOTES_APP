// Импорт функций
import {newNote, addNote, styleToggle} from './addNote';
import {localStorageSave, takeDataFromLocalStorage, loadNotes, loadChecked, checkCardsForTitle, saveLocalStorageChecked} from './localStorage';

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
            newNote(value);
            console.log('Нажался Enter');
    
            // Обновляем сохраненные заметки в localStorage
            const notesData = Array.from(document.getElementsByClassName('notes-card')).map(noteCard => {
                return {
                    title: noteCard.querySelector('.notes-card__title').textContent
                };
            });
    
            localStorageSave('notes', notesData);
            
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

export {enterEvent};