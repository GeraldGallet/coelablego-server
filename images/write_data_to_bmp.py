import csv
import sys
import binascii

if __name__ == "__main__":

    if(len(sys.argv) < 3):
        print("Usage: python " + str(sys.argv[0]) + " <source_file> <result_file>")
        sys.exit()

    source_file = sys.argv[1]
    result_file = sys.argv[2]
    csv.field_size_limit(500 * 1024 * 1024)

    columnvector = []
    with open(source_file, 'r') as csvfile:
        csvreader = csv.reader(csvfile,delimiter=' ', quotechar='|')
        for row in csvreader:
            columnvector.append(row)
    headers =['42','4D','36','84','03','00','00','00','00','00','36','00','00','00','28','00','00','00',
    '40','01','00','00','F0','00','00','00','01','00','18','00','00','00','00','00','00','84','03','00','C5','00',
    '00','00','C5','00','00','00','00','00','00','00','00','00','00','00']

    hexArray=[]
    for i in range(0,76800):
        data = columnvector[0][i]
        hexArray.extend([data,data,data])

    with open(result_file, 'wb') as f:
        f.write(binascii.unhexlify(''.join(headers)))
        f.write(binascii.unhexlify(''.join(hexArray)))
