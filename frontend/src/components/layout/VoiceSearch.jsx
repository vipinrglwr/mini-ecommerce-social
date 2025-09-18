import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  LinearProgress,
  IconButton,
} from '@mui/material'
import { Close as CloseIcon, Mic as MicIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'

import { setVoiceSearchActive, setSearchQuery } from '../../store/slices/uiSlice'
import { fetchProducts } from '../../store/slices/productSlice'

const VoiceSearch = () => {
  const dispatch = useDispatch()
  const { voiceSearchActive } = useSelector((state) => state.ui)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    setIsSupported(!!SpeechRecognition)
  }, [])

  const startListening = () => {
    if (!isSupported) return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const current = event.resultIndex
      const transcript = event.results[current][0].transcript
      setTranscript(transcript)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognition.start()
  }

  const handleSearch = () => {
    if (transcript.trim()) {
      dispatch(setSearchQuery(transcript))
      dispatch(fetchProducts({ search: transcript }))
      handleClose()
    }
  }

  const handleClose = () => {
    dispatch(setVoiceSearchActive(false))
    setTranscript('')
    setIsListening(false)
  }

  return (
    <Dialog
      open={voiceSearchActive}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Voice Search</Typography>
        <IconButton onClick={handleClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ textAlign: 'center', py: 4 }}>
        {!isSupported ? (
          <Typography color="error">
            Voice search is not supported in your browser
          </Typography>
        ) : (
          <>
            <motion.div
              animate={{ scale: isListening ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <IconButton
                onClick={startListening}
                disabled={isListening}
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: isListening ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  },
                }}
              >
                <MicIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </motion.div>

            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              {isListening ? 'Listening...' : 'Click to start speaking'}
            </Typography>

            {isListening && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="wave"
                      style={{
                        width: 4,
                        height: 20,
                        backgroundColor: 'white',
                        borderRadius: 2,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {transcript && (
              <Box sx={{ mt: 3, p: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                <Typography variant="body1">
                  "{transcript}"
                </Typography>
              </Box>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          onClick={handleSearch}
          variant="contained"
          disabled={!transcript.trim()}
          sx={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.3)',
            },
            '&:disabled': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          Search
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default VoiceSearch
