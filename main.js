var objc = require('NodObjC');
    objc.import('CoreGraphics');
	objc.import('ApplicationServices');
    objc.import('AppKit');

var evtSrc = objc.CGEventSourceCreate(objc.kCGEventSourceStateHIDSystemState);

function mouseMoveDelta(dx,dy) {
	// get the current location of the mouse
	var pt = objc.NSEvent('mouseLocation');
	var evt = objc.CGCreateMouseEvent(evtSrc, objc.kCGEventMouseMoved, objc.CGPointMake((pt.x + dx), (pt.y + dy)));
	objc.CFRelease(evt);
	//objc.CGDisplayMoveCursorToPoint(objc.CGMainDisplayID(),objc.CGPointMake((pt.x + dx), (pt.y + dy)));
}

function mouseMoveABS(x,y) {
	objc.CGDisplayMoveCursorToPoint(objc.CGMainDisplayID(),objc.CGPointMake(x, y));
}

function showMouse() {
	objc.CGDisplayShowCursor(objc.CGMainDisplayID());
}

module.exports = {
    "moveDelta": mouseMoveDelta,
    "moveABS": mouseMoveABS,
    "buttonDown": function(){},
    "buttonUp": function(){},
    "show": showMouse
}
