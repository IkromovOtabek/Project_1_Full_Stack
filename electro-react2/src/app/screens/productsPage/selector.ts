import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";


const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveRestaurant = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.restaurant
);

export const retrieveChosenProduct = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.chosenProduct
);

export const retrieveProducts = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.products
);

// STEP 3 develop file for connect frontend to backend