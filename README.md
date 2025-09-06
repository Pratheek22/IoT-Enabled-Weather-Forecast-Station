# 🌤️ Smart Weather Station

An IoT-powered weather station that collects **real-time temperature, humidity, pressure, and light intensity data**. Data is visualized on a React.js dashboard and weather is predicted using a Machine Learning model (Linear Regression).

---

## 📚 Project Overview

### 🔌 Hardware & Sensors
- 🌡️ **DHT11** – Temperature & Humidity Sensor  
- ⚡ **BMP180** – Atmospheric Pressure Sensor  
- 💡 **LDR** – Light Intensity Sensor  
- 🖥️ **Arduino Uno / Compatible Board**

### 🛠️ Technologies Used
- 🎯 **Backend:** Node.js, Express.js, MongoDB  
- 🎨 **Frontend:** React.js  
- 🧠 **Machine Learning:** Python (Linear Regression)  
- 🔌 **Hardware:** Arduino Uno + sensors  

---

## 🚀 How to Set Up and Run

### 1️⃣ Backend Setup
```bash
cd backend
npm install
# Create a .env file and add:
# MONGODB_URI=<your-mongodb-connection-string>
# PORT=5000
npm start
```

### 2️⃣ Arduino Setup
- Connect the Arduino board via USB.  
- Open the `arduino/` folder in **Arduino IDE**.  
- Select the correct board & port, then upload the code.  
- Close IDE after uploading (to free serial port).  

### 3️⃣ Machine Learning Setup
```bash
cd MachineLearning
pip install numpy pandas scikit-learn
python App.py
```

### 4️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 📡 API Endpoints

### 📥 Sensor Data
- `GET /api/sensors/last10` → Get last 10 sensor entries  
- `POST /api/sensors` → Upload sensor data  

Example response:
```json
[
  {
    "temperature": 28,
    "humidity": 65,
    "light": 300,
    "pressure": 1008,
    "timestamp": "2025-09-06T12:00:00Z"
  }
]
```

### 🔮 Predictions
- `POST /api/predict` → Get next-hour temperature & humidity prediction  

---

## 📊 Features
✅ Real-time sensor data visualization  
✅ Historical trends with interactive graphs  
✅ Hourly predictions using ML model  
✅ Responsive, user-friendly dashboard  

---

## 📂 Folder Structure
```
📂 SmartWeatherStation
├── backend/        # Node.js + Express API
├── frontend/       # React.js dashboard
├── MachineLearning # Linear Regression model
└── arduino/        # Arduino code for sensors
```

---

## 📝 Contributing
Contributions are welcome! Fork the repository and create a pull request.  

---

## 🛠️ Troubleshooting
- **MongoDB Connection Error:** Ensure your MongoDB URI is correct in `.env`.  
- **Port Already in Use:** Check if another app is using the defined port.  

---

## 📷 Screenshots
![screencapture-localhost-3000-2025-03-23-02_28_40](https://github.com/user-attachments/assets/77f84da5-61e9-4c0f-bed1-4f1998a9c03a)
