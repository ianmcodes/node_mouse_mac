var objc = require('NodObjC');
    objc.import('CoreGraphics');
	objc.import('ApplicationServices');
    objc.import('AppKit');

var scr = objc.CGDisplayBounds(objc.CGMainDisplayID());
var height = scr.size.height;
var evtSource = objc.CGEventSourceCreate(objc.kCGEventSourceStateHIDSystemState);

function mouseMoveDelta(dx,dy) {
	// get the current location of the mouse
	var pt = getCurrentPosition();
	var x = pt.x + dx;
	var y = pt.y + dy;
	mouseMoveABS(x,y);
	//var evt = objc.CGEventCreateMouseEvent(evtSrc, objc.kCGEventMouseMoved, objc.CGPointMake((pt.x + dx), (pt.y + dy)),objc.kCGMouseButtonLeft);
	//objc.CFRelease(evt);
	//objc.CGDisplayMoveCursorToPoint(objc.CGMainDisplayID(),objc.CGPointMake((pt.x + dx), (pt.y + dy)));
}

function mouseMoveABS(x,y) {
	var evt = objc.CGEventCreateMouseEvent(
		null, //evtSource, 
		objc.kCGEventMouseMoved, 
		objc.CGPointMake(x, y),
		objc.kCGMouseButtonLeft
	);
	objc.CGEventPost(objc.kCGHIDEventTap, evt);
	//objc.CFRelease(evt);
	//objc.CGDisplayMoveCursorToPoint(objc.CGMainDisplayID(),objc.CGPointMake(x, y));
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
	//console.log("down: ", pt);
	var evt = objc.CGEventCreateMouseEvent(
		evtSource, // event source
		objc.kCGEventLeftMouseDown, // event type
		objc.CGPointMake(pt.x,pt.y), // cursor position
		objc.kCGMouseButtonLeft
	);
	objc.CGEventPost(objc.kCGHIDEventTap, evt);
}

function mouseBtnUp() {
	var pt = getCurrentPosition();
	//console.log("up: ", pt);
	var evt = objc.CGEventCreateMouseEvent(
		evtSource, // event source
		objc.kCGEventLeftMouseUp, // event type
		objc.CGPointMake(pt.x,pt.y), // cursor position
		objc.kCGMouseButtonLeft
	);
	objc.CGEventPost(objc.kCGHIDEventTap, evt);
}

module.exports = {
    "moveDelta": mouseMoveDelta,
    "moveABS": mouseMoveABS,
    "buttonDown": mouseBtnDown,
    "buttonUp": mouseBtnUp,
    "show": showMouse,
    "getCurrentPosition": getCurrentPosition
}
