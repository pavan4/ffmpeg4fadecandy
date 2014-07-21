#!/usr/bin/env node

// Simple red/blue fade with Node and opc.js

var OPC = new require('./opc')
var client = new OPC('0.0.0.0', 7890);
var fs = require('fs');
var lazy = require('lazy');
var sleep = require('sleep');
var osc = require('node-osc');
var oscServer = new osc.Server(9109, '0.0.0.0');
var io = require('socket.io').listen(8000);
io.set('log level', 1); 
function readline(file) {
    new lazy(fs.createReadStream("/var/www/temp/"+file))
     .lines
     .forEach(function(line){
         //console.log(line.toString());
	var count = 0;
        var arr = line.toString().split(',');
        for(var y=0;y<5;y++){
	   for(var x=0;x<16;x++){
                var pixel = 0;
		if(x<8)	pixel = ((x)+(8*y));
		else pixel = 167-(((x)+(8*y))+56);
		client.setPixel(pixel,arr[count],arr[count+1],arr[count+2]);
		client.setPixel((pixel+128),arr[count],arr[count+1],arr[count+2])
		count = count+3;
	    }
	}
	client.writePixels();
	//sleep.usleep(process.argv[2]*1000);
	//sleep.usleep(40.411*1000);
	sleep.usleep(40.150*1000);
	//sleep.usleep(38.370*1000);
     }//line complete full frame rendered
    );
}
function init() {
 for (var pixel = 0; pixel < 128; pixel++)
    {
        client.setPixel(pixel, 0,0,0);
    }
    client.writePixels();
}
//readline();

setTimeout(init,200);
//setTimeout(readline,200);

//setInterval(readline, (process.argv[4]*1000));
oscServer.on('message', function (msg, rinfo) {

    // Show the message, for debugging
    //console.log(msg);
    if (msg[2][0] == '/frame'){
        //console.log(msg[2][240]);
	for(var y=0;y<5;y++){
           for(var x=0;x<16;x++){
                var pixel = 0;
                if(x<8) pixel = ((x)+(8*y));
                else pixel = 167-(((x)+(8*y))+56);
		var index = (x+(16*y))*3 +1;
                client.setPixel(pixel,msg[2][index+0],msg[2][index+1],msg[2][index+2]);
		//process.stdout.write(index +" " +msg[2][index+0]+" "+msg[2][index+1]+" "+msg[2][index+2]+" ");
                //client.setPixel((pixel+128),arr[count],arr[count+1],arr[count+2])
                //count = count+3;
            }
        }
        client.writePixels();
        //readline();
    }
});
io.sockets.on('connection', function (socket) {
  socket.on('my other event', function (data) {
    console.log(data);
    var split = data.split(" ");
    //console.log(split[0]+'**'+parseFloat(split[1]) +'**'+parseFloat(split[2]));
    //client.send('/phone1',(-1*parseFloat(split[1])), parseFloat(split[2]));
  });
  socket.on('my other', function (data){ 
	console.log(data);
     //readline(data);
    var sys = require('sys');
    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec("/home/ubuntu/video.sh /var/www/temp/"+data, puts);
     //socket.emit('news', { hello: 'world' });
     //client.send('/phone1/'+data);
});
  
});
