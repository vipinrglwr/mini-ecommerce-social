import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true' || false,
  sidebarOpen: false,
  voiceSearchActive: false,
  searchQuery: '',
  selectedCategory: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  infiniteScrollLoading: false,
  showCartDrawer: false,
  showProductModal: false,
  selectedProduct: null,
  notifications: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', state.darkMode)
      // Update body class for global dark mode
      if (state.darkMode) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
      localStorage.setItem('darkMode', state.darkMode)
      if (state.darkMode) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    toggleVoiceSearch: (state) => {
      state.voiceSearchActive = !state.voiceSearchActive
    },
    setVoiceSearchActive: (state, action) => {
      state.voiceSearchActive = action.payload
    },
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
    setInfiniteScrollLoading: (state, action) => {
      state.infiniteScrollLoading = action.payload
    },
    toggleCartDrawer: (state) => {
      state.showCartDrawer = !state.showCartDrawer
    },
    setCartDrawerOpen: (state, action) => {
      state.showCartDrawer = action.payload
    },
    toggleProductModal: (state) => {
      state.showProductModal = !state.showProductModal
    },
    setProductModalOpen: (state, action) => {
      state.showProductModal = action.payload
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      })
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const {
  toggleDarkMode,
  setDarkMode,
  toggleSidebar,
  setSidebarOpen,
  toggleVoiceSearch,
  setVoiceSearchActive,
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  setSortOrder,
  setInfiniteScrollLoading,
  toggleCartDrawer,
  setCartDrawerOpen,
  toggleProductModal,
  setProductModalOpen,
  setSelectedProduct,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions

export default uiSlice.reducer
