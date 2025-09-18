import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/products'

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { params })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products')
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product')
    }
  }
)

export const likeProduct = createAsyncThunk(
  'products/likeProduct',
  async (productId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token
      const response = await axios.post(
        `${API_URL}/${productId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      return { productId, ...response.data }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to like product')
    }
  }
)

export const shareProduct = createAsyncThunk(
  'products/shareProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/${productId}/share`)
      return { productId, ...response.data }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to share product')
    }
  }
)

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/featured`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured products')
    }
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/categories`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories')
    }
  }
)

const initialState = {
  products: [],
  featuredProducts: [],
  categories: [],
  currentProduct: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0,
  },
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Like product
      .addCase(likeProduct.fulfilled, (state, action) => {
        const { productId, isLiked, likesCount } = action.payload
        const product = state.products.find(p => p._id === productId)
        if (product) {
          product.isLiked = isLiked
          product.likesCount = likesCount
        }
        if (state.currentProduct && state.currentProduct._id === productId) {
          state.currentProduct.isLiked = isLiked
          state.currentProduct.likesCount = likesCount
        }
      })
      // Share product
      .addCase(shareProduct.fulfilled, (state, action) => {
        const { productId, sharesCount } = action.payload
        const product = state.products.find(p => p._id === productId)
        if (product) {
          product.sharesCount = sharesCount
        }
        if (state.currentProduct && state.currentProduct._id === productId) {
          state.currentProduct.sharesCount = sharesCount
        }
      })
      // Fetch featured products
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload
      })
      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

export const {
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  setSortOrder,
  clearCurrentProduct,
  clearError,
} = productSlice.actions

export default productSlice.reducer
