import { Type } from "./action.type";
export const initialState = {
  basket: [],
  user: null,
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
    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex(
        (item) => item.id === action.item.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
      }
      return {
        ...state,
        basket: newBasket,
      };
    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };
    default:
      return state;
  }
};
