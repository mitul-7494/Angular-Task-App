import { Action, createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';

export interface CartState {
    items: CartItem[]; // Define your cart item interface
    totalAmount: number;
    totalCount: number;
}

export interface CartItem {
    _id?: string; // Optional id present if item came from database
    username: string;
    title: string;
    price: number;
    id: number;
    quantity: number;
    thumbnail: string;
    __v?: number; // same as _id
}

export const initialCartState: CartState = {
    items : [],
    totalAmount: 0,
    totalCount: 0
}

export const cartReducer = createReducer(
    initialCartState,
    on(CartActions.getCartTotal, (state) => {
        const { totalAmount, totalCount } = state.items.reduce(
          (cartTotal, cartItem) => ({
            totalAmount: cartTotal.totalAmount + (cartItem.price * cartItem.quantity),
            totalCount: cartTotal.totalCount + cartItem.quantity,
          }),
          { totalAmount: 0, totalCount: 0 }
        );
    
        return {
          ...state,
          totalAmount,
          totalCount,
        };
      }),
      on(CartActions.remove, (state, action) => ({
        ...state,
        items: state.items.filter((item) => item._id !== action._id),
      })),
      on(CartActions.increase, (state, action) => ({
        ...state,
        items: state.items.map((item) =>
          item._id === action.item.id && item.quantity < 10 ? { ...item, quantity: item.quantity + 1 } : item
        ),
      })),
      on(CartActions.decrease, (state, action) => ({
        ...state,
        items: state.items
          .map((item) => (item._id === action.item.id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item))
          .filter((item) => item.quantity !== 0),
      })),
      on(CartActions.clearCart, () => initialState),
      on(CartActions.addToCart, (state, action) => {
        const existingItem = state.items.find((item) => item._id === action.item._id);
        return {
          ...state,
          items: existingItem
            ? state.items.map((item) =>
              item._id === action.item._id ? { ...item, quantity: item.quantity + action.item.quantity } : item
            )
            : [...state.items, action.item],
        };
      }),
      on(CartActions.setCartItems, (state, action) => ({
        ...state,
        items: action.cartItems,
        totalAmount: action.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
        totalCount: action.cartItems.reduce((acc, item) => acc + item.quantity, 0),
      })),
)