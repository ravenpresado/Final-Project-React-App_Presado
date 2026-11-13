
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [
    { name: 'Auditorium Hall', capacity: 200, price: 5500, quantity: 0 },
    { name: 'Conference Room', capacity: 15, price: 3500, quantity: 0 },
    { name: 'Presentation Room', capacity: 50, price: 700, quantity: 0 },
    { name: 'Large Meeting Room', capacity: 10, price: 900, quantity: 0 },
    { name: 'Small Meeting Room', capacity: 5, price: 1100, quantity: 0 },
  ],
  addOns: [
    { name: 'Speakers', price: 35, quantity: 0 },
    { name: 'Microphones', price: 45, quantity: 0 },
    { name: 'Whiteboards', price: 80, quantity: 0 },
    { name: 'Projectors', price: 200, quantity: 0 },
    { name: 'Signage', price: 80, quantity: 0 },
  ],
  meals: [
    { name: 'Breakfast', price: 50, people: 0 },
    { name: 'Lunch', price: 60, people: 0 },
    { name: 'High Tea', price: 25, people: 0 },
    { name: 'Dinner', price: 70, people: 0 },
  ],
};

const selectionsSlice = createSlice({
  name: 'selections',
  initialState,
  reducers: {
    incrementItem: (state, action) => {
      const { category, index } = action.payload;
      state[category][index].quantity += 1;
    },
    decrementItem: (state, action) => {
      const { category, index } = action.payload;
      if (state[category][index].quantity > 0) {
        state[category][index].quantity -= 1;
      }
    },
    updateMealPeople: (state, action) => {
      const { index, people } = action.payload;
      state.meals[index].people = Math.max(0, Number(people) || 0);
    },
  },
});

export const {
  incrementItem,
  decrementItem,
  updateMealPeople,
} = selectionsSlice.actions;

export default selectionsSlice.reducer;
