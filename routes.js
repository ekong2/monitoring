module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/disk', function(req,res){
		var exec = require('child_process').exec;
		//disk space
		exec("wmic logicaldisk get Caption,FreeSpace,Size", function (e, out) {
		  var results = {};
		  var disks = out.trim().split('\n');
		  disks.forEach(function(disk) {
		  	if (!disk.match(/\d+/)) return;
		    var info = disk.split(/\s+/);
		    var free = parseInt(info[1]);
		    var total = parseInt(info[2]);
		    var used = total - free;
		    results = {
		      dev: info[0][0],
		      free: free,
		      used: used,
		      total: total,
		      percentage: (used / total * 100).toFixed(2).toString() + '%',
		      mount: info[0][0]
		    };
		  });
		  res.send(results);
		});
	});

	app.get('/processes', function(req,res){
		var exec = require('child_process').exec;
		//system load + physical memory
		exec("wmic cpu get LoadPercentage", function (e, out){
			exec("wmic os get FreePhysicalMemory,TotalVisibleMemorySize", function(e, outMem){
				var results = {};
				var cpu = out.match(/\d+/)[0];
				var mem = outMem.match(/\d+/g);
				var free = parseInt(mem[0]);
				var total = parseInt(mem[1]);
				var used = total - free;
				results = {
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
				};
				res.send(results);
			});
		});
	});

	app.get('/tasks', function(req,res){
		var exec = require('child_process').exec;
		//memory
		exec("wmic process get Caption, WorkingSetSize", function (e,out){
			var results = [];
			var output = out.trim().split('\n');
			for (var i = 1; i < output.length; i++){
				var check = output[i].split(/\s{2,}/)
				var processName = check[0].trim();
				var memory = check[1].trim();
				results.push({
					processName: processName,
					memory: memory
				});
			}
			res.send(results);
		});
	});

	app.get('/diskMac', function(req,res){
		var exec = require('child_process').exec;
		//memory
		$exec('df -lg | tail -n +2', function(e, out) {
		      var results = []
		      var disks = out.trim().split('\n')
		    
		      disks.forEach(function(disk) {
		        if (!disk.match(/^\/dev/)){
		        	return;
		        }
		    
		        var info = disk.split(/\s+/);
		        results.push({
		          dev: info[0],
		          used: parseInt(info[4]),
		          mount: info[8]
		        });
		      });
		    
		      res.send(results)
		});
	});

};
