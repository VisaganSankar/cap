import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import MQTTBroker from './services/mqttBroker.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

// Initialize MQTT Broker
const mqttBroker = new MQTTBroker()
mqttBroker.connect()

// Connect to MongoDB
console.log("MONGO_URI from env:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err))

// Import models
import User from './models/User.js'
import Booking from './models/Booking.js'

// Register route
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    res.status(200).json({ message: 'Login successful' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Booking routes
// Create a new booking
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      userEmail,
      counselorId,
      counselorName,
      counselorTitle,
      counselorImage,
      preferredDate,
      preferredTime,
      contactEmail,
      contactPhone,
      message,
      sessionType,
      price
    } = req.body

    const newBooking = new Booking({
      userEmail,
      counselorId,
      counselorName,
      counselorTitle,
      counselorImage,
      preferredDate,
      preferredTime,
      contactEmail,
      contactPhone,
      message,
      sessionType,
      price
    })

    await newBooking.save()
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// Get user's bookings
app.get('/api/bookings/:userEmail', async (req, res) => {
  try {
    const { userEmail } = req.params
    const bookings = await Booking.find({ userEmail }).sort({ createdAt: -1 })
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// Update booking status
app.put('/api/bookings/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params
    const { status } = req.body
    
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status, updatedAt: Date.now() },
      { new: true }
    )
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    
    res.json({ message: 'Booking updated successfully', booking })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// Delete booking
app.delete('/api/bookings/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params
    const booking = await Booking.findByIdAndDelete(bookingId)
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    
    res.json({ message: 'Booking deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// MQTT Sensor Data routes
app.get('/api/sensor-data', (req, res) => {
  try {
    const sensorData = mqttBroker.getCurrentSensorData()
    res.json(sensorData)
  } catch (err) {
    res.status(500).json({ message: 'Failed to get sensor data' })
  }
})

// WebSocket endpoint for real-time sensor data
app.get('/api/sensor-stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  })

  const subscriberId = mqttBroker.subscribeToSensorData((event, data) => {
    if (event === 'sensorData') {
      res.write(`data: ${JSON.stringify(data)}\n\n`)
    }
  })

  req.on('close', () => {
    mqttBroker.unsubscribeFromSensorData(subscriberId)
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
