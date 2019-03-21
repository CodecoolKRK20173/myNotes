"use strict";

const ol = document.querySelector('ol');
const body = document.querySelector('body')

document.getElementById("newNote").addEventListener("click", addNote);

function addNote() {
  let parent = document.getElementById('form-input');

  let divInput = document.createElement('div');
  divInput.setAttribute('class', 'form-group');
  let input = document.createElement('input');
  input.setAttribute('type', 'text', 'class', 'form-control', 'id', 'title'); // adding multiple attributes don't work?
  input.id = 'title';
  input.value = "Title";
  // input.addEventListener("input",handleAutoSave);
  divInput.appendChild(input);

  let divTextarea = document.createElement('div');
  divTextarea.setAttribute('class', 'form-group');
  let textArea = document.createElement('textarea');
  textArea.setAttribute('class', 'form-control');
  textArea.id = 'content';
  textArea.value = "notes...";
  // textArea.addEventListener("input", handleAutoSave);
  divTextarea.appendChild(textArea);

  // Save button logic - according to requirements it should be auto-save
  let saveBtn = document.createElement('input');
  saveBtn.setAttribute('type', 'submit');
  saveBtn.value = "Save";
  saveBtn.addEventListener("click", handleAutoSave);

  parent.appendChild(divInput);
  parent.appendChild(divTextarea);
  parent.appendChild(saveBtn);

  console.log('addNote function fired');
}

let handleAutoSave = function () {
  // create localStorage file is it doesn't exist
  if (JSON.parse(localStorage.getItem("notes")) === null) {
    let notes = new Array();
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // read existing localStorage file
  let notes = JSON.parse(localStorage.getItem("notes"));

  // prepare data for new note
  let title = document.getElementById('title').value;
  let noteContent = document.getElementById('content').value;

  let now = new Date();
  let dateDay = now.getDate();
  let dateMonth = now.getMonth() + 1;
  let dateYear = now.getFullYear();
  let noteDate = dateDay + "-" + dateMonth + "-" + dateYear;

  let note = {
    title,
    noteContent,
    noteDate
  }

  notes.push(note);

  // save new invoice in localStorage
  localStorage.setItem("notes", JSON.stringify(notes));
  console.log('note: ' + note.title + 'saved to localstorage');
}

let liMaker = function (title, date, arrayIndex, notesToWeb) {
  let editBtn = document.createElement('input');
  editBtn.setAttribute('type', 'submit');
  editBtn.value = "Edit";
  editBtn.addEventListener("click", function (){handleEditClick(arrayIndex)});

  let deleteBtn = document.createElement('input');
  deleteBtn.setAttribute('type', 'submit');
  deleteBtn.value = "X";
  deleteBtn.addEventListener("click", function (){handleDeleteClick(arrayIndex, notesToWeb)});

  const li = document.createElement('li');
  li.textContent = title + " \u000B " + date + " | "; // \u000B should be tabulator but it don't work
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  ol.appendChild(li);
}

let handleEditClick = function (arrayIndex) {
  // read existing localStorage file
  let notes = JSON.parse(localStorage.getItem("notes"));

  let now = new Date();
  let dateDay = now.getDate();
  let dateMonth = now.getMonth() + 1;
  let dateYear = now.getFullYear();
  let noteDate = dateDay + "-" + dateMonth + "-" + dateYear;

  let parent = document.getElementById('form-input');

  let divInput = document.createElement('div');
  divInput.setAttribute('class', 'form-group');
  let input = document.createElement('input');
  input.setAttribute('type', 'text', 'class', 'form-control', 'id', 'title'); // why adding multiple attributes don't work?
  input.id = 'title';
  input.value = notes[arrayIndex].title;
  divInput.appendChild(input);

  let divTextarea = document.createElement('div');
  divTextarea.setAttribute('class', 'form-group');
  let textArea = document.createElement('textarea');
  textArea.setAttribute('class', 'form-control');
  textArea.id = 'content';
  textArea.value = notes[arrayIndex].noteContent;
  divTextarea.appendChild(textArea);

  // Save button logic - according to requirements it should be auto-save
  let saveBtn = document.createElement('input');
  saveBtn.setAttribute('type', 'submit');
  saveBtn.value = "Save";
  saveBtn.addEventListener("click", handleAutoSave);

  parent.appendChild(divInput);
  parent.appendChild(divTextarea);
  parent.appendChild(saveBtn);
}

let handleClear = function () {
  console.log('handleClear fired');
  localStorage.clear();
}

let displayNotes = function () {
  console.log("display")

  var notesToWeb = JSON.parse(localStorage.getItem("notes"));
  // debugger
  var arrayIndex = 0;
  if (notesToWeb != null) {
    for (let i = 0; i < notesToWeb.length; i++) {
      let noteTitle = notesToWeb[i].title;
      let noteDate = notesToWeb[i].noteDate;

      arrayIndex = i;
      liMaker(noteTitle, noteDate, arrayIndex, notesToWeb);
    }
  }
  let clearBtn = document.createElement('input');
  clearBtn.setAttribute('type', 'submit');
  clearBtn.value = "Clear";
  clearBtn.addEventListener("click", handleClear);
  document.getElementById('list').appendChild(clearBtn);
}

let handleDeleteClick = function (arrayIndex, notesToWeb) {
  document.getElementById('list').innerHTML = '';
    console.log("clear");
   notesToWeb.splice(arrayIndex,1);
   // delete notesToWeb[arrayIndex];
   // save new invoice in localStorage
   localStorage.setItem("notes", JSON.stringify(notesToWeb));
   console.log("next display")
   displayNotes();

  }


window.onload = displayNotes();