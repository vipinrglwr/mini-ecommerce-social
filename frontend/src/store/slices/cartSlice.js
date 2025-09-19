import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiService } from '../../services/apiService'

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await apiService.cart.get()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart')
    }
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1 }, { rejectWithValue, getState }) => {
    try {
      const response = await apiService.cart.add(productId, quantity)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart')
    }
  }
)

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }, { rejectWithValue, getState }) => {
    try {
      const response = await apiService.cart.update(productId, quantity)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart item')
    }
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue, getState }) => {
    try {
      const response = await apiService.cart.remove(productId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart')
    }
  }
)

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await apiService.cart.clear()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear cart')
    }
  }
)

const initialState = {
  items: [],
  loading: false,
  error: null,
  totalItems: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    calculateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce(
        (total, item) => total + (item.product.price * item.quantity),
        0
      )
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.totalItems = action.payload.reduce((total, item) => total + item.quantity, 0)
        state.totalPrice = action.payload.reduce(
          (total, item) => total + (item.product.price * item.quantity),
          0
        )
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.cart
        state.totalItems = action.payload.cart.reduce((total, item) => total + item.quantity, 0)
        state.totalPrice = action.payload.cart.reduce(
          (total, item) => total + (item.product.price * item.quantity),
          0
        )
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update cart item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.cart
        state.totalItems = action.payload.cart.reduce((total, item) => total + item.quantity, 0)
        state.totalPrice = action.payload.cart.reduce(
          (total, item) => total + (item.product.price * item.quantity),
          0
        )
      })
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.cart
        state.totalItems = action.payload.cart.reduce((total, item) => total + item.quantity, 0)
        state.totalPrice = action.payload.cart.reduce(
          (total, item) => total + (item.product.price * item.quantity),
          0
        )
      })
      // Clear cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = []
        state.totalItems = 0
        state.totalPrice = 0
      })
  },
})

export const { clearError, calculateTotals } = cartSlice.actions
export default cartSlice.reducer
