#include <Arduino.h>

void setup() {
  Serial.begin(9600);
}

void loop() {
    while (Serial.available()) {
    String data = Serial.readStringUntil('\n');
    Serial.print("You sent me: ");
    Serial.println(data);
  }
}