import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Item } from '../../model/item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  item: Item = { id: '', title: '', style: '', studio: '', story: '', photo: '', author: '' };
  errorMessage: string = '';
  isDataLoaded: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      const state = history.state;
      if (state && state['item']) {
        this.item = state['item'];
        this.isDataLoaded = true;
      } else {
        this.errorMessage = 'Item data is not available';
      }
    } else {
      this.errorMessage = 'Item ID is not provided';
    }
  }

  save(): void {
    if (this.isDataValid()) { 
      console.log('Item to be saved:', this.item);
      this.dataService.updateItem(this.item)
        .then(() => {
          console.log('Item updated successfully');
          this.router.navigate(['/catalog']);
        })
        .catch(error => {
          console.error('Error updating item:', error);
          this.errorMessage = 'Error updating item';
        });
    }
  }
  

  isDataValid(): boolean {
    if (!this.item.title.trim()) {
      this.errorMessage = 'Title is required';
      return false;
    }
    if (!this.item.style.trim()) {
      this.errorMessage = 'Style is required';
      return false;
    }
    if (!this.item.studio.trim()) {
      this.errorMessage = 'Studio is required';
      return false;
    }
    if (!this.item.story.trim()) {
      this.errorMessage = 'Story is required';
      return false;
    }
    if (!this.item.photo.trim()) {
      this.errorMessage = 'Photo is required';
      return false;
    }
    if (!this.item.author.trim()) {
      this.errorMessage = 'Author is required';
      return false;
    }
    return true;
  }
  
  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.item.photo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}