#include <Wire.h>
#include <DHT.h>
#include <Adafruit_BMP085.h>

// DHT11 setup
#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// BMP180 setup
Adafruit_BMP085 bmp;

// LDR setup
#define LDR_PIN A0

void setup() {
  Serial.begin(9600);
  dht.begin(); // Initialize DHT11 sensor

  // Check BMP180 connection
  if (!bmp.begin()) {
    Serial.println("BMP180 not detected! Check wiring.");
    while (1);
  }
}

void loop() {
  // Read DHT11 (Temperature & Humidity)
  float temperatureDHT = dht.readTemperature();  // Celsius
  float humidity = dht.readHumidity();

  // Read BMP180 (Pressure)
  float pressure = bmp.readPressure() / 100.0;  // Convert to hPa

  // Read LDR (Light Intensity)
  int lightIntensity = analogRead(LDR_PIN);

  // Check if any reading failed
  if (isnan(temperatureDHT) || isnan(humidity)) {
    Serial.println("{\"error\":\"Failed to read DHT11\"}");
  } else {
    // Format JSON data and send over Serial
    Serial.print("{\"temperature\":");
    Serial.print(temperatureDHT);
    Serial.print(",\"humidity\":");
    Serial.print(humidity);
    Serial.print(",\"pressure\":");
    Serial.print(pressure);
    Serial.print(",\"lightIntensity\":");
    Serial.print(lightIntensity);
    Serial.println("}");
  }

  delay(10000);  // Send data every 10 seconds
}
