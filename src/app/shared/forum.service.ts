import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private afs: AngularFirestore, private authService: AuthService) { }

  async addComment(newComment: string): Promise<void> {
    const currentUser = await this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not logged in or display name not available');
    }

    const commentData = {
      text: newComment,
      author: currentUser 
    };

    return new Promise<void>((resolve, reject) => {
      this.afs.collection('comments').add(commentData)
        .then(() => {
          resolve(); // Resolve the Promise if the comment is successfully added
        })
        .catch((error) => {
          reject(error); // Reject the Promise if there's an error
        });
    });
  }

  getComments(): Observable<any[]> {
    return this.afs.collection('comments').valueChanges();
  }

}
