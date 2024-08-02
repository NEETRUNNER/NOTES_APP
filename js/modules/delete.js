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

export {deleteCard, deleteAllNotes};