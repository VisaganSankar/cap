export const mqttConfig = {
  brokerUrl: process.env.MQTT_BROKER_URL || 'mqtt://test.mosquitto.org:1883',
  clientId: process.env.MQTT_CLIENT_ID || 'soothescape-backend',
  username: process.env.MQTT_USERNAME || '',
  password: process.env.MQTT_PASSWORD || '',
  topics: {
    gsr: 'sensors/gsr',
    heartRate: 'sensors/hr',
    spo2: 'sensors/spo2',
    status: 'sensors/status'
  },
  options: {
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    keepalive: 60,
    qos: 1
  }
};
