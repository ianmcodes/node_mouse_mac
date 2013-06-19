var mouse = require('node_mouse_mac');

mouse.moveABS(50,50);
mouse.show();
console.log("50,50");
setTimeout(function() {
	mouse.moveDelta(50,0);
	mouse.show();
	console.log("100,50");
	setTimeout(function() {
		mouse.moveDelta(0,50);
		mouse.show();
		console.log("100,100");
		setTimeout(function() {
			mouse.moveDelta(-50,0);
			mouse.show();
			console.log("50,100");
			setTimeout(function() {
				mouse.moveDelta(0,-50);
				mouse.show();
				console.log("50,50");
			},2000);
		},2000);
	},2000);
},2000);
