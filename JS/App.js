"use strict";

const ol = document.querySelector('ol');
const body = document.querySelector('body')

document.getElementById("newNote").addEventListener("click", createNewNote);


function createNewNote(){
  let notes = JSON.parse(localStorage.getItem("notes"));
  let note = createNoteObject(notes);
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNote(note);
}


function createNoteObject(notes){
  let now = new Date();
  let dateDay = now.getDate();
  let dateMonth = now.getMonth() + 1;
  let dateYear = now.getFullYear();
  let noteDate = dateDay + "-" + dateMonth + "-" + dateYear;
  let note = {
    title:"add title",
    noteContent:"add content",
    noteDate:noteDate,
    id:notes.length+1
  }
  return note;
}


function displayNote(note) {
  const noteID = note.id;
  console.log(note.noteContent)
  let divAddContent = document.getElementById('form-input').innerHTML;
  let newNote = `<div class='form-group' id="note${noteID}">
                  <p>${note.noteDate}</p>
                  <button id="deleteButton${noteID}" onclick="deleteNote(${noteID})">X</button>
                  <div class='form-group'>
                    <input type='text' id="title${noteID}" value='${note.title}' oninput="editNote(${noteID},'title')">
                  </div>
                  <div class='form-group'>
                    <textarea type='text' id="noteContent${noteID}" oninput="editNote(${noteID},'noteContent')">${note.noteContent}</textarea>
                  </div>
                </div>`;

  let updatedContent = divAddContent+=newNote;
  document.getElementById('form-input').innerHTML = updatedContent;
  // document.getElementById(`deleteButton${noteID}`).addEventListener('click',function(){deleteNote(noteID)});
                
  console.log('addNote function fired');
}

function deleteNote(id){
  console.log(`removed id = ${id}`)
  document.getElementById(`note${id}`).outerHTML = "";
  
  let notes = JSON.parse(localStorage.getItem("notes"));
  let indexToDelete = "";

  notes.forEach((note, i) => {
    if (id == note.id){
      indexToDelete = i;
    }
  });

  notes.splice(indexToDelete,1);
  localStorage.setItem("notes", JSON.stringify(notes));

  // noteToDelete.parentElement.removeChild(noteToDelete);
}


function editNote(id,changedProperty){
  let newValue = "";
  if (changedProperty === "title" ) {
    newValue = document.getElementById(`title${id}`).value;
  } else {
    newValue = document.getElementById(`noteContent${id}`).value;
  }

  let notes = JSON.parse(localStorage.getItem("notes"));
  console.log(newValue);
  notes.forEach((note, i) => {
    if (note.id == id){
      note[changedProperty] = newValue;
    }
  });

  localStorage.setItem("notes", JSON.stringify(notes));

}

let displaInitialNotes = function () {
  console.log("display")

  var notesToWeb = JSON.parse(localStorage.getItem("notes"));
  notesToWeb.forEach(note => {
    displayNote(note);
  });
  

}


let createLocalStorageList = function() {
    // create localStorage file is it doesn't exist
    if (JSON.parse(localStorage.getItem("notes")) === null) {
      let notes = new Array();
      localStorage.setItem("notes", JSON.stringify(notes));
    }  
}

window.onload = ()=>{displaInitialNotes(); createLocalStorageList()};
