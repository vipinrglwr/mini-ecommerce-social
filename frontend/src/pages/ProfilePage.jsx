import React, { useState } from 'react'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  Button,
  Tabs,
  Tab,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
} from '@mui/material'
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as CartIcon,
  Settings as SettingsIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState(0)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: 'E-commerce enthusiast and social shopper',
  })

  // Mock data for user's liked products and order history
  const likedProducts = [
    {
      _id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
      category: 'electronics',
    },
    {
      _id: '2',
      name: 'Vintage Denim Jacket',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300',
      category: 'clothing',
    },
    {
      _id: '3',
      name: 'Smart Fitness Watch',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
      category: 'electronics',
    },
  ]

  const orderHistory = [
    {
      _id: '1',
      orderNumber: 'ORD-001',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'Delivered',
      total: 299.99,
      items: 2,
    },
    {
      _id: '2',
      orderNumber: 'ORD-002',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: 'Shipped',
      total: 189.99,
      items: 1,
    },
  ]

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleEditProfile = () => {
    setEditDialogOpen(true)
  }

  const handleSaveProfile = () => {
    // In real app, this would update the user profile via API
    setEditDialogOpen(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'success'
      case 'Shipped':
        return 'info'
      case 'Processing':
        return 'warning'
      default:
        return 'default'
    }
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={user?.profilePicture}
                  sx={{ width: 100, height: 100 }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                  size="small"
                >
                  <PhotoCameraIcon />
                </IconButton>
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                  {user?.username}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {profileData.bio}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    icon={<FavoriteIcon />}
                    label={`${likedProducts.length} Favorites`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<CartIcon />}
                    label={`${orderHistory.length} Orders`}
                    variant="outlined"
                  />
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab icon={<FavoriteIcon />} label="Favorites" />
              <Tab icon={<CartIcon />} label="Order History" />
              <Tab icon={<SettingsIcon />} label="Settings" />
            </Tabs>
          </Box>

          <CardContent>
            {/* Favorites Tab */}
            {activeTab === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Your Favorite Products
                </Typography>
                <Grid container spacing={3}>
                  {likedProducts.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card sx={{ height: '100%' }}>
                          <Box
                            component="img"
                            src={product.image}
                            alt={product.name}
                            sx={{
                              width: '100%',
                              height: 200,
                              objectFit: 'cover',
                            }}
                          />
                          <CardContent>
                            <Typography variant="h6" component="h3" gutterBottom>
                              {product.name}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="h6" color="primary" fontWeight="bold">
                                ₹{product.price.toLocaleString('en-IN')}
                              </Typography>
                              <Chip
                                label={product.category}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Order History Tab */}
            {activeTab === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Order History
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {orderHistory.map((order, index) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="h6" gutterBottom>
                                Order #{order.orderNumber}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {formatDate(order.date)} • {order.items} item(s)
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="h6" color="primary" fontWeight="bold">
                                ₹{order.total.toLocaleString('en-IN')}
                              </Typography>
                              <Chip
                                label={order.status}
                                color={getStatusColor(order.status)}
                                size="small"
                              />
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            )}

            {/* Settings Tab */}
            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Account Settings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                        Personal Information
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Manage your personal details and preferences
                      </Typography>
                      <Button variant="outlined" startIcon={<EditIcon />}>
                        Edit Personal Info
                      </Button>
                    </CardContent>
                  </Card>

                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                        Security
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Update your password and security settings
                      </Typography>
                      <Button variant="outlined">
                        Change Password
                      </Button>
                    </CardContent>
                  </Card>

                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                        Notifications
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Control how you receive notifications
                      </Typography>
                      <Button variant="outlined">
                        Notification Settings
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Edit Profile Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              fullWidth
              label="Username"
              value={profileData.username}
              onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
            <TextField
              fullWidth
              label="Bio"
              multiline
              rows={3}
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveProfile} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default ProfilePage
