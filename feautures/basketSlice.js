import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {

      state.items = [...state.items, action.payload];
      //here we want to keep the existing state or array and add what the payload is to our basket
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action
      .payload.id);
//here we finf the index of the dish we want remove by search all the items and match
//the id we want to update, we passed the id as an arg on the Dishrow screen when calling
//this fuction
      let newBasket = [...state.items];
      //this keeps the cuurent state or array of items in it
      //if you get -1 then nothing was found
      if(index >= 0 ) {
          newBasket.splice(index, 1);
          //return the index and payload is one item to be removed
      } else {
          console.warn(`Cant remove product (id: ${action.payload.id}) as its not in basket!`);
      }
      state.items = newBasket;
      //here we update the global state with changes made
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems =  (state) => state.basket.items;
//access the gloabal state in the basket slice

export const selectBasketItemWithId = (state, id) => 
state.basket.items.filter((item) => item.id === id);
//here we want to know the specific row we adding item in, each dish has a unique id, our basket to so we recieve the id 
//and match it with by filtering the whole basket


export const selectBasketTotal = (state) => 
state.basket.items.reduce((total, item) => (total += item.price), 0);
//we are going through the basket of items array and reduce it to ine number, everytime we loop through we have an accumelator called total which adds each loop of price
//starting point is 0

export default basketSlice.reducer;