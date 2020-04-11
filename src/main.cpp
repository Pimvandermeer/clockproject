#include<Arduino.h>
#include <SPI.h>

byte buf [100];
volatile byte pos;
volatile boolean process_it;

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
};

// SPI interrupt routine
ISR (SPI_STC_vect) {
  byte c = SPDR;  // grab byte from SPI Data Register
  
  // add to buffer if room
  if (pos < (sizeof (buf) - 1))
    buf [pos++] = c; 
    
  // example: newline means time to process buffer
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


// main loop - wait for flag set in interrupt routine
void loop (void) {
  if (process_it) {
    buf [pos] = 0; 

    //take buf and set to string
    char str[32] = "";
    array_to_string(buf, 8, str);
    Serial.println (str);  

    pos = 0;
    process_it = false;
    };    
}  