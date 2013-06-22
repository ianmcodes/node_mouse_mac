var objc = require('NodObjC');
    objc.import('CoreGraphics');
    objc.import('Cocoa');

objc.NSAutoreleasePool('alloc')('init');

// get height of screen[0]. We will need this for move delta
//var scrs = objc.NSScreen('screens');
//var scr = objc.NSScreen('mainScreen'); //scrs('objectAtIndex', 0);
//console.log(scr.ivars());
var height = 768; //scrs[0].frame.size.height;
//console.log(height);

function mouseMoveDelta(dx,dy) {
	// get the current location of the mouse
	var pt = objc.NSEvent('mouseLocation');
	var x = pt.x + dx;
	var y = (height - pt.y) + dy;
	//objc.CGDisplayMoveCursorToPoint(objc.CGMainDisplayID(),objc.CGPointMake(x, y));
	mouseMoveABS(x,y);
}

function mouseMoveABS(x,y) {
	objc.CGDisplayMoveCursorToPoint(objc.CGMainDisplayID(),objc.CGPointMake(x, y));
}

function showMouse() {
	objc.CGDisplayShowCursor(objc.CGMainDisplayID());
}

function getCurrentPosition() {
	var pt = objc.NSEvent('mouseLocation');
	return {x:pt.x,y:pt.y};
}

module.exports = {
    "moveDelta": mouseMoveDelta,
    "moveABS": mouseMoveABS,
    "buttonDown": function(){},
    "buttonUp": function(){},
    "show": showMouse,
    "getCurrentPosition": getCurrentPosition
}
