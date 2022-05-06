import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import { PostListComponent } from './components/post-list/post-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  exports:[PostCreateComponent, HeaderComponent, PostListComponent]
})
export class PostsModule { }
