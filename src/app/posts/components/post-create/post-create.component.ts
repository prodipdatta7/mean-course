import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../../model/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  newPost = '';
  enteredTitle: any ;
  enteredContent: any ;
  mode: string = 'create' ;
  postId: any = null ;
  updatingPost: any ;
  isLoading: boolean = false ;

  constructor(
    private postService: PostService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      if(param.has('postId')) {
        this.mode = 'update',
        this.postId = param.get('postId') ;
        this.isLoading = true ;
        this.postService.getPost(this.postId).subscribe(post => {
          this.isLoading = false ;
          this.updatingPost = {id: post._id, title: post.title, content: post.content}
        });
      }
      else {
        this.mode = 'create',
        this.postId = null ;
      }
    })
  }

  onSavePost(postForm: NgForm){
    if(postForm.invalid){
      return;
    }
    if(this.mode === 'update')
      this.postService.updatePost(this.postId, postForm.value.title, postForm.value.content);
    else
      this.postService.addPost(postForm.value.title, postForm.value.content);
    postForm.resetForm();
  }

}
