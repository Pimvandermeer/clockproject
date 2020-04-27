#include<Arduino.h>
#include <SPI.h>
#include <AccelStepper.h>

byte buf [100];
volatile byte pos;
volatile boolean process_it;

class motor {
  public:
  byte _dirPin;
  byte _stepPin;

  void setMotor(byte stepPin, byte dirPin);
  void createMotorInstance();
  
  private:
    /* data */
};

void motor::setMotor (byte stepPin, byte dirPin) {
  _dirPin = dirPin;
  _stepPin = stepPin;
}

motor motor1;




// Define pin connections
const int dirPin = 2;
const int stepPin = 3;

// Define motor interface type
#define motorInterfaceType 1

// Creates an instance
AccelStepper myStepper(motorInterfaceType, stepPin, dirPin);

// SPI interrupt routine
ISR (SPI_STC_vect) {
  byte c = SPDR;  // grab byte from SPI Data Register
  
  // add to buffer if room
  if (pos < (sizeof (buf) - 1))
    buf [pos++] = c; 
    //Serial.println("recieved something");
    
  // example: 255 means time to process buffer
  if (c == 0xff)
    process_it = true;
};  

void array_to_string(byte array[], unsigned int len, char buffer[]) {
    for (unsigned int i = 0; i < len; i++) {
        byte nib1 = (array[i] >> 4) & 0x0F;
        byte nib2 = (array[i] >> 0) & 0x0F;
        buffer[i*2+0] = nib1  < 0xA ? '0' + nib1  : 'A' + nib1  - 0xA;
        buffer[i*2+1] = nib2  < 0xA ? '0' + nib2  : 'A' + nib2  - 0xA;
    }
    buffer[len*2] = '\0';
}

void setMotorPosition(int position) {
  int data = map(position, 0, 10, 0, 50);
  Serial.println(data);
  myStepper.runToNewPosition(data);
}

void setup (void) {
  Serial.begin (115200);   // debugging

  // have to send on master in, *slave out*
  pinMode(MISO, OUTPUT);  
  // turn on SPI in slave mode
  SPCR |= _BV(SPE);
    // get ready for an interrupt 
  pos = 0;   // buffer empty
  process_it = false;
  // now turn on interrupts
  SPI.attachInterrupt();

  //Set stepper motor
  myStepper.setMaxSpeed(4000);
  myStepper.setAcceleration(8000);
  myStepper.setSpeed(100);

    // set motor position to 0
  myStepper.setCurrentPosition(0);

};

// main loop - wait for flag set in interrupt routine
void loop (void) {

  if (process_it) {
    buf [pos] = 0; 

    if (buf[0] == 0) {
    setMotorPosition(buf[1]);  
    }

    //take buf and set to string
    char str[32] = "";
    array_to_string(buf, 3, str);
    
    pos = 0;
    process_it = false;
    };    
}  