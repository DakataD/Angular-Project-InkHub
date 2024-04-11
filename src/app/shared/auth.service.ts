import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }


  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('user', 'true');
      this.router.navigate(['/']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
    localStorage.setItem('currentUser', email);
  }


  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        // After successfully creating the user, set user state
        localStorage.setItem('user', 'true');
        localStorage.setItem('currentUser', email);
        // Navigate or do any other necessary actions here
        this.router.navigate(['/']);
      })
      .catch(err => {
        alert(err.message);
        this.router.navigate(['/register']);
      });
  }
  
  
  getCurrentUser(): string | null {
    return localStorage.getItem('currentUser');
  }
  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !!user; 
  }
}
