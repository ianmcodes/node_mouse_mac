var objc = require('NodObjC');
    objc.import('CoreGraphics');
    objc.import('Cocoa');

objc.NSAutoreleasePool('alloc')('init');

// get height of screen[0]. We will need this for move delta
//var scrs = objc.NSScreen('screens');
var scr = objc.CGDisplayBounds(objc.CGMainDisplayID()); //scrs('objectAtIndex', 0);
//console.log(scr.size.height);
var height = scr.size.height; //768; //scrs[0].frame.size.height;
//console.log(height);
var evtSource = objc.CGEventSourceCreate(objc.kCGEventSourceStateHIDSystemState);

function mouseMoveDelta(dx,dy) {
	// get the current location of the mouse
	var pt = getCurrentPosition()
	var x = pt.x + dx;
	var y = pt.y + dy;
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
	return {x:pt.x,y:(height - pt.y)};
}

function mouseBtnDown() {
	var pt = getCurrentPosition();
	console.log("down: %o", pt);
	var evt = objc.CGEventCreateMouseEvent(
		objc.CGEventSourceCreate(objc.kCGEventSourceStateHIDSystemState), // event source
		objc.kCGEventLeftMouseDown, // event type
		objc.CGPointMake(pt.x,pt.y), // cursor position
		objc.kCGMouseButtonLeft
	);
}

function mouseBtnUp() {
	var pt = getCurrentPosition();
	console.log("up: %o", pt);
	var evt = objc.CGEventCreateMouseEvent(
		evtSource, // event source
		objc.kCGEventLeftMouseUp, // event type
		objc.CGPointMake(pt.x,pt.y), // cursor position
		objc.kCGMouseButtonLeft
	);
}

module.exports = {
    "moveDelta": mouseMoveDelta,
    "moveABS": mouseMoveABS,
    "buttonDown": mouseBtnDown,
    "buttonUp": mouseBtnUp,
    "show": showMouse,
    "getCurrentPosition": getCurrentPosition
}
