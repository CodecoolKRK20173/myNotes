"use strict";

const ol = document.querySelector('ol');
const body = document.querySelector('body')

document.getElementById("newNote").addEventListener("click", addNote);

function createNoteObject(notes){
  let now = new Date();
  let dateDay = now.getDate();
  let dateMonth = now.getMonth() + 1;
  let dateYear = now.getFullYear();
  let noteDate = dateDay + "-" + dateMonth + "-" + dateYear;
  let note = {
    title:"",
    noteContent:"",
    noteDate:noteDate,
    id:notes.length+1
  }
  return note;
}

function addNote() {

  let notes = JSON.parse(localStorage.getItem("notes"));
  let note = createNoteObject(notes);
  notes.push(note);
  const noteID = note.id;
  localStorage.setItem("notes", JSON.stringify(notes));

  let divAddContent = document.getElementById('form-input').innerHTML;
  let newNote = `<div class='form-group' id="note${noteID}">
                  <button id="deleteButton${noteID}" onclick="deleteNote(${noteID})" >X</button>
                  <div class='form-group'>
                    <input type='text'>
                  </div>
                  <div class='form-group'>
                    <textarea type='text'></textarea>
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


let displayNotes = function () {
  console.log("display")

  var notesToWeb = JSON.parse(localStorage.getItem("notes"));
  
  var arrayIndex = 0;
  if (notesToWeb != null) {
    for (let i = 0; i < notesToWeb.length; i++) {
      let noteTitle = notesToWeb[i].title;
      let noteDate = notesToWeb[i].noteDate;

      arrayIndex = i;
      // liMaker(noteTitle, noteDate, arrayIndex, notesToWeb);
    }
  }
  // let clearBtn = document.createElement('input');
  // clearBtn.setAttribute('type', 'submit');
  // clearBtn.value = "Clear";
  // clearBtn.addEventListener("click", handleClear);
  // document.getElementById('list').appendChild(clearBtn);
}


let createLocalStorageList = function() {
    // create localStorage file is it doesn't exist
    if (JSON.parse(localStorage.getItem("notes")) === null) {
      let notes = new Array();
      localStorage.setItem("notes", JSON.stringify(notes));
    }  
}

window.onload = ()=>{displayNotes(); createLocalStorageList()};
