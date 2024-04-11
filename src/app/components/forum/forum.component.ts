import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../shared/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  newComment: string = '';
  comments: any[] = [];
  userCommentCount: number = 0; // Track user's comment count

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    this.forumService.getComments().subscribe((data: any[]) => {
      this.comments = data;
    });
  }

  async submitComment() {
    try {
      if (this.userCommentCount < 2) {
        await this.forumService.addComment(this.newComment);
        this.userCommentCount++; 
        this.fetchComments();
        this.newComment = '';
      } else {
        alert('You have reached the maximum limit of comments.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }
}
