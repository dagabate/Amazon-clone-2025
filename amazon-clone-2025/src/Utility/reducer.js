import { Type } from "./action.type";
export const initialState = {
  basket: [],
};
export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        // If the item already exists, we can choose to update it or ignore the action
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        }; // or you could update the quantity or other properties
      } else {
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 } // Increment the amount if it exists
            : item
        );
        return {
          ...state,
          basket: updatedBasket,
        };
      }
    default:
      return state;
  }
};
