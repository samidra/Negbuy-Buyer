import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBlogComponent } from './my-blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';


const routes: Routes = [
    {
        path:"",
        component:MyBlogComponent
    },
    {
      path:"blog-detail/:blog_title",
      component:BlogDetailComponent
    }
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class myblogRoutingModule { }
