import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../../model/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts : Post[] = [] ;
  isLoading: boolean = false;
  private postsSub: Subscription = new Subscription();

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true ;
    this.postService.getPosts() ;
    this.postsSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
        this.posts = posts;
        // this.isLoading = false;
    })
  }

  onDeletePost(postId: string){
    this.postService.deletePost(postId);
  }

  onEditPost(postId: string) {
    this.router.navigate([`update/${postId}`]);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe() ;
  }

}
