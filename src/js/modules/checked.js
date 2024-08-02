// Импорт функций
import {newNote, addNote, styleToggle} from './addNote';


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

export {checkedNote};