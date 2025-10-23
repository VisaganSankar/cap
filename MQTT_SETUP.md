# MQTT Integration Setup

This project has been converted to use MQTT for real-time GSR (Galvanic Skin Response) and heart rate data instead of random values.

## Architecture

- **Backend**: MQTT broker service that receives sensor data and provides REST API + Server-Sent Events
- **Frontend**: MQTT client service that subscribes to real-time data via Server-Sent Events
- **Fallback**: REST API endpoints for data fetching when MQTT is unavailable

## Setup Instructions

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ..
npm install
```

### 2. MQTT Broker Setup

You need an MQTT broker running. Options:

#### Option A: Use a cloud MQTT broker (Recommended for testing)
- Sign up for a free account at [Eclipse Mosquitto](https://mosquitto.org/) or [HiveMQ](https://www.hivemq.com/)
- Update the broker URL in the configuration files

#### Option B: Run local MQTT broker
```bash
# Using Docker
docker run -it -p 1883:1883 -p 9001:9001 eclipse-mosquitto

# Or install Mosquitto locally
# Windows: Download from https://mosquitto.org/download/
# macOS: brew install mosquitto
# Linux: sudo apt-get install mosquitto mosquitto-clients
```

### 3. Environment Configuration

Create environment files:

**Backend (.env in backend folder):**
```env
MONGO_URI=mongodb://localhost:27017/soothescape
PORT=5000
MQTT_BROKER_URL=mqtt://localhost:1883
MQTT_CLIENT_ID=soothescape-backend
MQTT_USERNAME=
MQTT_PASSWORD=
```

**Frontend (.env in root folder):**
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MQTT_BROKER_URL=mqtt://localhost:1883
REACT_APP_MQTT_CLIENT_ID=soothescape-frontend
```

### 4. Running the Application

```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd ..
npm start
```

## MQTT Topics

The system uses the following MQTT topics:

- `sensors/gsr` - GSR sensor data (Ohms)
- `sensors/heartrate` - Heart rate data (BPM)
- `sensors/status` - Sensor status information

## Data Format

### GSR Data
```json
{
  "value": 7500,
  "timestamp": 1640995200000
}
```

### Heart Rate Data
```json
{
  "value": 85,
  "timestamp": 1640995200000
}
```

## Testing with Real Sensors

To connect real sensors:

1. **Arduino/ESP32 Setup:**
   - Connect GSR sensor to analog pin
   - Connect heart rate sensor (pulse sensor) to analog pin
   - Use Arduino MQTT library to publish data

2. **Python Script Example:**
```python
import paho.mqtt.client as mqtt
import json
import time
import random

def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")

client = mqtt.Client()
client.on_connect = on_connect
client.connect("localhost", 1883, 60)

while True:
    # Simulate GSR data (3,000-15,000 Ω)
    gsr_data = {"value": 3000 + random.random() * 12000}
    client.publish("sensors/gsr", json.dumps(gsr_data))
    
    # Simulate heart rate data (60-120 BPM)
    hr_data = {"value": 60 + random.random() * 60}
    client.publish("sensors/heartrate", json.dumps(hr_data))
    
    time.sleep(1)
```

## API Endpoints

- `GET /api/sensor-data` - Get current sensor data
- `GET /api/sensor-stream` - Server-Sent Events stream for real-time data

## Features

- ✅ Real-time MQTT data streaming
- ✅ Connection status indicators
- ✅ Automatic reconnection
- ✅ Fallback to REST API
- ✅ Configurable MQTT settings
- ✅ Stress level calculation based on GSR and heart rate
- ✅ Real-time charts and visualizations

## Troubleshooting

1. **MQTT Connection Issues:**
   - Check if MQTT broker is running
   - Verify broker URL and port
   - Check firewall settings

2. **No Data Display:**
   - Check browser console for errors
   - Verify backend is running
   - Check MQTT broker logs

3. **CORS Issues:**
   - Ensure backend CORS is configured
   - Check API URL configuration
