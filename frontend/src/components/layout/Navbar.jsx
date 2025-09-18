import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  InputBase,
  alpha,
  useTheme,
} from '@mui/material'
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Mic as MicIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { logout } from '../../store/slices/authSlice'
import { toggleDarkMode, setSearchQuery, toggleVoiceSearch } from '../../store/slices/uiSlice'
import { fetchProducts } from '../../store/slices/productSlice'
import VoiceSearch from './VoiceSearch'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { darkMode, voiceSearchActive } = useSelector((state) => state.ui)
  const { totalItems } = useSelector((state) => state.cart)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(setSearchQuery(searchValue))
    dispatch(fetchProducts({ search: searchValue }))
    navigate('/')
  }

  const handleVoiceSearch = () => {
    dispatch(toggleVoiceSearch())
  }

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
    { text: 'Favorites', icon: <FavoriteIcon />, path: '/favorites' },
  ]

  return (
    <>
      <AppBar position="sticky" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {/* Mobile menu button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setSidebarOpen(true)}
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 0, 
              mr: 4,
              cursor: 'pointer',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            onClick={() => navigate('/')}
          >
            E-Social
          </Typography>

          {/* Search bar */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              position: 'relative',
              borderRadius: 1,
              backgroundColor: alpha(theme.palette.common.white, 0.15),
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
              },
              marginLeft: 0,
              width: '100%',
              maxWidth: 400,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Box
              sx={{
                padding: theme.spacing(0, 2),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              sx={{
                color: 'inherit',
                '& .MuiInputBase-input': {
                  padding: theme.spacing(1, 1, 1, 0),
                  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                  transition: theme.transitions.create('width'),
                  width: '100%',
                },
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Voice search button */}
          <IconButton
            color="inherit"
            onClick={handleVoiceSearch}
            sx={{ 
              mr: 1,
              backgroundColor: voiceSearchActive ? alpha(theme.palette.secondary.main, 0.2) : 'transparent',
            }}
          >
            <MicIcon />
          </IconButton>

          {/* Dark mode toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => dispatch(toggleDarkMode())}
                color="default"
              />
            }
            label={darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            sx={{ mr: 1 }}
          />

          {/* Cart button */}
          <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={totalItems} color="secondary">
              <CartIcon />
            </Badge>
          </IconButton>

          {/* User menu */}
          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {user?.username}
              </Typography>
              <IconButton
                color="inherit"
                onClick={() => navigate('/profile')}
              >
                <PersonIcon />
              </IconButton>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile sidebar */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  navigate(item.path)
                  setSidebarOpen(false)
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Voice Search Component */}
      {voiceSearchActive && <VoiceSearch />}
    </>
  )
}

export default Navbar
