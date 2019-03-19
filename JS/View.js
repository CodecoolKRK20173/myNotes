"use strict";

export class View{

    view(controller){
        this.controller = controller;
        this.link = document.getElementById('newNote');
        this.heading.innerText = controller.getModelHeading();
        this.heading.addEventListener('click', controller);
    }

}

