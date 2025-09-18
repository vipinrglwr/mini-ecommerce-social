import React, { useState } from 'react'
import { Box, Typography, Card, CardMedia, Button } from '@mui/material'

const ImageTest = () => {
  const [imageStatus, setImageStatus] = useState({})

  const testImages = [
    "https://picsum.photos/500/500?random=10",
    "https://picsum.photos/500/500?random=11", 
    "https://picsum.photos/500/500?random=12",
    "https://picsum.photos/500/500?random=13"
  ]

  const handleImageLoad = (index) => {
    setImageStatus(prev => ({ ...prev, [index]: 'loaded' }))
  }

  const handleImageError = (index) => {
    setImageStatus(prev => ({ ...prev, [index]: 'error' }))
  }

  const testImage = (url) => {
    const img = new Image()
    img.onload = () => console.log('Image loaded successfully:', url)
    img.onerror = () => console.log('Image failed to load:', url)
    img.src = url
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Image Test for Smart Home Speaker
      </Typography>
      
      <Button 
        onClick={() => testImages.forEach(testImage)}
        variant="contained"
        sx={{ mb: 3 }}
      >
        Test All Images in Console
      </Button>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
        {testImages.map((imageUrl, index) => (
          <Card key={index} sx={{ maxWidth: 200 }}>
            <CardMedia
              component="img"
              height="200"
              image={imageUrl}
              alt={`Test Image ${index + 1}`}
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
            />
            <Box sx={{ p: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Image {index + 1}
              </Typography>
              <Typography 
                variant="body2" 
                color={imageStatus[index] === 'loaded' ? 'success.main' : 
                       imageStatus[index] === 'error' ? 'error.main' : 'text.secondary'}
              >
                {imageStatus[index] === 'loaded' ? '✅ Loaded' : 
                 imageStatus[index] === 'error' ? '❌ Error' : '⏳ Loading...'}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default ImageTest
