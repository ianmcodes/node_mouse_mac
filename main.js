/*
 * https://developer.apple.com/library/mac/#documentation/Carbon/Reference/QuartzEventServicesRef/Reference/reference.html
 */
var objc = require('NodObjC');
    objc.import('CoreGraphics');
    objc.import('AppKit');
    //objc.import('CoreFoundation'); // ??
var util = require('util');

var pool = objc.NSAutoreleasePool('alloc')('init');
var scr = objc.CGDisplayBounds(objc.CGMainDisplayID());
var height = scr.size.height;
var width = scr.size.width;
delete scr;
var evtSource = objc.CGEventSourceCreate(objc.kCGEventSourceStateHIDSystemState);
function mouseMoveDelta(dx,dy) {
	// get the current location of the mouse
	var pt = getCurrentPosition();
	var x = pt.x + dx;
	var y = pt.y + dy;
	mouseMoveABS(x,y);
	
	//var evt = objc.CGEventCreateMouseEvent(evtSrc, objc.kCGEventMouseMoved, objc.CGPointMake((pt.x + dx), (pt.y + dy)),objc.kCGMouseButtonLeft);
	//objc.CGDisplayMoveCursorToPoint(objc.CGMainDisplayID(),objc.CGPointMake((pt.x + dx), (pt.y + dy)));
}

function mouseMoveABS(x,y) {
	// location sanity check
	if (x < 0)
		x = 0;
	if (x > width)
		x = width;
	if (y < 0) 
		y = 0;
	if (y > height) 
		y = height;
	////////////////////////
	var evt = objc.CGEventCreateMouseEvent(
		evtSource, //evtSource, 
		objc.kCGEventMouseMoved, 
		objc.CGPointMake(x, y),
		objc.kCGMouseButtonLeft
	);
	try {
		objc.CGEventPost(objc.kCGSessionEventTap, evt); // kCGSessionEventTap?
	} catch(e) {
		console.log(e);
	}
	pool('drain');
	//objc.CGDisplayMoveCursorToPoint(objc.CGMainDisplayID(),objc.CGPointMake(x, y));
}

function showMouse() {
	objc.CGDisplayShowCursor(objc.CGMainDisplayID());
	pool('drain');
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
	try {
		objc.CGEventPost(objc.kCGHIDEventTap, evt);
	} catch(e) {
		console.log(e);
	}
	pool('drain');
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
	try {
		objc.CGEventPost(objc.kCGHIDEventTap, evt);
	} catch(e) {
		console.log(e);
	}
	pool('drain');
}

function mouseWheel(distance, unit) {
	unit = (isNaN(unit) || unit === null || unit < 0 || unit > 1) ? objc.kCGScrollEventUnitPixel : unit;
	var evt = objc.CGEventCreateScrollWheelEvent(
		evtSource,
		unit,
		1,
		distance
	);
	try {
		objc.CGEventPost(objc.kCGHIDEventTap, evt);
	} catch(e) {
		console.log(e);
	}
	pool('drain');
}

module.exports = {
    "moveDelta": mouseMoveDelta,
    "moveABS": mouseMoveABS,
    "buttonDown": mouseBtnDown,
    "buttonUp": mouseBtnUp,
    "show": showMouse,
    "getCurrentPosition": getCurrentPosition
}
