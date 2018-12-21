import serial

if __name__ == "__main__":
    ser = serial.Serial()
    ser.baudrate = 9600
    ser.port = 'COM9'
    ser.open()
    while(True):
        print(ser.read())
