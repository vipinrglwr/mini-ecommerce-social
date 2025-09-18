import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Grid,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  CreditCard as CreditCardIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import toast from 'react-hot-toast'

// Mock Lottie animation data (in real app, you'd import from a file)
const successAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 400,
  h: 400,
  nm: "Success Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Checkmark",
      sr: 1,
      ks: {
        o: { a: 0, k: 0 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [
          { i: { x: [0.667, 0.667, 0.667], y: [0.667, 0.667, 0.667] }, o: { x: [0.333, 0.333, 0.333], y: [0.333, 0.333, 0.333] }, t: 0, s: [0, 0, 100] },
          { i: { x: [0.667, 0.667, 0.667], y: [0.667, 0.667, 0.667] }, o: { x: [0.333, 0.333, 0.333], y: [0.333, 0.333, 0.333] }, t: 30, s: [100, 100, 100] }
        ]}
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [100, 100] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse Path 1",
              mn: "ADBE Vector Shape - Ellipse",
              hd: false
            },
            {
              ty: "st",
              c: { a: 0, k: [0.2, 0.8, 0.4, 1] },
              o: { a: 0, k: 1 },
              w: { a: 0, k: 4 },
              lc: 2,
              lj: 2,
              ml: 4,
              d: [
                { n: "d", v: "M 0,0 L 0,0" }
              ],
              nm: "Stroke 1",
              mn: "ADBE Vector Graphic - Stroke",
              hd: false
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
              nm: "Transform"
            }
          ],
          nm: "Ellipse 1",
          np: 2,
          cix: 2,
          bm: 0,
          ix: 1,
          mn: "ADBE Vector Group",
          hd: false
        }
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0
    }
  ],
  markers: []
}

const CheckoutModal = ({ open, onClose, totalPrice, items }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const steps = ['Shipping', 'Payment', 'Confirmation']

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    // Simulate checkout process
    setTimeout(() => {
      setLoading(false)
      handleNext()
      toast.success('Order placed successfully!')
    }, 3000)
  }

  const handleClose = () => {
    setActiveStep(0)
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    })
    onClose()
  }

  const renderShippingStep = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" gutterBottom>
        Shipping Information
      </Typography>
      
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        required
      />
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="First Name"
          value={formData.firstName}
          onChange={handleChange('firstName')}
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange('lastName')}
          required
        />
      </Box>
      
      <TextField
        fullWidth
        label="Address"
        value={formData.address}
        onChange={handleChange('address')}
        required
      />
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="City"
          value={formData.city}
          onChange={handleChange('city')}
          required
        />
        <TextField
          fullWidth
          label="ZIP Code"
          value={formData.zipCode}
          onChange={handleChange('zipCode')}
          required
        />
      </Box>
    </Box>
  )

  const renderPaymentStep = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" gutterBottom>
        Payment Information
      </Typography>
      
      <TextField
        fullWidth
        label="Card Number"
        value={formData.cardNumber}
        onChange={handleChange('cardNumber')}
        placeholder="1234 5678 9012 3456"
        required
      />
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="Expiry Date"
          value={formData.expiryDate}
          onChange={handleChange('expiryDate')}
          placeholder="MM/YY"
          required
        />
        <TextField
          fullWidth
          label="CVV"
          value={formData.cvv}
          onChange={handleChange('cvv')}
          placeholder="123"
          required
        />
      </Box>
      
      <Alert severity="info">
        This is a demo checkout. No real payment will be processed.
      </Alert>
    </Box>
  )

  const renderConfirmationStep = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Lottie
          animationData={successAnimation}
          style={{ width: 200, height: 200, margin: '0 auto' }}
          loop={false}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold" color="success.main">
          Order Confirmed!
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Thank you for your purchase. You will receive a confirmation email shortly.
        </Typography>
        
        <Box sx={{ backgroundColor: 'grey.50', p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {items.length} item(s) • Total: ₹{totalPrice.toLocaleString('en-IN')}
          </Typography>
        </Box>
      </motion.div>
    </Box>
  )

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderShippingStep()
      case 1:
        return renderPaymentStep()
      case 2:
        return renderConfirmationStep()
      default:
        return 'Unknown step'
    }
  }

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return formData.email && formData.firstName && formData.lastName && 
               formData.address && formData.city && formData.zipCode
      case 1:
        return formData.cardNumber && formData.expiryDate && formData.cvv
      default:
        return true
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CreditCardIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Checkout
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        {activeStep < 2 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Card variant="outlined">
              <CardContent>
                {items.map((item) => (
                  <Box key={item.product._id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      {item.product.name} x {item.quantity}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        {activeStep < 2 ? (
          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="outlined"
            >
              Back
            </Button>
            <Box sx={{ flex: 1 }} />
            {activeStep === 1 ? (
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={!isStepValid(activeStep) || loading}
                startIcon={loading ? <CircularProgress size={20} /> : <CheckCircleIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                }}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="contained"
                disabled={!isStepValid(activeStep)}
              >
                Next
              </Button>
            )}
          </Box>
        ) : (
          <Button
            onClick={handleClose}
            variant="contained"
            fullWidth
            size="large"
          >
            Continue Shopping
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default CheckoutModal
