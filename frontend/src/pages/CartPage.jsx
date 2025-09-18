import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  IconButton,
  TextField,
  Divider,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  Paper,
} from '@mui/material'
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
  ArrowBack as ArrowBackIcon,
  Payment as CheckoutIcon,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../store/slices/cartSlice'
import CheckoutModal from '../components/cart/CheckoutModal'

const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, loading, error, totalItems, totalPrice } = useSelector((state) => state.cart)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId)
      return
    }

    try {
      await dispatch(updateCartItem({ productId, quantity: newQuantity })).unwrap()
      toast.success('Cart updated!')
    } catch (error) {
      toast.error(error || 'Failed to update cart')
    }
  }

  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(removeFromCart(productId)).unwrap()
      toast.success('Item removed from cart!')
    } catch (error) {
      toast.error(error || 'Failed to remove item')
    }
  }

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await dispatch(clearCart()).unwrap()
        toast.success('Cart cleared!')
      } catch (error) {
        toast.error(error || 'Failed to clear cart')
      }
    }
  }

  const handleCheckout = () => {
    setCheckoutOpen(true)
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your cart...
        </Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          variant="outlined"
        >
          Back to Shopping
        </Button>
      </Container>
    )
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 8,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: 3,
            }}
          >
            <CartIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Looks like you haven't added any items to your cart yet.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/')}
              sx={{ px: 4, py: 1.5 }}
            >
              Start Shopping
            </Button>
          </Paper>
        </motion.div>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              variant="outlined"
            >
              Continue Shopping
            </Button>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Shopping Cart
            </Typography>
            <Chip
              label={`${totalItems} item${totalItems !== 1 ? 's' : ''}`}
              color="primary"
              variant="outlined"
            />
          </Box>
          
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        </Box>
      </motion.div>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {items.map((item, index) => (
                <motion.div
                  key={item.product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent>
                      <Grid container spacing={3} alignItems="center">
                        {/* Product Image */}
                        <Grid item xs={12} sm={3}>
                          <Box
                            component="img"
                            src={item.product.images[0]}
                            alt={item.product.name}
                            sx={{
                              width: '100%',
                              height: 120,
                              objectFit: 'cover',
                              borderRadius: 1,
                            }}
                          />
                        </Grid>

                        {/* Product Info */}
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {item.product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {item.product.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <Chip
                              label={item.product.category}
                              size="small"
                              variant="outlined"
                            />
                            {item.product.brand && (
                              <Chip
                                label={item.product.brand}
                                size="small"
                                variant="outlined"
                              />
                            )}
                          </Box>
                            <Typography variant="h6" color="primary" fontWeight="bold">
                              ₹{item.product.price.toLocaleString('en-IN')}
                            </Typography>
                        </Grid>

                        {/* Quantity Controls */}
                        <Grid item xs={12} sm={3}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <RemoveIcon />
                            </IconButton>
                            
                            <TextField
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value) || 1
                                handleQuantityChange(item.product._id, newQuantity)
                              }}
                              size="small"
                              sx={{ width: 60 }}
                              inputProps={{ 
                                min: 1,
                                style: { textAlign: 'center' }
                              }}
                            />
                            
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h6" fontWeight="bold">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </Typography>
                            
                            <IconButton
                              color="error"
                              onClick={() => handleRemoveItem(item.product._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ position: 'sticky', top: 20 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Order Summary
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    Subtotal ({totalItems} items)
                  </Typography>
                  <Typography variant="body2">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    Shipping
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    Free
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    Tax
                  </Typography>
                  <Typography variant="body2">
                    ₹{(totalPrice * 0.08).toLocaleString('en-IN')}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    ₹{(totalPrice * 1.08).toLocaleString('en-IN')}
                  </Typography>
                </Box>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<CheckoutIcon />}
                    onClick={handleCheckout}
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </motion.div>

                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
                  Secure checkout with SSL encryption
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Checkout Modal */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        totalPrice={totalPrice * 1.08}
        items={items}
      />
    </Container>
  )
}

export default CartPage
