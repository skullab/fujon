/**
 * THE FUJON JAVASCRIPT FRAMEWORK ! Copyright(c)2005-2012 Released under Apache
 * License Version 2.0, January 2004 (see the license here :
 * http://www.apache.org/licenses/LICENSE-2.0.txt)
 * 
 * Author : ivan[dot]maruca[at]gmail[dot]com <http://fujon.blogspot.com>
 * 
 */

var fujon = {
	version : 'rc5',
	versionCode : '0.5.3',
	revision : '7/11/2012',
	author : 'Ivan Maruca',
	signature : 'debug',
	/* the FUJON tree packages */
	tree : {},
	/* dependencies */
	baseLibrary : 'libs/',
	dependencies : [ 'fujon-error.js', 'fujon-constants.js',
			'fujon-shortcuts.js', 'fujon-core.js' ]
};
/** ************************************************************************ */
/**
 * IMPORT function Used for import inside the HTML document the variables
 * relative to the specified fujon package see API reference for details
 */
function fImport(package) {
	var validate = false;
	for ( var pack in fujon.tree) {
		if (package == fujon[pack]) {
			validate = true;
			break;
		}
	}
	if (validate) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		for ( var module in package) {
			script.text += 'var ' + module + ' = ' + package + '.' + module
					+ ';\n';
		}
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(script);
	} else
		throw ERROR.LIBRARY.package;
}

/**
 * PACKAGE function Used to create a fujon package to store in fujon.tree see
 * API reference for details
 */
var fPackage = {
	create : function(package) {
		if (package.toString() != '[object Object]') {
			fujon[package] = package;
			fujon.tree[package] = package.toString();
		} else
			throw ERROR.LIBRARY.toStringNotOverride;

	}
};

/**
 * LIBs function Used to load js library into HTML document see API reference
 * for details
 */
var fLibs = new function() {

	this.root = '';
	this.file = new Array();
	this.callback = undefined;
	var _this = this;

	var head = document.getElementsByTagName('head')[0];
	var maxStack = 0;
	var currentStack = 0;

	this.reset = function() {
		maxStack = 0;
		currentStack = 0;
		this.file = new Array();
		this.callback = undefined;
	}

	this.iHandler = function(file, callback) {
		if (currentStack == maxStack) {
			if (callback != undefined) {
				setTimeout(callback, 50);
			}
			this.reset();
		} else {
			this.append(file[currentStack]);
		}

	};
	this.fireLoad = function(el) {
		if (window.addEventListener) {
			el.addEventListener('load',
					this.iHandler(this.file, this.callback), false);
		} else if (window.attachEvent) {
			el.attachEvent('onload', this.iHandler(this.file, this.callback));
		}
	};
	this.append = function(file) {
		var lib = document.createElement('script');
		lib.src = this.root + file;
		head.appendChild(lib);
		currentStack++;
		this.fireLoad(lib);
	};

	this.setBaseLibrary = function(root) {
		this.root = root;
	};
	this.getBaseLibrary = function() {
		return this.root;
	};
	this.setCallback = function(callback) {
		this.callback = callback;
	};

	this.load = function(files, callback) {

		if (callback)
			this.callback = callback;

		if (files.constructor == Array) {
			this.file = files;
		} else {
			this.file.push(files);
		}

		maxStack = this.file.length;
		this.append(this.file[0]);
	};

};
/** ************************************************************************ */
(function() {
	var scripts = document.getElementsByTagName('script');
	var mainFile = 'fujon-main-' + fujon.version + '.js';
	var lib ;
	var callback ;
	
	for ( var i = 0; i < scripts.length; i++) {
		if (scripts[i].getAttribute('src') == mainFile) {
			//search for library attribute
			if (scripts[i].getAttribute('library') != undefined) {
				lib = scripts[i].getAttribute('library');
				/*fLibs.setBaseLibrary(fujon.baseLibrary);
				switch (lib) {
				case 'dependencies':
					fLibs.load(fujon.dependencies);
					break;
				default:
					fLibs.load(lib);
				}*/
			}
			//search for callback attribute
			if(scripts[i].getAttribute('callback') != undefined){
				callback = scripts[i].getAttribute('callback') ;
			}
			
			//fire load request
			if(lib){
				
				switch (lib) {
				case 'dependencies':
					fLibs.setBaseLibrary(fujon.baseLibrary);
					if(callback){
						fLibs.load(fujon.dependencies,setTimeout(callback+'()',50));
					}else fLibs.load(fujon.dependencies);
					break;
				default:
					if(callback){
						fLibs.load(lib,setTimeout(callback+'()',50));
					}else fLibs.load(lib);
				}
				
			}
		}
	}
})();
/** ************************************************************************ */
function Ready(callback) {
	if (!callback)
		return;
	document.onreadystatechange = function() {
		if (document.readyState == "complete") {
			callback();
		}
	}
}
/** ************************************************************************ */
