import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import mqttService from '../services/mqttService';

const Dashboard = () => {
  const { username } = useAuth();
  const [gsrValue, setGsrValue] = useState(0);
  const [hrValue, setHrValue] = useState(0);
  const [spo2Value, setSpo2Value] = useState(0);
  const [stressLevel, setStressLevel] = useState('Low');
  const [gsrData, setGsrData] = useState(Array.from({length: 30}, () => 0));
  const [hrData, setHrData] = useState(Array.from({length: 30}, () => 0));
  const [spo2Data, setSpo2Data] = useState(Array.from({length: 30}, () => 0));
  const [mqttConnected, setMqttConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [dataBuffer, setDataBuffer] = useState({
    gsr: 0,
    heartRate: 0,
    spo2: 0,
    timestamp: Date.now()
  });
  const [lastValidData, setLastValidData] = useState({
    gsr: 0,
    heartRate: 0,
    spo2: 0,
    timestamp: Date.now()
  });

  // MQTT data subscription
  useEffect(() => {
    // Connect to MQTT service
    mqttService.connect();
    
    // Subscribe to sensor data updates
    const subscriptionId = mqttService.subscribe((event, data) => {
      if (event === 'sensorData') {
        const { gsr, heartRate, spo2, timestamp } = data;
        
        // Process only real Arduino data - no random values
        console.log(`📊 Dashboard received raw data: GSR=${gsr}, HR=${heartRate}, SpO2=${spo2}`);
        
        // Convert to numbers and handle null/undefined
        const gsrNum = gsr !== undefined && gsr !== null && !isNaN(gsr) ? Number(gsr) : 0;
        const hrNum = heartRate !== undefined && heartRate !== null && !isNaN(heartRate) ? Number(heartRate) : 0;
        const spo2Num = spo2 !== undefined && spo2 !== null && !isNaN(spo2) ? Number(spo2) : 0;
        
        // Filter out "no connection" values (GSR 183-195, HR 0, SpO2 0)
        if ((gsrNum >= 183 && gsrNum <= 195) && hrNum === 0 && spo2Num === 0) {
          console.log('🚫 No connection detected, skipping update');
          return;
        }
        
        const newData = {
          gsr: gsrNum,
          heartRate: hrNum,
          spo2: spo2Num,
          timestamp: timestamp || Date.now()
        };
        
        console.log(`📊 Dashboard processing real Arduino data: GSR=${newData.gsr}, HR=${newData.heartRate}, SpO2=${newData.spo2}`);
        
        // Update immediately - no delay
        console.log(`📊 Dashboard updating display immediately: GSR=${newData.gsr}, HR=${newData.heartRate}, SpO2=${newData.spo2}`);
        setGsrValue(newData.gsr);
        setHrValue(newData.heartRate);
        setSpo2Value(newData.spo2);
        setLastUpdate(new Date(newData.timestamp));
        setLastValidData(newData);
        
        // Updated stress calculation based on Arduino logic
        let gsrStatus, hrStatus, spo2Status;
        
        // GSR status (Arduino logic: 185-195 = no connection, <446 = relaxed, <=542 = moderate, >542 = stressed)
        const gsrVal = newData.gsr;
        const hrVal = newData.heartRate;
        const spo2Val = newData.spo2;
      
        if (gsrVal >= 185 && gsrVal <= 195) gsrStatus = "No connection";
        else if (gsrVal < 446) gsrStatus = "Relaxed";
        else if (gsrVal <= 542) gsrStatus = "Moderate";
        else gsrStatus = "Stressed";
        
        // Heart rate status
        if (hrVal === 0) hrStatus = "No connection";
        else if (hrVal < 80) hrStatus = "Relaxed";
        else if (hrVal <= 90) hrStatus = "Moderate";
        else if (hrVal > 100) hrStatus = "Stressed";
        else hrStatus = "Moderate";
        
        // SpO2 status
        if (spo2Val === 0) spo2Status = "No connection";
        else if (spo2Val < 90) spo2Status = "Low";
        else spo2Status = "Normal";
        
        // Final stress level calculation
        let newStressLevel;
        if (gsrStatus === "No connection" || hrStatus === "No connection" || spo2Status === "No connection") {
          newStressLevel = "No connection detected";
        } else if (gsrStatus === "Relaxed" && hrStatus === "Relaxed" && spo2Status === "Normal") {
          newStressLevel = "Relaxed";
        } else if ((gsrStatus === "Moderate" && hrStatus === "Moderate") ||
                   (gsrStatus === "Moderate" && spo2Status === "Low") ||
                   (hrStatus === "Moderate" && gsrStatus === "Moderate")) {
          newStressLevel = "Moderate Stress";
        } else if (gsrStatus === "Stressed" || hrStatus === "Stressed" || spo2Status === "Low") {
          newStressLevel = "High Stress";
        } else {
          newStressLevel = "Moderate Stress";
        }
        
        setStressLevel(newStressLevel);
        
        // Update chart data with real Arduino values only
        setGsrData(prev => {
          const chartData = [...prev, newData.gsr];
          return chartData.slice(-30);
        });
        setHrData(prev => {
          const chartData = [...prev, newData.heartRate];
          return chartData.slice(-30);
        });
        setSpo2Data(prev => {
          const chartData = [...prev, newData.spo2];
          return chartData.slice(-30);
        });
      } else if (event === 'connected') {
        setMqttConnected(data.connected);
      } else if (event === 'error') {
        setMqttConnected(false);
        console.error('MQTT connection error:', data.error);
      }
    });

    // Cleanup on unmount
    return () => {
      mqttService.unsubscribe(subscriptionId);
    };
  }, []);

  // Fallback: fetch initial data if MQTT is not connected
  useEffect(() => {
    if (!mqttConnected) {
      const fetchData = async () => {
        const data = await mqttService.fetchSensorData();
        if (data) {
          // Set values with fallback to 0 for null/undefined
          setGsrValue(data.gsr !== undefined && data.gsr !== null && !isNaN(data.gsr) ? data.gsr : 0);
          setHrValue(data.heartRate !== undefined && data.heartRate !== null && !isNaN(data.heartRate) ? data.heartRate : 0);
          setSpo2Value(data.spo2 !== undefined && data.spo2 !== null && !isNaN(data.spo2) ? data.spo2 : 0);
          setLastUpdate(new Date(data.timestamp));
        }
      };
      fetchData();
    }
  }, [mqttConnected]);


  const getStressColor = (level) => {
    switch(level) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      default: return '#22c55e';
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: '48px'}}>
          <h1 style={{fontSize: '48px', fontWeight: '700', marginBottom: '16px'}}>
            Welcome to your Dashboard, {username}!
          </h1>
          <p style={{fontSize: '18px', color: 'var(--muted)', marginBottom: '16px'}}>
            Monitor your wellness metrics and access mental health tools
          </p>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: mqttConnected ? '#22c55e' : '#ef4444'
            }}></div>
            <span style={{fontSize: '14px', color: 'var(--muted)'}}>
              {mqttConnected ? 'MQTT Connected' : 'MQTT Disconnected'}
            </span>
            {lastUpdate && (
              <span style={{fontSize: '12px', color: 'var(--muted)', marginLeft: '16px'}}>
                Last update: {lastUpdate.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '48px'}}>
          <div className="card" style={{textAlign: 'center', padding: '24px'}}>
            <h3 style={{margin: '0 0 8px', color: 'var(--text)'}}>Stress Level</h3>
            <div style={{fontSize: '32px', fontWeight: '700', color: getStressColor(stressLevel)}}>
              {stressLevel}
            </div>
            <p style={{margin: '8px 0 0', fontSize: '14px', color: 'var(--muted)'}}>Current Status</p>
          </div>
          
          <div className="card" style={{textAlign: 'center', padding: '24px'}}>
            <h3 style={{margin: '0 0 8px', color: 'var(--text)'}}>GSR</h3>
            <div style={{fontSize: '32px', fontWeight: '700', color: 'var(--accent)'}}>
              {gsrValue.toFixed(0)}
            </div>
            <p style={{margin: '8px 0 0', fontSize: '14px', color: 'var(--muted)'}}>Ω (Ohms)</p>
          </div>
          
          <div className="card" style={{textAlign: 'center', padding: '24px'}}>
            <h3 style={{margin: '0 0 8px', color: 'var(--text)'}}>Heart Rate</h3>
            <div style={{fontSize: '32px', fontWeight: '700', color: 'var(--primary)'}}>
              {Math.round(hrValue)}
            </div>
            <p style={{margin: '8px 0 0', fontSize: '14px', color: 'var(--muted)'}}>BPM</p>
          </div>
          
          <div className="card" style={{textAlign: 'center', padding: '24px'}}>
            <h3 style={{margin: '0 0 8px', color: 'var(--text)'}}>SpO2</h3>
            <div style={{fontSize: '32px', fontWeight: '700', color: spo2Value < 90 ? '#ef4444' : '#22c55e'}}>
              {Math.round(spo2Value)}%
            </div>
            <p style={{margin: '8px 0 0', fontSize: '14px', color: 'var(--muted)'}}>Oxygen Saturation</p>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px'}}>
          <div className="card" style={{padding: '24px'}}>
            <h3 style={{margin: '0 0 16px', color: 'var(--text)'}}>GSR Over Time</h3>
            <div style={{height: '200px', background: 'var(--surface)', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'end', justifyContent: 'space-between'}}>
              {gsrData.slice(-20).map((value, index) => (
                <div
                  key={index}
                  style={{
                    width: '8px',
                    height: `${(value / 600) * 150}px`,
                    background: 'linear-gradient(to top, var(--accent), rgba(34, 211, 238, 0.3))',
                    borderRadius: '4px 4px 0 0',
                    minHeight: '2px'
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="card" style={{padding: '24px'}}>
            <h3 style={{margin: '0 0 16px', color: 'var(--text)'}}>Heart Rate Over Time</h3>
            <div style={{height: '200px', background: 'var(--surface)', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'end', justifyContent: 'space-between'}}>
              {hrData.slice(-20).map((value, index) => (
                <div
                  key={index}
                  style={{
                    width: '8px',
                    height: `${((value - 60) / 60) * 150}px`,
                    background: 'linear-gradient(to top, var(--primary), rgba(12, 108, 242, 0.3))',
                    borderRadius: '4px 4px 0 0',
                    minHeight: '2px'
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="card" style={{padding: '24px'}}>
            <h3 style={{margin: '0 0 16px', color: 'var(--text)'}}>SpO2 Over Time</h3>
            <div style={{height: '200px', background: 'var(--surface)', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'end', justifyContent: 'space-between'}}>
              {spo2Data.slice(-20).map((value, index) => (
                <div
                  key={index}
                  style={{
                    width: '8px',
                    height: `${((value - 80) / 20) * 150}px`,
                    background: 'linear-gradient(to top, #22c55e, rgba(34, 197, 94, 0.3))',
                    borderRadius: '4px 4px 0 0',
                    minHeight: '2px'
                  }}
                />
              ))}
            </div>
          </div>
        </div>


        {/* Feature Cards */}
        <div className="cards" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'}}>
          <div className="card" style={{textAlign: 'center', padding: '32px'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>🎵</div>
            <h3>Music Therapy</h3>
            <p style={{marginBottom: '24px'}}>Relaxing music to help calm your mind and reduce stress</p>
            <Link className="btn btn-primary" to="/music">Open Music</Link>
          </div>

          <div className="card" style={{textAlign: 'center', padding: '32px'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>🤖</div>
            <h3>AI Chatbot - Aimee</h3>
            <p style={{marginBottom: '24px'}}>Talk to our friendly AI companion for emotional support</p>
            <Link className="btn btn-primary" to="/chatbot">Chat with Aimee</Link>
          </div>

          <div className="card" style={{textAlign: 'center', padding: '32px'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>🧘</div>
            <h3>Meditation & Yoga</h3>
            <p style={{marginBottom: '24px'}}>Guided meditation and yoga sessions for mindfulness</p>
            <Link className="btn btn-primary" to="/meditation-yoga">Start Session</Link>
          </div>

          <div className="card" style={{textAlign: 'center', padding: '32px'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>💆</div>
            <h3>Relaxation Exercises</h3>
            <p style={{marginBottom: '24px'}}>Breathing exercises and relaxation techniques</p>
            <Link className="btn btn-primary" to="/relaxation-exercises">Try Exercises</Link>
          </div>

          <div className="card" style={{textAlign: 'center', padding: '32px'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>👨‍⚕️</div>
            <h3>Meet a Counselor</h3>
            <p style={{marginBottom: '24px'}}>Connect with professional mental health counselors</p>
            <Link className="btn btn-primary" to="/meet-counselor">Find Counselor</Link>
          </div>
        </div>

        <div style={{textAlign: 'center', marginTop: '48px'}}>
          <Link to="/" className="btn btn-outline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
