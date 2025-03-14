import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit = 100, skip = 0, search = '', category = '' }) => {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    if (category) {
      url = `https://dummyjson.com/products/category/${category}`;
    } else if (search) {
      url = `https://dummyjson.com/products/search?q=${search}`;
    }
    const response = await axios.get(url);
    return response.data;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await axios.get('https://dummyjson.com/products/categories');
    return response.data;
  }
);

const initialState = {
  items: [],
  categories: [],
  total: 0,
  selectedProduct: null,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.total = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.skip > 0) {
          state.items = [...state.items, ...action.payload.products];
        } else {
          state.items = action.payload.products;
        }
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;