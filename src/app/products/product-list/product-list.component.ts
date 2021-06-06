import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

/* NgRx */
import { Store } from '@ngrx/store';
import { getCurrentProduct, getError, getProducts, getShowProductCode, ProductState } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage$: Observable<string>;

  displayCode$: Observable<boolean>;

  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product | null>;
  sub: Subscription;

  products$: Observable<Product[]>;

  constructor(private store: Store<ProductState>) { }

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError)
    this.selectedProduct$= this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
    
    this.store.dispatch(ProductActions.loadProducts());
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({currentProductId: product.id}));
  }
}
