import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Item } from '../model/item';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  item: Item | undefined;
  isOwner: boolean = false;
  itemBought: boolean = false;
  currentUser: string = '';
  itemId: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private authService: AuthService
  ) { 
    const user = this.authService.getCurrentUser();
    this.currentUser = user !== null ? user : '';
  }

  ngOnInit(): void {
    this.getItemDetails();
    this.checkItemBought();
  }

  getItemDetails(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) { 
      this.dataService.getItemById(this.itemId) 
        .subscribe(item => {
          this.item = item;
          console.log('Retrieved item:', this.item);
          
          // Check if current user is the author of the item
          this.isOwner = this.currentUser === this.item?.author;
        });
    }
  }

  editItem(): void {
    if (this.item) {
      this.router.navigate(['/edit', this.item.id], { state: { item: this.item } });
    } else {
      console.error('Item data is not available');
    }
  }

  deleteItem(): void {
    if (this.itemId) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.dataService.deleteItem(this.itemId)
          .then(() => {
            console.log('Item deleted successfully');
            this.router.navigate(['/catalog']);
          })
          .catch(error => {
            console.error('Error deleting item:', error);
          });
      }
    } else {
      console.error('Item ID is not provided');
    }
  }

  buyItem(): void {
    this.itemBought = true;
    localStorage.setItem(`item_${this.itemId}_bought`, 'true');
  }

  checkItemBought(): void {
    const itemBought = localStorage.getItem(`item_${this.itemId}_bought`);
    this.itemBought = itemBought === 'true';
  }

  isAuthor(): boolean {
    return this.currentUser === this.item?.author;
  }


  showFullScreenImage(): void {
    if (this.item) {
      window.open(this.item.photo, '_blank');
    }
  }

  
}

