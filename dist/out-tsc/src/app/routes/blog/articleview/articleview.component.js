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
var ArticleviewComponent = /** @class */ (function () {
    function ArticleviewComponent() {
        this.itemsCategories = ['coding', 'less', 'sass', 'angularjs', 'node', 'expressJS'];
        this.itemsTags = ['JAVASCRIPT', 'WEB', 'BOOTSTRAP', 'SERVER', 'HTML5', 'CSS'];
        this.itemsReview = [
            'Adam <adam@email.com>',
            'Amalie <amalie@email.com>',
            'Wladimir <wladimir@email.com>',
            'Samantha <samantha@email.com>',
            'Estefanía <estefanía@email.com>',
            'Natasha <natasha@email.com>',
            'Nicole <nicole@email.com>',
            'Adrian <adrian@email.com>'
        ];
    }
    ArticleviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Summernote is currently not ported as a native angular2 module
        // For a quick use it we use the component a wrapper
        // Plugin events can be used to keep component props
        // in sync with the editor content
        $('#summernote').summernote({
            height: 280,
            dialogsInBody: true,
            callbacks: {
                onChange: function (contents, $editable) {
                    _this.contents = contents;
                    // console.log(contents);
                }
            }
        });
        // Hide the initial popovers that display
        $('.note-popover').css({
            'display': 'none'
        });
    };
    ArticleviewComponent = __decorate([
        Component({
            selector: 'app-articleview',
            templateUrl: './articleview.component.html',
            styleUrls: ['./articleview.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ArticleviewComponent);
    return ArticleviewComponent;
}());
export { ArticleviewComponent };
//# sourceMappingURL=articleview.component.js.map