var objc = require('NodObjC');
    objc.import('CoreGraphics');
    objc.import('Cocoa');

function mouseMoveDelta(dx,dy) {
	// get the current location of the mouse
	var pt = objc.NSEvent('mouseLocation');
	objc.CGDisplayMoveCursorToPoint(objc.CGMainDisplayID(),objc.CGPointMake((pt.x + dx), (pt.y + dy)));
}

function mouseMoveABS(x,y) {
	objc.CGDisplayMoveCursorToPoint(objc.CGMainDisplayID(),objc.CGPointMake(x, y));
}

module.exports = {
    "mouseMoveDelta": mouseMoveDelta,
    "mouseMoveABS": mouseMoveABS,
    "mouseDown": function(){},
    "mouseUp": function(){}
}
