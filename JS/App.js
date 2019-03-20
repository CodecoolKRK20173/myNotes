"use strict";

// import {Controller} from "./Controller.js";
// import {Model} from "./Model.js";
// import {View} from "./View.js";

// function main(){
//     var model = new Model();
//     var controller = new Controller(model);
//     var view = new View(controller);
//   }

// main();

const ol = document.querySelector('ol');

document.getElementById("newNote").addEventListener("click", addNote);

function addNote() {
  let parent = document.getElementById('form-input');

  let divInput = document.createElement('div');
  divInput.setAttribute('class', 'form-group');
  let input = document.createElement('input');
  input.setAttribute('type', 'text', 'class', 'form-control', 'id', 'title'); // why adding multiple attributes don't work?
  input.id = 'title';
  input.value = "Title";
  divInput.appendChild(input);

  let divTextarea = document.createElement('div');
  divTextarea.setAttribute('class', 'form-group');
  let textArea = document.createElement('textarea');
  textArea.setAttribute('class', 'form-control');
  textArea.id = 'content';
  textArea.value = "notes...";
  divTextarea.appendChild(textArea);

  // Save button logic - according to requirements it should be auto-save
  let saveBtn = document.createElement('input');
  saveBtn.setAttribute('type', 'submit');
  saveBtn.value = "Save";
  saveBtn.addEventListener("click", handleSaveClick);

  parent.appendChild(divInput);
  parent.appendChild(divTextarea);
  parent.appendChild(saveBtn);
}

let handleSaveClick = function () {
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

}

let liMaker = function (title, date, arrayIndex,notesToWeb) {
  let editBtn = document.createElement('input');
  editBtn.setAttribute('type', 'submit');
  editBtn.value = "Edit";
  // editBtn.addEventListener("click", handleEditClick(arrayIndex));  

  let deleteBtn = document.createElement('input');
  deleteBtn.setAttribute('type', 'submit');
  deleteBtn.value = "X";
  // deleteBtn.addEventListener("click", handleDeleteClick(arrayIndex, notesToWeb));

  const li = document.createElement('li');
  li.textContent = title + " \u000B " + date + " | "; // \u000B should be tabulator but it don't work
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  ol.appendChild(li);
}

window.onload = event => {
  var notesToWeb = JSON.parse(localStorage.getItem("notes"));
  // debugger
  var arrayIndex = 0;
  if (notesToWeb != null){
    for (let i=0; i < notesToWeb.length; i++){
      let noteTitle = notesToWeb[i].title;
      let noteDate = notesToWeb[i].noteDate;  
      arrayIndex = i;
      liMaker(noteTitle, noteDate, arrayIndex, notesToWeb);
    }
    // notesToWeb.forEach(note => {
    //   let noteTitle = note.title;
    //   let noteDate = note.noteDate;
    
    //   liMaker(noteTitle, noteDate, arrayIndex);
    //   arrayIndex +=1;
    // });
  }
}

let handleDeleteClick = function (arrayIndex, notesToWeb) {
  delete notesToWeb[arrayIndex];
  // save new invoice in localStorage
  localStorage.setItem("notes", JSON.stringify(notesToWeb));
}