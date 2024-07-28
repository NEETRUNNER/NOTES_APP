const btnAdd = document.querySelector('[data-btn="add"]');
const btnDeleteAll = document.querySelector('[data-btn="deleteAll"]');
const input = document.querySelector('[data-input]');
const deleteNote = document.querySelector('[data-delete]');
const cardImg = document.querySelectorAll('.notes-card__img');
const checked = document.querySelector('.notes-card__img')
const cardTitle = document.querySelector('#title');

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


// Функция отвечает за отметку сделанной заметки
function checkedNote() {
    document.addEventListener('click', (event) => { // Используем весь документ для клика по елементу, для этого выполняем доп. проверку
        if (event.target.matches('.notes-card__img[data-checked]')) {
            const noteCard = event.target.closest('.notes-card');
            const noteTitle = noteCard.querySelector('.notes-card__title');
            
            if (noteCard && noteTitle) {
                styleToggle(noteCard, noteTitle);
            }

        }
    });
}
checkedNote();


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