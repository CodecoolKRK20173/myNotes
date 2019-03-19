"use strict";

export class Controller {

    Controller(model) {
        var self = this;
        this.model = model;
        //EVENTLISTENER INTERFACE
        this.handleEvent = function (e) {
            e.stopPropagation();
            switch (e.type) {
                case "click":
                    self.clickHandler(e.target);
                    break;
                default:
                    console.log(e.target);
            }
        }
        //GET MODEL HEADING
        this.getModelHeading = function () {
            return self.model.link;
        }
        //CHANGE THE MODEL
        this.clickHandler = function (target) {
            self.model.link = 'World';
            target.innerText = self.getModelHeading();
        }
    }
}

