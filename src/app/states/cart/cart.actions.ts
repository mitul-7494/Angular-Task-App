import {createAction, props} from "@ngrx/store";
import { CartItem } from "./cart.reducer";

export const getCartTotal = createAction('[Cart Component] getCartTotal')
export const remove = createAction('[Cart Component] remove')
export const increase = createAction('[Cart Component] increase')
export const decrease = createAction('[Cart Component] decrease')
export const clearCart = createAction('[Cart Component] clearCart')
export const addToCart = createAction('[Cart Component] addToCart')
export const setCartItems = createAction('[Cart Component] setCartItems', props<{ cartItems: CartItem[] }>())