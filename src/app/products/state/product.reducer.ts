/* NgRx */
import { createReducer, on, createAction, createSelector, createFeatureSelector } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.actions';
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
  on(ProductActions.toggleProductCode, (state) : ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: action.product
    };
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: null
    };
  }),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
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