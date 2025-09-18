import React, { useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Refresh as RefreshIcon,
  Psychology as AIIcon,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { fetchFeaturedProducts } from '../../store/slices/productSlice'

const AIRecommendations = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { featuredProducts, loading } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
  }, [dispatch])

  const handleRefresh = () => {
    dispatch(fetchFeaturedProducts())
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  // Mock AI recommendations based on user behavior
  const getRecommendationReason = (product, index) => {
    const reasons = [
      "Based on your browsing history",
      "Trending in your area",
      "Similar to your favorites",
      "Popular this week",
      "Perfect match for you",
      "Editor's choice",
    ]
    return reasons[index % reasons.length]
  }

  if (loading || featuredProducts.length === 0) {
    return null
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AIIcon color="primary" />
          <Typography variant="h5" component="h2" fontWeight="bold">
            AI Recommendations
          </Typography>
          <Chip
            label="Powered by AI"
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>
        
        <Tooltip title="Refresh recommendations">
          <IconButton onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={2}>
        {featuredProducts.slice(0, 6).map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                }}
                onClick={() => handleProductClick(product._id)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.images[0]}
                  alt={product.name}
                  sx={{
                    objectFit: 'cover',
                    filter: 'brightness(0.8)',
                  }}
                />
                
                <CardContent
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    color: 'white',
                  }}
                >
                  <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                    {product.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      ₹{product.price.toLocaleString('en-IN')}
                    </Typography>
                    <Chip
                      label={product.category}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                  </Box>

                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    {getRecommendationReason(product, index)}
                  </Typography>
                </CardContent>

                {/* AI Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: 1,
                    padding: '4px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <AIIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption" fontWeight="bold">
                    AI
                  </Typography>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {user && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Recommendations personalized for {user.username}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default AIRecommendations
