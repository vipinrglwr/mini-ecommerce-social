import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  TextField,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  Badge,
  Tooltip,
} from '@mui/material'
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Comment as CommentIcon,
  ShoppingCart as CartIcon,
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
  ThumbUp as ThumbUpIcon,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import { fetchProductById, likeProduct, shareProduct } from '../store/slices/productSlice'
import { addToCart } from '../store/slices/cartSlice'
import CommentsSection from '../components/products/CommentsSection'

const ProductDetailPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { currentProduct, loading, error } = useSelector((state) => state.products)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [isLiking, setIsLiking] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
  }, [dispatch, id])

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to like products')
      return
    }

    if (isLiking) return

    setIsLiking(true)
    try {
      await dispatch(likeProduct(id)).unwrap()
    } catch (error) {
      toast.error(error || 'Failed to like product')
    } finally {
      setIsLiking(false)
    }
  }

  const handleShare = async () => {
    try {
      await dispatch(shareProduct(id)).unwrap()
      
      if (navigator.share) {
        await navigator.share({
          title: currentProduct.name,
          text: currentProduct.description,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Product link copied to clipboard!')
      }
    } catch (error) {
      toast.error(error || 'Failed to share product')
    }
  }

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      return
    }

    try {
      await dispatch(addToCart({ productId: id, quantity: 1 })).unwrap()
      toast.success('Added to cart!')
    } catch (error) {
      toast.error(error || 'Failed to add to cart')
    }
  }

  const handleAddComment = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add comments')
      return
    }

    if (!commentText.trim()) {
      toast.error('Please enter a comment')
      return
    }

    // This would be implemented with the comments API
    toast.success('Comment added!')
    setCommentText('')
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading product...
        </Typography>
      </Container>
    )
  }

  if (error || !currentProduct) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Product not found'}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          variant="outlined"
        >
          Back to Home
        </Button>
      </Container>
    )
  }

  const isLiked = currentProduct.likes?.some(like => 
    typeof like === 'object' ? like._id === user?.id : like === user?.id
  )

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          variant="outlined"
          sx={{ mb: 3 }}
        >
          Back to Products
        </Button>
      </motion.div>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                height="500"
                image={currentProduct.images[selectedImage]}
                alt={currentProduct.name}
                sx={{
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  // Open image in full screen or modal
                  window.open(currentProduct.images[selectedImage], '_blank')
                }}
              />
            </Card>

            {/* Thumbnail images */}
            {currentProduct.images.length > 1 && (
              <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', py: 1 }}>
                {currentProduct.images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CardMedia
                      component="img"
                      height="80"
                      image={image}
                      alt={`${currentProduct.name} ${index + 1}`}
                      sx={{
                        width: 80,
                        cursor: 'pointer',
                        borderRadius: 1,
                        border: selectedImage === index ? 2 : 0,
                        borderColor: 'primary.main',
                      }}
                      onClick={() => setSelectedImage(index)}
                    />
                  </motion.div>
                ))}
              </Box>
            )}
          </motion.div>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card sx={{ p: 3, height: 'fit-content' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Chip
                  label={currentProduct.category}
                  color="primary"
                  variant="outlined"
                />
                {currentProduct.brand && (
                  <Chip
                    label={currentProduct.brand}
                    variant="outlined"
                  />
                )}
                {currentProduct.featured && (
                  <Chip
                    label="Featured"
                    color="secondary"
                    size="small"
                  />
                )}
              </Box>

              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                {currentProduct.name}
              </Typography>

              <Typography variant="h3" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
                ₹{currentProduct.price.toLocaleString('en-IN')}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                {currentProduct.description}
              </Typography>

              {/* Stock status */}
              <Box sx={{ mb: 3 }}>
                {currentProduct.inStock ? (
                  <Chip
                    label={`In Stock (${currentProduct.stockQuantity} available)`}
                    color="success"
                    variant="outlined"
                  />
                ) : (
                  <Chip
                    label="Out of Stock"
                    color="error"
                    variant="outlined"
                  />
                )}
              </Box>

              {/* Social actions */}
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
                  <IconButton
                    onClick={handleLike}
                    disabled={isLiking}
                    sx={{
                      color: isLiked ? 'error.main' : 'text.secondary',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <motion.div
                      animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Badge badgeContent={currentProduct.likesCount} color="primary">
                        <FavoriteIcon />
                      </Badge>
                    </motion.div>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Share">
                  <IconButton
                    onClick={handleShare}
                    sx={{ color: 'text.secondary' }}
                  >
                    <Badge badgeContent={currentProduct.sharesCount} color="primary">
                      <ShareIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Comments">
                  <IconButton sx={{ color: 'text.secondary' }}>
                    <Badge badgeContent={currentProduct.commentsCount} color="primary">
                      <CommentIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Add to cart button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<CartIcon />}
                  onClick={handleAddToCart}
                  disabled={!currentProduct.inStock}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    mb: 3,
                  }}
                >
                  {currentProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </motion.div>

              {/* Tags */}
              {currentProduct.tags && currentProduct.tags.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Tags:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {currentProduct.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Comments Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CommentsSection productId={id} />
      </motion.div>
    </Container>
  )
}

export default ProductDetailPage
