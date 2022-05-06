import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) {}

  getPosts() {
    const url = 'http://localhost:3000/api/posts';
    this.httpClient
      .get<{ message: string; posts: any }>(url)
      .pipe(
        map((postData) => {
          return postData.posts.map((post: any) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((res: any) => {
        this.posts = res;
        this.postUpdated.next([...this.posts]);
      });
    // return [...this.posts]; // a true copy is returned here
  }

  getPost(postId: string) {
    const url = 'http://localhost:3000/api/posts/' + postId;
    return this.httpClient.get<{_id: string, title: string, content: string}>(url);
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: any = {
      title: title,
      content: content,
    };
    const url = 'http://localhost:3000/api/posts';
    this.httpClient
      .post<{ message: string; postId: string }>(url, post)
      .subscribe((res) => {
        console.log(res);
        post.id = res.postId;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']) ;
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content,
    };
    const url = 'http://localhost:3000/api/posts/' + id;
    this.httpClient.put(url, post).subscribe((res) => {
      const updatedPosts = [...this.posts];
      const oldIndex = updatedPosts.findIndex((idx) => idx.id === post.id);
      updatedPosts[oldIndex] = post;
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    const url = 'http://localhost:3000/api/posts/' + postId;
    this.httpClient.delete(url).subscribe(() => {
      const updatedPost = this.posts.filter((post) => post.id !== postId);
      this.posts = updatedPost;
      this.postUpdated.next([...this.posts]);
    });
  }
}
