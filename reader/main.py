import serial

ser = serial.Serial('/dev/tty.usbmodemfd121', 115200)
while True:
  print ser.readline()
