var mouse = require('./main');

mouse.moveABS(50,50);
mouse.show();
console.log("should be: 50,50");
var pt = mouse.getCurrentPosition();
console.log("is: " + pt.x + "," + pt.y);
setTimeout(function() {
	mouse.moveDelta(50,0);
	mouse.show();
	console.log("should be: 100,50");
	pt = mouse.getCurrentPosition();
	console.log("is: " + pt.x + "," + pt.y);
	setTimeout(function() {
		mouse.moveDelta(0,50);
		mouse.show();
		console.log("should be: 100,100");
		pt = mouse.getCurrentPosition();
		console.log("is: " + pt.x + "," + pt.y);
		setTimeout(function() {
			mouse.moveDelta(-50,0);
			mouse.show();
			console.log("should be: 50,100");
			pt = mouse.getCurrentPosition();
			console.log("is: " + pt.x + "," + pt.y);
			setTimeout(function() {
				mouse.moveDelta(0,-50);
				mouse.show();
				console.log("should be: 50,50");
				pt = mouse.getCurrentPosition();
				console.log("is: " + pt.x + "," + pt.y);
			},2000);
		},2000);
	},2000);
},2000);
