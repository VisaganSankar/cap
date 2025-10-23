export const mqttConfig = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  brokerUrl: process.env.REACT_APP_MQTT_BROKER_URL || 'mqtt://localhost:1883',
  clientId: process.env.REACT_APP_MQTT_CLIENT_ID || 'soothescape-frontend',
  topics: {
    gsr: 'sensors/gsr',
    heartRate: 'sensors/hr',
    spo2: 'sensors/spo2',
    status: 'sensors/status'
  },
  reconnectInterval: 5000,
  maxReconnectAttempts: 10
};
