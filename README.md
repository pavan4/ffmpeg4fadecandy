ffmpeg4fadecandy
================

Warning!!! This is not for the faint hearted. This is still half-baked and if the code makes you go crazy please don't hold me responsible.  Having said that I will refine it and make it usable, I didn't find time yet. Thank you for reading.

Firstly, please download a working branch of ffmpeg from git://source.ffmpeg.org/ffmpeg.git

Follow the steps below:

1) Replace the ffplay.c file with the one modified here

2) Add the libOSC/, htmsocket.c, htmsocket.h, test.c  in the root folder or the build folder

3) Please change the ip and port to your desired value (This is usually your osc server and port from node) on Lines 3594 and 3595 in ffplay.c

4) Compile ffplay

5) Run the node video_server which listens to the frames via osc from ffplay.c

6) Run the video on ffplay and watch the pixels light up.

Note: //TODO

If you want to change the layout you also have to take care of addressing as well. The values from the video come from queue_picture method in ffplay.c

Currently cannot pass the ip and port via commandline for ffplay (will add them later)

Cannot parse the config for the pixel layout. Currently configured to a 16x5 [2x (8x5) neopixel shields] config.

Documentation :

OSC Receiver
	libOSC/ 
	htmsocket.c
	htmsocket.h 

OSC Server
	test.c (server port hard coded as 9110 on line 594 sorry again)



PPS: Please excuse my bad coding this was done only for testing and I will refine the whole project later. If anyone is willing to contribute I am more than happy.


