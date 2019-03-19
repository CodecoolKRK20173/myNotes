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

// document.body.innerHTML = "App.js works";

document.getElementById("newNote").addEventListener("click", addNote);

function addText() {
  let newNote = document.createElement('template');
  newNote.innerHTML = 
  document.getElementById("demo").innerHTML = "New note created!";
}

function addNote(){
  var parent = document.getElementById('form-input');

  var divInput = document.createElement('div');
  divInput.setAttribute('class', 'form-group');
  var input = document.createElement('input');
  input.setAttribute('type','text','class','form-control','id','title');
  input.value = "Title";
  divInput.appendChild(input);
  
  var divTextarea = document.createElement('div');
  divTextarea.setAttribute('class','form-group');
  var textArea = document.createElement('textarea');
  textArea.setAttribute('class','form-control','id','content');
  textArea.value = "notes..."
  divTextarea.appendChild(textArea);

  parent.appendChild(divInput);
  parent.appendChild(divTextarea);
}
