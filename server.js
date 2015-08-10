process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var http = require('http');
var express = require('express');

var app = express();
app.set('view engine', 'html');
app.set('views', './views');
app.use(express.static(__dirname + '/views'));
require('./routes')(app);

var server = require('http').createServer(app);

var port = process.env.PORT || 8000;

//Start the server
server.listen(port, function() {
console.log('Server listening on port ' + port);
});

var exec = require('child_process').exec;
//disk space
exec("wmic logicaldisk get Caption,FreeSpace,Size", function (e, out) {
  var ret = [];
  var disks = out.trim().split('\n');
  disks.forEach(function(disk) {
  	if (!disk.match(/\d+/)) return;
    var info = disk.split(/\s+/);
    var free = parseInt(info[1]);
    var total = parseInt(info[2]);
    var used = total - free;
    ret.push({
      dev: info[0][0],
      free: free,
      used: used,
      total: total,
      percentage: (used / total * 100).toFixed(2).toString() + '%',
      mount: info[0][0]
    });
  });
  console.log(ret);
});

//system load + physical memory
exec("wmic cpu get LoadPercentage", function(e, out){
	exec("wmic os get FreePhysicalMemory,TotalVisibleMemorySize", function(e, outMem){
		var ret = [];
		var cpu = out.match(/\d+/)[0];
		var mem = outMem.match(/\d+/g);
		var free = parseInt(mem[0]);
		var total = parseInt(mem[1]);
		var used = total - free;
		ret.push({
			cpu: {
				used: cpu,
				idle: 100 - cpu
			},
			memory: {
				used: used,
				usedPercentage: (used / total * 100).toFixed(2),
				free: free,
				freePercentage: (free / total * 100).toFixed(2),
				total: total
			}
		});
		console.log(ret);
	});
});

//processes ordered by memory usage
exec("tasklist /nh | sort /r /+65", function(e,out){
	var ret = 'Processes by memory used\n';
	console.log(ret, out);
	// out.trim().split('\n').slice(0, 20).forEach(function(line){
	// 	ret += line.substring(0, 25) + line.substring(64);
	// });
	// console.log(ret);
});

module.exports = app;