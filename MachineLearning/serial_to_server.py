import serial
import requests
import json
import time

serial_port = "COM5"
baud_rate = 9600

try:
    arduino = serial.Serial(serial_port, baud_rate, timeout=1)
    print(f"✅ Connected to Arduino on {serial_port}")
except serial.SerialException:
    print(f"❌ Error: Cannot connect to {serial_port}. Check connection and port!")
    arduino = None


server_url = "http://localhost:5000/api/sensors"
MAX_RETRIES = 3
RETRY_DELAY = 2


def send_data(sensor_data):
    """Send sensor data to the server."""
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.post(server_url, json=sensor_data)
            if response.status_code == 201:
                print("✅ Data sent successfully!")
                return True
            else:
                print(f"❗ Failed to send data (Attempt {attempt + 1}/{MAX_RETRIES}): {response.text}")
        except requests.RequestException as e:
            print(f"⚠️ Network error: {e}")
        time.sleep(RETRY_DELAY)
    print("❌ Failed to send data after multiple retries.")
    return False


while True:
    try:
        if arduino and arduino.in_waiting > 0:
            line = arduino.readline().decode("utf-8").strip()
            if line:
                print("📡 Received from Arduino:", line)
                try:
                    sensor_data = json.loads(line)
                    required_keys = ["temperature", "humidity", "pressure", "lightIntensity"]
                    if all(key in sensor_data for key in required_keys):
                        sensor_data["light"] = sensor_data.pop("lightIntensity")
                        send_data(sensor_data)
                    else:
                        print("⚠️ Missing some sensor data. Retrying...")
                except json.JSONDecodeError:
                    print("⚠️ Invalid JSON format received. Skipping...")
        else:
            print("⏳ No data received from Arduino. Waiting...")
            time.sleep(2)
    except KeyboardInterrupt:
        print("🛑 Stopping script...")
        if arduino:
            arduino.close()
        break