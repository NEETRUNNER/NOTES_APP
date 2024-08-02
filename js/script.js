import {newNote, addNote, styleToggle} from './modules/addNote';
import {checkedNote} from './modules/checked';
import {deleteCard, deleteAllNotes} from './modules/delete';
import {localStorageSave, takeDataFromLocalStorage, loadNotes, loadChecked, checkCardsForTitle, saveLocalStorageChecked} from './modules/localStorage';
import {enterEvent} from './modules/other';


// Переменные для использования
const btnAdd = document.querySelector('[data-btn="add"]');
const btnDeleteAll = document.querySelector('[data-btn="deleteAll"]');
const input = document.querySelector('[data-input]');
const deleteNote = document.querySelector('[data-delete]');
const cardImg = document.querySelectorAll('.notes-card__img');
const checked = document.querySelector('.notes-card__img')
const cardTitle = document.querySelector('#title');

saveLocalStorageChecked();