import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { DataService } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'; 
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  newItem: Item = {
    id: '',
    title: '',
    style: '',
    studio: '',
    story: '',
    photo: '',
    author: ''
  };

  selectedFile: File | null = null;
  isUploading = false; // Flag to track if file is currently being uploaded

  constructor(private dataService: DataService, 
              private storage: AngularFireStorage,
              private authService: AuthService, // Inject AuthService
              private router: Router,
             ) { } // Inject Router service

  ngOnInit(): void {
               
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async addItem() {
    if (!this.newItem.title || !this.newItem.style || !this.newItem.studio || !this.newItem.story || !this.selectedFile) {
      alert('Please fill in all fields and select a file');
      return;
    }

    this.isUploading = true; 

    const filePath = `uploads/${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.selectedFile);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async (downloadURL: string) => {
          this.newItem.photo = downloadURL; 
          // Get current user's email from AuthService
          const currentUser = await this.authService.getCurrentUser();
          if (currentUser) {
            this.newItem.author = currentUser;
            this.saveItem(); 
          } else {
            console.error("Current user not found");
            this.isUploading = false;
          }
        });
      })
    ).subscribe();
  }

  async saveItem() {
    try {
      await this.dataService.addItem(this.newItem);
      alert('Item added successfully');
      this.clearForm();
      this.isUploading = false;
      this.router.navigate(['/catalog']);
    } catch (error) {
      console.error("Error adding item: ", error);
      this.isUploading = false;
    }
  }
  
  clearForm() {
    this.newItem = {
      id: '',
      title: '',
      style: '',
      studio: '',
      story: '',
      photo: '',
      author: ''
    };
    this.selectedFile = null;
  }
}
