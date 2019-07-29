var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSelectModule } from 'ngx-select-ex';
import { SharedModule } from '../../shared/shared.module';
import { ListComponent } from './list/list.component';
import { PostComponent } from './post/post.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleviewComponent } from './articleview/articleview.component';
var routes = [
    { path: 'list', component: ListComponent },
    { path: 'post', component: PostComponent },
    { path: 'articles', component: ArticlesComponent },
    { path: 'articleview', component: ArticleviewComponent }
];
var BlogModule = /** @class */ (function () {
    function BlogModule() {
    }
    BlogModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes),
                NgxSelectModule
            ],
            declarations: [
                ListComponent,
                PostComponent,
                ArticlesComponent,
                ArticleviewComponent
            ],
            exports: [
                RouterModule
            ]
        })
    ], BlogModule);
    return BlogModule;
}());
export { BlogModule };
//# sourceMappingURL=blog.module.js.map