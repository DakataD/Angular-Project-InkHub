import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  userEmail: string | null = null;
  isLoggedIn = false;

  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
        this.isLoggedIn = true;
      } else {
        this.userEmail = null;
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('user');
        localStorage.removeItem('currentUser');
        confirm('Are you sure you want to logout?');
        this.router.navigate(['/']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
   
}
