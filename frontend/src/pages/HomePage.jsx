import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Box,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Fab,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { motion } from 'framer-motion'

import { fetchProducts, fetchCategories, setSelectedCategory, setSortBy, setSortOrder } from '../store/slices/productSlice'
import ProductCard from '../components/products/ProductCard'
import { setInfiniteScrollLoading } from '../store/slices/uiSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const {
    products,
    categories,
    loading,
    pagination,
    selectedCategory,
    sortBy,
    sortOrder,
  } = useSelector((state) => state.products)

  const { darkMode } = useSelector((state) => state.ui)

  useEffect(() => {
    // Fetch initial products and categories
    dispatch(fetchProducts({ page: 1, limit: 10 }))
    dispatch(fetchCategories())
  }, [dispatch])

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category))
    setPage(1)
    setHasMore(true)
    dispatch(fetchProducts({ 
      page: 1, 
      limit: 10, 
      category: category === 'all' ? undefined : category,
      sortBy,
      sortOrder,
    }))
  }

  const handleSortChange = (field) => {
    dispatch(setSortBy(field))
    setPage(1)
    setHasMore(true)
    dispatch(fetchProducts({ 
      page: 1, 
      limit: 10, 
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      sortBy: field,
      sortOrder,
    }))
  }

  const handleOrderChange = (order) => {
    dispatch(setSortOrder(order))
    setPage(1)
    setHasMore(true)
    dispatch(fetchProducts({ 
      page: 1, 
      limit: 10, 
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      sortBy,
      sortOrder: order,
    }))
  }

  const loadMoreProducts = () => {
    if (loading || !hasMore) return

    const nextPage = page + 1
    setPage(nextPage)
    dispatch(setInfiniteScrollLoading(true))
    
    dispatch(fetchProducts({ 
      page: nextPage, 
      limit: 10, 
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      sortBy,
      sortOrder,
    })).then((action) => {
      dispatch(setInfiniteScrollLoading(false))
      if (action.payload.products.length === 0) {
        setHasMore(false)
      }
    })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Discover Amazing Products
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Shop the latest trends and find your perfect match
          </Typography>
        </Box>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
          {/* Category filters */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip
              label="All"
              onClick={() => handleCategoryChange('all')}
              color={selectedCategory === 'all' ? 'primary' : 'default'}
              variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
            />
            {categories.map((category) => (
              <Chip
                key={category}
                label={category.charAt(0).toUpperCase() + category.slice(1)}
                onClick={() => handleCategoryChange(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
              />
            ))}
          </Box>

          {/* Sort controls */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                label="Sort by"
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <MenuItem value="createdAt">Newest</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="likesCount">Popularity</MenuItem>
                <MenuItem value="name">Name</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel>Order</InputLabel>
              <Select
                value={sortOrder}
                label="Order"
                onChange={(e) => handleOrderChange(e.target.value)}
              >
                <MenuItem value="desc">Descending</MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </motion.div>

      {/* Products Grid */}
      <InfiniteScroll
        dataLength={products.length}
        next={loadMoreProducts}
        hasMore={hasMore}
        loader={
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        }
        endMessage={
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              You've reached the end! 🎉
            </Typography>
          </Box>
        }
      >
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>


      {/* Scroll to top button */}
      <Fab
        color="primary"
        aria-label="scroll to top"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        ↑
      </Fab>
    </Container>
  )
}

export default HomePage
