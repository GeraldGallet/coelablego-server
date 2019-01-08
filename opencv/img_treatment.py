import cv2
from matplotlib.pyplot import *
import numpy
import math
import glob
import os.path 
# from pyimagesearch.shapedetector import ShapeDetector
import argparse
import imutils

# list = glob.glob("D:\\travail\\M2\\ProjetLEGO\\OpenCV\\CorpusLego\\brick_2x2_rougeTransparent\\*.jpg")
datasimg = {}

def listdirectory(path): 
    fichier=[] 
    l = glob.glob(path+'\\*') 
    for i in l: 
        if os.path.isdir(i): fichier.extend(listdirectory(i)) 
        else: fichier.append(i) 
    return fichier
	
list = listdirectory("D:\\travail\\M2\\ProjetLEGO\\OpenCV\\CorpusLego")


def createmask(path):
	listres=[]
	listmask=[]
	# for file in list:

	im = cv2.imread(path)
	#cv2.imshow('original',im)
	#cv2.waitKey(0)
	mask = np.zeros(im.shape[:2],np.uint8)
	
	# Convert BGR to HSV
	hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)

	# define range of blue color in HSV
	lower_white = np.array([0,100,0])
	upper_white = np.array([180,255,255])

	# Threshold the HSV image to get only white colors
	mask = cv2.inRange(hsv, lower_white, upper_white)

	# Bitwise-AND mask and original image
	res = cv2.bitwise_and(im,im, mask= mask)

	# cv2.imshow('frame',im)
	# cv2.imshow('mask',mask)
	# cv2.imshow('mask',mask)
	# cv2.imshow('res',res)
		
	listres.append(res)
	listmask.append(mask)
	# datasimg['res'] = res
	# datasimg['mask'] = mask
	cv2.destroyAllWindows()
	return listres,listmask

def countpixels(path):
	i=0
	j=0
	# for immask in listmask:
		# j=j+1
		# cv2.imwrite('D:\\travail\\M2\\ProjetLEGO\\OpenCV\\CorpusLego3\\imgmask'+str(i)+'.jpg',immask)
	for img in listimgres:
		i=i+1
		cv2.imwrite('D:\\travail\\M2\\ProjetLEGO\\OpenCV\\CorpusLego2\\imgres'+str(i)+'.jpg',img)
		img1 = cv2.imread('D:\\travail\\M2\\ProjetLEGO\\OpenCV\\CorpusLego2\\imgres'+str(i)+'.jpg',cv2.IMREAD_GRAYSCALE)
		height, width, channels = img.shape
		TP = width*height
		cv2.imshow('image1',img)
		n_black_pix = np.sum(img1 == 0)
		nbpixelpiece = TP-n_black_pix
		print('imgres'+str(i)+'.jpg'+' Number of black pixels:', n_black_pix,'     ',TP,'       nb de pixels de la piece',nbpixelpiece))
		datasimg['nombre_de_pixel'] = nbpixelpiece
		return nbpixelpiece
		cv2.waitKey(0)

class ShapeDetector:
	def __init__(self):
		pass
 
	def detect(self, c):
		# initialize the shape name and approximate the contour
		shape = "unidentified"
		peri = cv2.arcLength(c, True)
		approx = cv2.approxPolyDP(c, 0.04 * peri, True)
		# if the shape is a triangle, it will have 3 vertices
		if len(approx) == 3:
			shape = "triangle"
 
		# if the shape has 4 vertices, it is either a square or
		# a rectangle
		elif len(approx) == 4:
			# compute the bounding box of the contour and use the
			# bounding box to compute the aspect ratio
			(x, y, w, h) = cv2.boundingRect(approx)
			ar = w / float(h)
 
			# a square will have an aspect ratio that is approximately
			# equal to one, otherwise, the shape is a rectangle
			shape = "square" if ar >= 0.95 and ar <= 1.05 else "rectangle"
 
		# if the shape is a pentagon, it will have 5 vertices
		elif len(approx) == 5:
			shape = "pentagon"
 
		# if the shape is a hexagon, it will have 6 vertices
		elif len(approx) == 6:
			shape = "hexagon"
			
		elif len(approx) < 100:
			shape = "shape"
 
		# otherwise, we assume the shape is a circle
		else:
			shape = "circle"
 
		# return the name of the shape
		return shape

list2 = listdirectory('D:\\travail\\M2\\ProjetLEGO\\OpenCV\\CorpusLego2')
		
def shapedrawer(path):		
	# construct the argument parse and parse the arguments
	# ap = argparse.ArgumentParser()
	# ap.add_argument("-i", "--image", required=True,
		# help="path to the input image")
	# args = vars(ap.parse_args())
	
	# load the image and resize it to a smaller factor so that
	# the shapes can be approximated better
	image = cv2.imread(path)
	resized = imutils.resize(image, width=300)
	ratio = image.shape[0] / float(resized.shape[0])
	 
	# convert the resized image to grayscale, blur it slightly,
	# and threshold it
	gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
	blurred = cv2.GaussianBlur(gray, (5, 5), 0)
	thresh = cv2.threshold(blurred, 200, 255, cv2.THRESH_TRUNC)[1]
	 
	# find contours in the thresholded image and initialize the
	# shape detector
	cnts = cv2.findContours(thresh.copy(), cv2.RETR_TREE,
	cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)
	sd = ShapeDetector()
	datasimg['shape'] = sd

	# loop over the contours
	for c in cnts:
		# compute the center of the contour, then detect the name of the
		# shape using only the contour
		M = cv2.moments(c)
		if(M["m00"]==0): # this is a line
				 shape = "line"
		else :
			cX = int((M["m10"] / M["m00"]) * ratio)
			cY = int((M["m01"] / M["m00"]) * ratio)
			shape = sd.detect(c)
		 
			# multiply the contour (x, y)-coordinates by the resize ratio,
			# then draw the contours and the name of the shape on the image
			c = c.astype("float")
			c *= ratio
			c = c.astype("int")
			cv2.drawContours(image, [c], -1, (0, 255, 0), 2)
			cv2.putText(image, shape, (cX, cY), cv2.FONT_HERSHEY_SIMPLEX,
				0.5, (255, 255, 255), 2)
		 
			# show the output image
			cv2.imshow("Image", image)
			# cv2.waitKey(0)
		cv2.waitKey(0)
		
			
def colordetection(path):
	# for img in list2:
	# load the image
	image = cv2.imread(path)
	# define the list of boundaries
	boundaries = [
		([17, 15, 100], [50, 56, 200]), #shades of blue
		([86, 31, 4], [220, 88, 50]), #shades of red
		([25, 146, 190], [62, 174, 250]), #shades of green
		([103, 86, 65], [145, 133, 128]), #shades of yellow
		([199, 20, 133], [255, 192, 203]), #shades of pink
		([255, 69, 0], [255, 255, 224]), #shades of yellow
		([105, 105, 105], [220, 220, 220]), #shades of gray
		([0, 0, 0], [47, 79, 79]) #shades of black
	]
	listcolor = ["blue","red","green","yellow","pink","yellow","gray","black"]
	list_nb_pixel = []
	
	# loop over the boundaries
	for (lower, upper) in boundaries:
		# create NumPy arrays from the boundaries
		lower = np.array(lower, dtype = "uint8")
		upper = np.array(upper, dtype = "uint8")
	 
		# find the colors within the specified boundaries and apply
		# the mask
		mask = cv2.inRange(image, lower, upper)
		output = cv2.bitwise_and(image, image, mask = mask)
		
		img1 = cv2.imread(img,cv2.IMREAD_GRAYSCALE)
		height, width, channels = output.shape
		TP = width*height
		cv2.imshow('image1',output)
		n_black_pix = np.sum(img1 == 0)
		nbpixelpiece = TP-n_black_pix
		list_nb_pixel.append(nbpixelpiece)
		#écrire une itération de la listcolor pour comparer le nb de pixel de chaque mask et retourner la couleur
	color = listcolor[0]
	color_nb = list_nb_pixel[0]
	
	for i in range(1, len(list_nb_pixel)) :
		if list_nb_pixel[i] > color_nb:
			color = listcolor[i]
			color_nb = list_nb_pixel[i]
	datasimg['color'] = color
		
		# show the images
		cv2.imshow("images", np.hstack([image, output]))
		cv2.waitKey(0)
	
	
	
# listimgres,listmask=createmask()
# countpixels()
shapedrawer()