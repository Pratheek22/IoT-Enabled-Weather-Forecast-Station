🌤️ Smart Weather Station
The Smart Weather Station is an IoT-based system that collects real-time environmental data using DHT11, BMP180, and LDR sensors connected to an Arduino board. The collected data is transmitted to a Node.js backend and stored in a MongoDB database. A React.js dashboard displays the sensor data with real-time visualizations and predicts future temperature and humidity using a linear regression model.

📚 Project Overview

Sensors Used:

🌡️ DHT11 – Temperature and Humidity Sensor

⚡ BMP180 – Atmospheric Pressure Sensor

💡 LDR – Light Intensity Sensor


Technologies Used:

🎯 Backend: Node.js, Express.js, MongoDB

🎨 Frontend: React.js

🧠 Machine Learning: Python (Linear Regression Model)

🔌 Hardware: Arduino Uno / Compatible Board

🚀 How to Set Up and Run the Project

1️⃣ Set Up Backend

Navigate to Backend Folder:

cd backend

Create a .env file: Add the following variables:

MONGODB_URI=<your-mongodb-connection-string>

PORT=5000

Install Dependencies:

npm install

Start Backend Server:

node server.js


2️⃣ Upload Arduino Code

Connect Arduino Board:

Connect the Arduino board to your laptop via USB.

Upload Arduino Code:

Open the arduino folder in the Arduino IDE.

Select the correct board and port.

Upload the code to the board.

Close Arduino IDE:

Once uploaded, close the IDE to free the serial port.

3️⃣ Set Up Machine Learning Model

Navigate to the Machine Learning Folder:

cd MachineLearning

Install Required Libraries:

numpy – For numerical operations and handling arrays.

pandas – To manipulate and manage tabular data.

scikit-learn – To create and train the linear regression model.

Run Python App:

python App.py

4️⃣ Set Up Frontend

Navigate to Frontend Folder:

cd frontend

Install Dependencies:

npm install

Start Frontend:

npm start

  
📡 API Endpoints

📥 Sensor Data

GET /api/sensors/last10 – Get the last 10 sensor data entries.

POST /api/sensors – Upload sensor data to the database.

🔮 Predictions

POST /api/predict – Get next-hour predictions for temperature and humidity.

📊 Features

✅ Real-time sensor data visualization

✅ Historical data trends with interactive graphs

✅ Hourly weather predictions using ML models

✅ Responsive and user-friendly interface


📝 Contributing

Contributions are welcome! Feel free to fork the repository and create a pull request.

🛠️ Troubleshooting
MongoDB Connection Error:
Ensure your MongoDB URI is correctly added to the .env file.

Port Already in Use:
Check if any application is running on the port defined in the .env file


![screencapture-localhost-3000-2025-03-23-02_28_40](https://github.com/user-attachments/assets/77f84da5-61e9-4c0f-bed1-4f1998a9c03a)
