import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { ProductState } from "./product.reducer";

interface State extends AppState.State {
    products: ProductState
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if( currentProductId === 0 ) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;  
    }
  }
);

const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export {
    State, 
    getShowProductCode,
    getCurrentProductId,
    getCurrentProduct,
    getProducts,
    getError,
  }