// Импорт функций
import {newNote, addNote, styleToggle} from './addNote';

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
            newNote(note.title);
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

export {localStorageSave, takeDataFromLocalStorage, loadNotes, loadChecked, checkCardsForTitle, saveLocalStorageChecked}