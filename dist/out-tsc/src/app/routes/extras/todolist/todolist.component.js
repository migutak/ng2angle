var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
var TodolistComponent = /** @class */ (function () {
    function TodolistComponent() {
        this.items = [
            {
                todo: { title: 'Meeting with Mark at 7am.', description: 'Pellentesque convallis mauris eu elit imperdiet quis eleifend quam aliquet. ' },
                complete: true
            },
            {
                todo: { title: 'Call Sonya. Talk about the new project.', description: '' },
                complete: false
            },
            {
                todo: { title: 'Find a new place for vacations', description: '' },
                complete: false
            }
        ];
        this.editingTodo = false;
        this.todo = {};
    }
    TodolistComponent.prototype.ngOnInit = function () {
    };
    TodolistComponent.prototype.addTodo = function () {
        if (this.todo.title === '')
            return;
        if (!this.todo.description)
            this.todo.description = '';
        if (this.editingTodo) {
            this.todo = {};
            this.editingTodo = false;
        }
        else {
            this.items.push({ todo: $.extend({}, this.todo), complete: false });
            this.todo.title = '';
            this.todo.description = '';
        }
    };
    ;
    TodolistComponent.prototype.editTodo = function (index, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.todo = this.items[index].todo;
        this.editingTodo = true;
    };
    ;
    TodolistComponent.prototype.removeTodo = function (index /*, $event*/) {
        this.items.splice(index, 1);
    };
    ;
    TodolistComponent.prototype.clearAll = function () {
        this.items = [];
    };
    ;
    TodolistComponent.prototype.totalCompleted = function () {
        return this.items.filter(function (item) {
            return item.complete;
        }).length;
    };
    ;
    TodolistComponent.prototype.totalPending = function () {
        return this.items.filter(function (item) {
            return !item.complete;
        }).length;
    };
    ;
    TodolistComponent = __decorate([
        Component({
            selector: 'app-todolist',
            templateUrl: './todolist.component.html',
            styleUrls: ['./todolist.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], TodolistComponent);
    return TodolistComponent;
}());
export { TodolistComponent };
//# sourceMappingURL=todolist.component.js.map