import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  counselorId: {
    type: Number,
    required: true
  },
  counselorName: {
    type: String,
    required: true
  },
  counselorTitle: {
    type: String,
    required: true
  },
  counselorImage: {
    type: String,
    required: true
  },
  preferredDate: {
    type: Date,
    required: true
  },
  preferredTime: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  sessionType: {
    type: String,
    enum: ['video', 'phone', 'chat', 'in-person'],
    default: 'video'
  },
  price: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Update the updatedAt field before saving
bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model('Booking', bookingSchema)



