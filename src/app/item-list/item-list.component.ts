import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Item {
  itemName: string;
  itemPrice: number;
  itemBarcode: string;
  url: string;
  imageUrl: string; 
}

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    const apiUrl = 'https://db.ezobooks.in/kappa/image/task';
    this.http.get<any>(apiUrl).subscribe(response => {
      if (response && response.status === 'success' && response.items) {
        this.items = response.items.map((item: any) => ({
          ...item,
          imageUrl: `https://db.ezobooks.in/kappa/image/get/${item.itemBarcode}/${item.url}`
        }));
      }
    });
  }
}
