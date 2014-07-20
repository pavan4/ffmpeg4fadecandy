ffmpeg4fadecandy
================

Please download a working branch of ffmpeg from git://source.ffmpeg.org/ffmpeg.git

Follow the steps below:

1) Replace the ffplay.c file with the one modified here

2) Add the libOSC/, htmsocket.c, htmsocket.h, test.c  in the root folder or the build folder

3) Please change the ip and port to your desired value (This is usually your osc server and port from node)

4) Compile ffplay

5) Run the node server which listens to the frames via osc. 

6) Run the video on ffplay and watch the pixels light up.

Note: //TODO

Currently cannot pass the ip and port via commandline for ffplay (will add them later)

Cannot parse the config for the pixel layout. Currently configured to a 16x5 [2x (8x5) neopixel shields] config.

PPS: Please excuse my bad coding this was done only for testing and I will refine the whole project later. If anyone is willing to contribute I am more than happy.


