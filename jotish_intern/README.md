#Intentional Bug

We are not stoping the camera stream after the user navigates away from the detials page where we take photo and signature. this makes the camera keep running which is a memory leak.

Bug Location:
Detial.js
Line 16-25
