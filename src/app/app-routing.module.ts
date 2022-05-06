import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/components/post-create/post-create.component';
import { PostListComponent } from './posts/components/post-list/post-list.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'create',
    component: PostCreateComponent
  },
  {
    path: 'update/:postId',
    component: PostCreateComponent
  }
  // {
  //   path:"***",
  //   component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
