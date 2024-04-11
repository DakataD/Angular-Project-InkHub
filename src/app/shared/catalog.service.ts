import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private readonly catalogsCollection: AngularFirestoreCollection<Item>;

  constructor(private firestore: AngularFirestore) {
    this.catalogsCollection = firestore.collection<Item>('catalogs');
  }

  getAllCatalogs(): Observable<Item[]> {
    return this.catalogsCollection.valueChanges({ idField: 'id' });
  }

  getCatalogById(id: string) {
    return this.firestore.collection('catalogs').doc(id).valueChanges({ idField: 'id' });
  }

  addCatalog(catalog: Item): Promise<void> {
    const id = this.firestore.createId();
    return this.catalogsCollection.doc(id).set({ ...catalog, id });
  }

  updateCatalog(id: string, catalog: Item): Promise<void> {
    return this.catalogsCollection.doc(id).update(catalog);
  }

  deleteCatalog(id: string): Promise<void> {
    return this.catalogsCollection.doc(id).delete();
  }
}
