import React, { useState } from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
  Badge,
  Tooltip,
} from '@mui/material'
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Comment as CommentIcon,
  ShoppingCart as CartIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import { likeProduct, shareProduct } from '../../store/slices/productSlice'
import { addToCart } from '../../store/slices/cartSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async (e) => {
    e.stopPropagation()
    
    if (!isAuthenticated) {
      toast.error('Please login to like products')
      return
    }

    if (isLiking) return

    setIsLiking(true)
    try {
      await dispatch(likeProduct(product._id)).unwrap()
    } catch (error) {
      toast.error(error || 'Failed to like product')
    } finally {
      setIsLiking(false)
    }
  }

  const handleShare = async (e) => {
    e.stopPropagation()
    
    try {
      await dispatch(shareProduct(product._id)).unwrap()
      
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.origin + `/product/${product._id}`,
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${window.location.origin}/product/${product._id}`
        )
        toast.success('Product link copied to clipboard!')
      }
    } catch (error) {
      toast.error(error || 'Failed to share product')
    }
  }

  const handleAddToCart = async (e) => {
    e.stopPropagation()
    
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      return
    }

    try {
      await dispatch(addToCart({ productId: product._id, quantity: 1 })).unwrap()
      toast.success('Added to cart!')
    } catch (error) {
      toast.error(error || 'Failed to add to cart')
    }
  }

  const handleViewProduct = () => {
    navigate(`/product/${product._id}`)
  }

  const isLiked = product.likes?.some(like => 
    typeof like === 'object' ? like._id : like === product._id
  )

  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={handleViewProduct}
      >
        {/* Product Image */}
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="250"
            image={product.images[0] || 'https://via.placeholder.com/500x500/6366f1/ffffff?text=No+Image'}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.log('Image failed to load:', e.target.src);
              e.target.src = 'https://via.placeholder.com/500x500/6366f1/ffffff?text=Image+Not+Found';
              setImageLoaded(true);
            }}
            sx={{
              transition: 'transform 0.3s ease-in-out',
              backgroundColor: '#f5f5f5',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          
          {/* Loading overlay */}
          {!imageLoaded && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.1)',
              }}
            >
              <Box className="pulse">Loading...</Box>
            </Box>
          )}

          {/* Category chip */}
          <Chip
            label={product.category}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              fontWeight: 'bold',
            }}
          />

          {/* Stock status */}
          {!product.inStock && (
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(255,0,0,0.8)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: 1,
                fontSize: '0.75rem',
                fontWeight: 'bold',
              }}
            >
              Out of Stock
            </Box>
          )}

          {/* Quick view button */}
          <Tooltip title="Quick view">
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                },
              }}
              className="zoom"
              onClick={(e) => {
                e.stopPropagation()
                handleViewProduct()
              }}
            >
              <ViewIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              ₹{product.price.toLocaleString('en-IN')}
            </Typography>
            {product.brand && (
              <Typography variant="caption" color="text.secondary">
                {product.brand}
              </Typography>
            )}
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {/* Like button */}
            <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
              <IconButton
                size="small"
                onClick={handleLike}
                disabled={isLiking}
                sx={{
                  color: isLiked ? 'error.main' : 'text.secondary',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'error.main',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <motion.div
                  animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <FavoriteIcon />
                </motion.div>
              </IconButton>
            </Tooltip>

            {/* Share button */}
            <Tooltip title="Share">
              <IconButton
                size="small"
                onClick={handleShare}
                sx={{
                  color: 'text.secondary',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>

            {/* Comments button */}
            <Tooltip title="Comments">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation()
                  handleViewProduct()
                }}
                sx={{
                  color: 'text.secondary',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Badge badgeContent={product.commentsCount} color="primary" max={99}>
                  <CommentIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>

          {/* Add to cart button */}
          <Tooltip title="Add to cart">
            <IconButton
              color="primary"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '&:disabled': {
                  backgroundColor: 'grey.300',
                  color: 'grey.500',
                },
              }}
            >
              <CartIcon />
            </IconButton>
          </Tooltip>
        </CardActions>

        {/* Social stats */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Chip
            label={`${product.likesCount} likes`}
            size="small"
            sx={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              fontSize: '0.7rem',
            }}
          />
          <Chip
            label={`${product.sharesCount} shares`}
            size="small"
            sx={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              fontSize: '0.7rem',
            }}
          />
        </Box>
      </Card>
    </motion.div>
  )
}

export default ProductCard
