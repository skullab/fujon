/**
 * THE FUJON JAVASCRIPT FRAMEWORK ! Copyright(c)2005-2012 Released under Apache

 * License Version 2.0, January 2004 (see the license here :
 * http://www.apache.org/licenses/LICENSE-2.0.txt)
 * 
 * Author : ivan[dot]maruca[at]gmail[dot]com <http://fujon.blogspot.com>
 * 
 */

/*----------------------------------------
 CORE
 -----------------------------------------*/
//alert('fire core');  
fujon.core = {
	toString : function() {
		return 'fujon.core';
	},
	typifies : function(type){
		switch (type) {
		case fujon.constants.TYPE.NUMBER:
			return 0 ;
		case fujon.constants.TYPE.STRING:
			return '';
		case fujon.constants.TYPE.BOOLEAN:
			return true;
		case fujon.constants.TYPE.OBJECT:
			return {};
		case fujon.constants.TYPE.FUNCTION:
			return function(){};
		case fujon.constants.TYPE.ARRAY:
			return new Array();
		}
	},
	checkType : function(type, value) {
		var control;
		switch (type) {
		case fujon.constants.TYPE.NUMBER:
			control = 0;
			break;
		case fujon.constants.TYPE.STRING:
			control = '';
			break;
		case fujon.constants.TYPE.BOOLEAN:
			control = true;
			break;
		case fujon.constants.TYPE.OBJECT:
			control = {};
			break;
		case fujon.constants.TYPE.FUNCTION:
			control = function() {
			};
			break;
		}
		if (typeof (value) != typeof (control)) {
			throw ERROR.CORE.IllegalTypeAssignment;
		} else
			return true;
	},
	isString : function(str) {
		return (typeof (str) == 'string');
	},
	isElement : function(element) {
		return !!(element && element.nodeType === 1);
	},
	isText : function(t) {
		return !!(t && t.nodeType == 3);
	},
	isArray : function(obj) {
		return (obj.constructor == Array);
	},
	isFunction : function(func) {
		return (typeof (func) == 'function');
	},
	isObject : function(obj) {
		return (obj instanceof Object);
	},
	offset : {
		top : 0,
		left : 0
	},
	getPosition : function(obj) {
		if (obj.offsetParent) {
			var offset = this.offset;
			do {
				offset.left += obj.offsetLeft;
				offset.top += obj.offsetTop;
			} while (obj = obj.offsetParent);
			return offset;
		}
	},
	getSize : function(obj) {
		var width = obj.width || obj.style.width;
		var height = obj.height || obj.style.height;
		return [ width, height ];
	},
	// TODO sure ??? getScreenSize please !
	getClientSize : function() {
		return [ document.body.clientWidth, document.body.clientHeight ];
	},
	//TODO Mouse broke :-(
	Mouse : {
		toString : function() {
			return 'fujon.core.Mouse';
		},
		position : function() {
			var X = 0;
			var Y = 0;
			if (!e)
				var e = window.event;
			if (e.pageX || e.pageY) {
				X = e.pageX;
				Y = e.pageY;
			} else if (e.clientX || e.clientY) {
				X = e.clientX + document.body.scrollLeft
						+ document.documentElement.scrollLeft;
				Y = e.clientY + document.body.scrollTop
						+ document.documentElement.scrollTop;
			}
			return [ X, Y ];
		},
		getTypeEvent : function(e) {
			var e = window.event || e;
			return e.type;
		}
	}
};
/*----------------------------------------
 CORE
 +> OnDocumentReady
 -----------------------------------------*/
fujon.core.OnDocumentReady = function(callback) {
	document.onreadystatechange = function() {
		if (document.readyState === "complete") {
			callback();
		}
	};
};
/*----------------------------------------
 CORE
 +> Primitive
 -----------------------------------------*/
fujon.core.Primitive = function() {
	return function() {
	};
};
fujon.core.Primitive.prototype = {
	constructor : fujon.core.Primitive
};
/*----------------------------------------
 CORE
 +> Class
 -----------------------------------------*/
fujon.core.Class = function(object) {
	if (object instanceof Object) {
		var primitive = new fujon.core.Primitive();

		for ( var property in object) {
			var tag_property = property.split('$');
			if (tag_property.length > 1) {
				if (tag_property[0] == 'static') {
					primitive[tag_property[1]] = object[property];
				}
			} else {
				if (property == 'constructor') {
					primitive = object.constructor ;
					primitive.prototype = {
						constructor : primitive
					};
					primitive.toString = function() {
						return '[object Class]';
					};
				} else if (property == 'extend') {
					primitive._super = {} ;
					for ( var extend_property in object.extend) {
						if (extend_property != 'constructor') {
							primitive.prototype[extend_property] = object.extend[extend_property];
						}
						primitive._super[extend_property] = object.extend[extend_property];
					}
					
				}else {
					// if(object[property] ==
					// primitive._super[property])alert('override');
					primitive.prototype[property] = object[property];
				}
				if (property == 'toString') {
					primitive.toString = object[property];
				}
			}
		}
		return primitive;
	}
};

fujon.core.Class.prototype = {
	constructor : fujon.core.Class,
	_super : {},
	toString : function() {
		if (this.name) {
			return this.name;
		} else
			return '[object Class]';
	}

};
/*----------------------------------------
 CORE
 +> Interface
 -----------------------------------------*/
fujon.core.Interface = new fujon.core.Class(
		{
			constructor : function(object) {
				if (object instanceof Object) {
					for ( var abstract_property in object) {
						if (abstract_property == 'implement') {
							if (!fujon.core.isArray(object[abstract_property])
									&& object[abstract_property] != '[object Interface]')
								throw ERROR.CORE.InterfaceError ;
							if (fujon.core.isArray(object[abstract_property])) {
								for ( var i = 0; i < object[abstract_property].length; i++) {
									if (object[abstract_property][i] != '[object Interface]')
										alert('error array :' + i);
									for ( var implement_property in new object[abstract_property][i]) {
										this[implement_property] = object[implement_property];
									}
								}
							} else {
								for ( var implement_property in new object[abstract_property]) {
									this[implement_property] = object[implement_property];
								}
							}
						} else
							this[abstract_property] = object[abstract_property];
					}
					
					var _this = this;
					return new fujon.core.Class(
							{
								constructor : function(object) {
									if (object instanceof Object) {
										for ( var implement in object) {
											var check = false;
											for ( var implement_to_override in this) {
												if (implement_to_override != 'constructor'
														&& implement_to_override != 'toString'
														&& implement_to_override != 'implement') {
													if (!object[implement_to_override])
														throw ERROR.CORE.IllegalInterfaceMethod;
													if (implement == implement_to_override) {
														check = true;
													}
													this[implement_to_override] = object[implement_to_override];
												}
											}
											if (!check)
												throw ERROR.CORE.IllegalInterfaceMethod;
										}
									}
								},
								extend : _this,
								toString : function() {
									return '[object Interface]';
								}
							});
				}
			}
		});

/*----------------------------------------
 DEFINE LISTENERS INTERFACE
 -----------------------------------------*/
fujon.core.OnBlurListener = new fujon.core.Interface({
	onBlur : function(element) {
	}
});
fujon.core.OnChangeListener = new fujon.core.Interface({
	onChange : function(element) {
	}
});
fujon.core.OnClickListener = new fujon.core.Interface({
	onClick : function(element, MouseEvent) {
	}
});
fujon.core.OnDoubleClickListener = new fujon.core.Interface({
	onDblClick : function(element) {
	}
});
fujon.core.OnErrorListener = new fujon.core.Interface({
	onError : function(element) {
	}
});
fujon.core.OnFocusListener = new fujon.core.Interface({
	onFocus : function(element) {
	}
});
fujon.core.OnKeyDownListener = new fujon.core.Interface({
	onKeyDown : function(element) {
	}
});
fujon.core.OnKeyUpListener = new fujon.core.Interface({
	onKeyUp : function(element) {
	}
});
fujon.core.OnKeyPressListener = new fujon.core.Interface({
	onKeyPress : function(element) {
	}
});
fujon.core.OnLoadListener = new fujon.core.Interface({
	onLoad : function(element) {
	}
});
fujon.core.OnUnloadListener = new fujon.core.Interface({
	onUnload : function(element) {
	}
});
fujon.core.OnMouseDownListener = new fujon.core.Interface({
	onMouseDown : function(element) {
	}
});
fujon.core.OnMouseMoveListener = new fujon.core.Interface({
	onMouseMove : function(element) {
	}
});
fujon.core.OnMouseOutListener = new fujon.core.Interface({
	onMouseOut : function(element) {
	}
});
fujon.core.OnMouseOverListener = new fujon.core.Interface({
	onMouseOver : function(element) {
	}
});
fujon.core.OnMouseUpListener = new fujon.core.Interface({
	onMouseUp : function(element) {
	}
});
fujon.core.OnResizeListener = new fujon.core.Interface({
	onResize : function(element) {
	}
});
fujon.core.OnSelectListener = new fujon.core.Interface({
	onSelect : function(element) {
	}
});
// listener group
// MOUSE GROUP
fujon.core.MouseListener = new fujon.core.Interface({
	implement : [ fujon.core.OnClickListener, fujon.core.OnDoubleClickListener,
			fujon.core.OnMouseDownListener, fujon.core.OnMouseMoveListener,
			fujon.core.OnMouseOutListener, fujon.core.OnMouseOverListener,
			fujon.core.OnMouseUpListener ]
});
// LOADER GROUP
fujon.core.LoaderListener = new fujon.core.Interface({
	implement : [ fujon.core.OnErrorListener, fujon.core.OnLoadListener,
			fujon.core.OnUnloadListener ]
});
// KEYBOARD GROUP
fujon.core.KeyboardListener = new fujon.core.Interface({
	implement : [ fujon.core.OnKeyDownListener, fujon.core.OnKeyPressListener,
			fujon.core.OnKeyUpListener ]
});
/*----------------------------------------
 CORE
 +> ListenerManager
 -----------------------------------------*/
fujon.core.ListenerManager = new function() {

	/**
	 * Check for valid listener interface
	 */
	this.checkListener = function(listener) {
		return (listener != null && listener == '[object Interface]');
	};
	/**
	 * Add Listener to an Element Return true if add or false otherwise
	 */
	this.addListener = function(elem, type, exp, state) {
		// state true = capture o false = bubbling (default)
		var state = state || false;
		//if (!fujon.core.Element.isValidElement(elem))throw ERROR.CORE.IllegalTypeAssignment ;
		if (window.addEventListener) {
			elem.addEventListener(type, exp, state);
			return true;
		} else if (window.attachEvent) {
			elem.attachEvent('on' + type, exp);
			return true;
		} else
			return false;
	};
	this.removeListener = function(elem, type, exp, state) {
		var state = state || false;
		if (!fujon.core.Element.isValidElement(elem))
			throw ERROR.CORE.IllegalTypeAssignment ;
		if (window.removeEventListener) {
			elem.removeEventListener(type, exp, state);
			return true;
		} else if (window.detachEvent) {
			elem.detachEvent('on' + type, exp);
			return true;
		} else
			return false;
	};
};
/*----------------------------------------
 CORE
 +> Element
 -----------------------------------------*/
fujon.core.Element = new fujon.core.Class(
		{
			constructor : function(type) {

				this.typeElement = null;
				this.elementObject = null;
				this.isAppend = false;
				this.appendChildNode = null;
				this.appendParentNode = null;
				this.create(type);

				// Listeners
				this.blurListener = this.changeListener = this.clickListener = this.dblclickListener = this.errorListener = this.focusListener = this.keydownListener = this.keypressListener = this.keyupListener = this.loadListener = this.mousedownListener = this.mousemoveListener = this.mouseoutListener = this.mouseoverListener = this.mouseupListener = this.resizeListener = this.selectListener = this.unloadListener = null;
			},
			getElementType : function() {
				return this.typeElement;
			},
			getElementObject : function() {
				return this.elementObject;
			},
			clone : function(obj) {
				if (obj instanceof fujon.core.Element) {
					this.elementObject = obj.elementObject.cloneNode(true);
					for ( var property in obj) {
						if (!fujon.core.isFunction(obj[property])) {
							if (property != 'elementObject') {
								this[property] = obj[property];
							}

							if (property.search('Listener') != -1) {
								if (this[property] != null) {
									var listener = property.substr(0, 1)
											.toUpperCase()
											+ property.substr(1);
									var setter = 'setOn' + listener;
									this[setter](this[property]);
								}
							}

						}
					}
				} else
					throw ERROR.CORE.IllegalTypeAssignment;

				return this;
			},
			create : function(type) {
				if (type != null) {
					if (!fujon.core.isString(type))
						throw ERROR.CORE.IllegalTypeAssignment;
					this.typeElement = type;
					this.elementObject = document
							.createElement(this.typeElement);
				}
			},
			appendTo : function(targetNode) {
				if (fujon.core.Element.isValidElement(targetNode)) {
					this.appendParentNode = targetNode;
					targetNode.appendChild(this.elementObject);
				} else
					throw ERROR.CORE.IllegalTypeAssignment;
			},
			appendChild : function(child) {
				if (fujon.core.Element.isValidElement(child)) {
					this.elementObject.appendChild(child);
				} else
					throw ERROR.CORE.IllegalTypeAssignment;
			},
			appendText : function(text) {
				if (fujon.core.isText(text)) {
					this.elementObject.appendChild(text);
				} else
					throw ERROR.CORE.IllegalTypeAssignment;
			},
			static$isValidElement : function(elem) {
				return (elem != null && (fujon.core.isElement(elem) || elem instanceof fujon.core.Element));
			},
			createText : function(txt) {
				if (fujon.core.isString(txt)) {
					var textNode = document.createTextNode(txt);
					this.appendText(textNode);
				}
			},
			setAttribute : function() {
				var argNum = arguments.length;
				switch (argNum) {
				case 1:
					if (fujon.core.isObject(arguments[0])) {
						for ( var name in arguments[0]) {
							if (!fujon.core.isString(arguments[0][name]))
								throw ERROR.CORE.IllegalTypeAssignment;
							this.elementObject.setAttribute(name,
									arguments[0][name]);
						}
					} else
						throw ERROR.CORE.IllegalTypeAssignment;
					break;
				case 2:
					if (fujon.core.isString(arguments[0])
							&& fujon.core.isString(arguments[1])) {
						this.elementObject.setAttribute(arguments[0],
								arguments[1]);
					} else
						throw ERROR.CORE.IllegalTypeAssignment;
				}

			},
			getAttribute : function(attr) {
				if (!fujon.core.isString(attr))
					throw ERROR.CORE.IllegalTypeAssignment;
				return this.elementObject.getAttribute(attr);
			},
      static$convert : function(obj){
        if(fujon.core.isElement(obj)){
          var converted = new fujon.core.Element(obj.tagName);
          converted.elementObject = obj ;
          return converted ;
        }
        return null ;
      },
			// ONLOAD ONLY !
			static$HTML : document.getElementsByTagName('html')[0],
			static$BODY : document.getElementsByTagName('body')[0],
			static$HEAD : document.getElementsByTagName('head')[0],
			static$TITLE : document.getElementsByTagName('title')[0],

			// Setter - Listeners
			setOnBlurListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.blurListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'blur', function(e) {
								_this.blurListener.onBlur(_this, e);
							});
				}
			},
			setOnChangeListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.changeListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'change', function(e) {
								_this.changeListener.onChange(_this, e);
							});
				}
			},
			setOnClickListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.clickListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'click', function(e) {
								_this.clickListener.onClick(_this, e);
							});
				}
			},
			setOnDoubleClickListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.dbclickListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'dblclick', function(e) {
								_this.dblclickListener.onDblClick(_this, e);
							});
				}
			},
			setOnErrorListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.errorListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'error', function(e) {
								_this.errorListener.onError(_this, e);
							});
				}
			},
			setOnFocusListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.focusListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'focus', function(e) {
								_this.focusListener.onFocus(_this, e);
							});
				}
			},
			setOnKeyDownListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.keydownListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'keydown', function(e) {
								_this.keydownListener.onKeyDown(_this, e);
							});
				}
			},
			setOnKeyPressListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.keypressListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'keypress', function(e) {
								_this.keypressListener.onKeyPress(_this, e);
							});
				}
			},
			setOnKeyUpListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.keyupListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'keyup', function(e) {
								_this.keyupListener.onKeyUp(_this, e);
							});
				}
			},
			setOnLoadListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.loadListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'load', function(e) {
								_this.loadListener.onLoad(_this, e);
							});
				}
			},
			setOnUnloadListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.unloadListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'unload', function(e) {
								_this.unloadListener.onUnload(_this, e);
							});
				}
			},
			setOnMouseDownListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.mousedownListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'mousedown', function(e) {
								_this.mousedownListener.onMouseDown(_this, e);
							});
				}
			},
			setOnMouseUpListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.mouseupListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'mouseup', function(e) {
								_this.mouseupListener.onMouseUp(_this, e);
							});
				}
			},
			setOnMouseOutListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.mouseoutListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'mouseout', function(e) {
								_this.mouseoutListener.onMouseOut(_this, e);
							});
				}
			},
			setOnMouseOverListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.mouseoverListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'mouseover', function(e) {
								_this.mouseoverListener.onMouseOver(_this, e);
							});
				}
			},
			setOnMouseMoveListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.mousemoveListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'mousemove', function(e) {
								_this.mousemoveListener.onMouseMove(_this, e);
							});
				}
			},
			setOnResizeListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.resizeListener = listener;
					var _this = this;
					fujon.core.ListenerManager.addListener(this.elementObject,
							'resize', function(e) {
								_this.resizeListener.onResize(_this, e);
							});
				}
			},
			setOnSelectListener : function(listener) {
				if (fujon.core.ListenerManager.checkListener(listener)) {
					this.selectListener = listener;
					var _this = this;
					fujon.core.ListenerManager
							.addListener(this.elementObject, 'select',
									function(e) {
										var selection = window.getSelection
												|| document.getSelection;
										if (!selection && document.selection)
											selection = function() {
												return document.selection
														.createRange().text ;
											};
										if (!selection)
											selection = function() {
												return null ;
											};
										_this.selectListener.onSelect(_this,
												selection(), e);
									});
				}
			},
			toString : function() {
				if (this.elementObject != null) {
					return this.elementObject.toString();
				}
				return '[object Element]';
			}
		});
/*----------------------------------------
 CORE
 +> Pointer
 -----------------------------------------*/
fujon.core.Pointer = new fujon.core.Class({
	constructor : function() {
	},
	objects : [],
	get : function(obj) {
		if (isNaN(obj)) {
			for (var i = 0; i < this.ojects.length; i++) {
				if (this.objects[i] == obj)
					return this.objects[i];
			}
		} else
			return this.objects[obj];
		return false;
	},
	set : function(obj, index) {
		if (index == undefined) {
			this.objects.push(obj);
			return (this.objects.length - 1);
		} else {
			this.objects[index] = obj;
		}
	},
	empty : function() {
		for (var i = 0; i < this.objects.length; i++) {
			if (!this.objects[i])
				return i;
		}
		return this.objects.length;
	},
	reset : function() {
		this.objects = [];
	},
	erase : function(obj) {
		for (var i = 0; i < this.objects.length; i++) {
			if (this.objects[i] == obj) {
				if (i != 0 && i < (this.objects.length - 1)) {
					var arrayEnd = this.objects.slice(i).shift();
					var arrayStart = this.objects.slice(0, i);
					this.objects = arrayStart.concat(arrayEnd);
					return true;
				} else if (i == 0) {
					this.objects.shift();
					return true;
				} else if (i == (this.objects.length - 1)) {
					this.objects.pop();
					return true;
				}
			}
		}
		return false;
	}
});
/*----------------------------------------
 CORE
 +> thread
 -----------------------------------------*/
fujon.core.thread = {
	toString : function() {
		return 'fujon.core.thread';
	},
	/**
	 * WAIT singleton object Usage : return WAIT.set(milliseconds) Use this only
	 * inside a Thread
	 */
	WAIT : new function() {
		var _this = this;
		this.set = function(mls) {
			this.milliseconds = mls;
			return _this;
		};
	},
	START : {
		toString : function() {
			return '[object START]' ;
		}
	},
	CONTINUE : {
		toString : function() {
			return '[object CONTINUE]' ;
		}
	},
	STOP : {
		toString : function() {
			return '[object STOP]' ;
		}
	},
	KILL : {
		toString : function() {
			return '[object KILL]' ;
		}
	},
	Generator : function(maxStack) {
		var cursor = 0;
		return {
			next : function() {
				if (isNaN(maxStack))
					return maxStack;
				if (cursor < maxStack) {
					return (cursor += 1);
				} else
					throw ERROR.GENERATOR.StopIteration;
			},
			set : function(value) {
				if (value != null)
					maxStack = value;
			},
			send : function(value) {
				if (value != null)
					cursor = value;
				return this.next();
			},
			hasNext : function() {
				try {
					this.next() ;
					cursor -= 1;
					return true;
				} catch (e) {
					return false;
				}
			},
			_throw : function(error, msg) {
				if (error) {
					throw new error(msg);
				} else
					throw ERROR.GENERATOR._throw;
			}
		};
	},
	Runnable : new fujon.core.Interface({
		run : function() {
		}
	}),
	Thread : function(obj) {
		var alreadyStarted = false;
		this.runnable = {};
		this.onceWait = false ;
		this.tempo = null ;
		
		if (obj instanceof fujon.core.thread.Runnable) {
			this.runnable = obj;
		} else if (typeof (obj) == 'function') {
			this.runnable.run = obj;
		} //else throw ERROR.THREAD.notRunnable;

		this.isStarted = function() {
			if (!alreadyStarted) {
				alreadyStarted = true;
				return false;
			}
			return alreadyStarted;
		};
	}
};
fPackage.create(fujon.core.thread);
/*----------------------------------------
 CORE
 +> thread
 		+> Thread
 -----------------------------------------*/
fujon.core.thread.Thread.prototype = {
	constructor : fujon.core.thread.Thread,
	stop : function() {
		this.isStopped = true;
		clearInterval(this.tempo);
		this.tempo = null;
		return;
	},
	start : function() {
		if (!this.isStarted()) {
			if(!this.runnable.run)throw ERROR.THREAD.notRunnable ;
			this.run(this.runnable);
			return this;
		} else
			throw ERROR.THREAD.IllegalThreadStateException;
	},
	setRunnable : function(runnable){
		this.constructor(runnable);
	},
	run : function(runnable) {
		var _this = this;
		this.tempo = setInterval(function() {
			try {
				_this.isStopped = false;
				var callback = runnable.run();
				
				switch(callback){
				case STOP :
					_this.stop();
					break;
				case WAIT :
					clearInterval(_this.tempo);
					_this.onceWait = _this.onceWait || true ;
					_this.tempo = setTimeout(function() {
						_this.run(runnable);
					}, callback.milliseconds);
					break;
				case CONTINUE:
					break;
				case KILL:
					clearInterval(_this.tempo);
					break;
				default:
					_this.stop();
				}
				
			} catch (e) {
				if (e == ERROR.GENERATOR.StopIteration) {
					clearInterval(_this.tempo);
					return;
				} else
					throw e;
			}
		}, 0);

	}
};

fPackage.create(fujon.core);
