/* NgRx */
import { createReducer, on, createAction, createSelector, createFeatureSelector } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';

interface State extends AppState.State {
  products: ProductState
}

interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

const productReducer = createReducer(
  initialState,
  on(createAction('[Product] Toggle Product Code'), (state) : ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  })
);

export {
  State, 
  productReducer,
  ProductState,
  getShowProductCode,
  getCurrentProduct,
  getProducts
}