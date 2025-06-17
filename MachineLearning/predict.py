import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from pymongo import MongoClient
from datetime import datetime
import time


def connect_to_mongo():
    """Connect to MongoDB and return the database."""
    client = MongoClient("mongodb://localhost:27017/")
    db = client["weatherDB"]
    return db


def fetch_data(collection, limit=10):
    """Fetch the latest sensor data from the collection."""
    data_cursor = collection.find().sort("_id", -1).limit(limit)
    data_list = list(data_cursor)
    if data_list and len(data_list) >= 10:
        df = pd.DataFrame(data_list[::-1]) 
        return df
    else:
        return None


def predict_data(df):
    """Use linear regression to predict the next hour's temperature and humidity."""
    X = np.arange(len(df)).reshape(-1, 1)
    y_temp = df["temperature"].astype(float)
    y_humidity = df["humidity"].astype(float)

    model_temp = LinearRegression().fit(X, y_temp)
    model_humidity = LinearRegression().fit(X, y_humidity)

    next_step = np.array([[len(df)]])
    predicted_temp = model_temp.predict(next_step)[0]
    predicted_humidity = model_humidity.predict(next_step)[0]

    return predicted_temp, predicted_humidity


def store_latest_prediction(predicted_temp, predicted_humidity, collection):
    """Delete old predictions and store the latest one."""
    collection.delete_many({})  # Delete all previous predictions

    prediction_data = {
        "timestamp": datetime.now(),
        "predicted_temperature": round(predicted_temp, 2),
        "predicted_humidity": round(predicted_humidity, 2),
    }

    collection.insert_one(prediction_data)
    print(f"✅ New prediction stored at {datetime.now()}.")


def main():
    """Main function to fetch data, predict, and store new values."""
    db = connect_to_mongo()
    sensor_collection = db["weatherDB"]
    prediction_collection = db["predictions"]

    df = fetch_data(sensor_collection)

    if df is not None:
        predicted_temp, predicted_humidity = predict_data(df)
        store_latest_prediction(predicted_temp, predicted_humidity, prediction_collection)
    else:
        print("⚠️ Not enough data to generate predictions. Waiting for more data...")


if __name__ == "__main__":
    INTERVAL = 3600 
    while True:
        main()
        time.sleep(INTERVAL)
