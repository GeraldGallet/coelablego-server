import serial
import math
import base64

size_of_file = 0
length_of_block = 1024
actual_byte = 0

def read_new_line(ser, in_file):
    global actual_byte

    if(in_file):
        read_line = ""
        for i in range(length_of_block):
            new_char = ser.read()
            read_line += chr(int.from_bytes(new_char, byteorder='little'))
            #read_line += new_char
            actual_byte += 1
            if actual_byte == size_of_file:
                break

        return read_line
    else:
        line = ser.readline()
        returned_line = ""
        for i in range(len(line)):
            returned_line += chr(line[i])

        return returned_line[0:-2]

if __name__ == "__main__":
    ser = serial.Serial()
    ser.baudrate = 9600
    ser.port = 'COM9'
    ser.open()

    length_of_block = 1024

    received_line = read_new_line(ser, False)
    while(received_line != 'route_prendre_photo'):
        print(received_line)
        received_line = read_new_line(ser, False)

    print('--- STARTING IMAGE ---')

    size_of_file = int(read_new_line(ser, False)[0:-3])
    expected_blocks = int(math.ceil(float(size_of_file) / float(length_of_block)))
    print("Size of file: " + str(size_of_file))
    print("Expected blocks: " + str(expected_blocks))

    image_file = open('image.jpg', 'wb')

    for i in range(expected_blocks):
        received_line = read_new_line(ser, True)
        print("* " + str(i) + ": " + str(len(received_line)))
        image_file.write(received_line.encode('latin-1'))

    image_file.close()
    exit(0)
