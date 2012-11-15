/**
 * THE FUJON JAVASCRIPT FRAMEWORK ! Copyright(c)2005-2012 Released under Apache
 * License Version 2.0, January 2004 (see the license here :
 * http://www.apache.org/licenses/LICENSE-2.0.txt)
 * 
 * Author : ivan[dot]maruca[at]gmail[dot]com <http://fujon.blogspot.com>
 * 
 */

var fujon = {
	versionName : 'rc5',
	versionCode : '0.5.5',
	revision : '15/11/2012',
	author : 'Ivan Maruca',
	signature : 'debug',
	/* the FUJON tree packages */
	tree : {},
	/* dependencies */
	baseLibrary : 'libs/',
	dependencies : [ 'fujon-core.js',
	                 'fujon-error.js', 
	                 'fujon-constants.js',
	                 'fujon-shortcuts.js',  
	                 'fujon-content.js',
	                 'fujon-debug.js' ]
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

	this.root = fujon.baseLibrary;
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
			setTimeout(function(){
				_this.append(file[currentStack]);
			},50);
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
		lib.type = 'text/javascript' ;
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

		if (!files)
			throw new Error('NullPointerError : Error loading library !\n');
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
	var mainFile = 'fujon-main-' + fujon.versionName + '.js';
	var lib;
	var callback;
	var dep = 'dependencies';

	for ( var s = 0; s < scripts.length; s++) {
		if (scripts[s].getAttribute('src').search(mainFile) != -1) {
			// search for library attribute
			if (scripts[s].getAttribute('library') != undefined) {
				lib = scripts[s].getAttribute('library');
			}
			// search for callback attribute
			if (scripts[s].getAttribute('callback') != undefined) {
				callback = scripts[s].getAttribute('callback');
			}

			// fire load request
			/*
			 * if(lib){ switch (lib) { case 'dependencies':
			 * fLibs.setBaseLibrary(fujon.baseLibrary); if(callback){
			 * fLibs.load(fujon.dependencies,setTimeout(callback+'()',50));
			 * }else fLibs.load(fujon.dependencies); break; default:
			 * if(callback){ fLibs.load(lib,setTimeout(callback+'()',50)); }else
			 * fLibs.load(lib); } }
			 */

			var ignoreLib;
			var libToLoad = new Array();

			// new method of fire load request
			if (lib) {
				var libPat = /(([a-zA-Z0-9-]+\/)?)+([a-zA-Z0-9-]+(.js))/gi
				var searchForIgnore = /dependencies\!\((([a-zA-Z0-9-]+(.js)),?)+\)/gi;
				var d = fujon.dependencies;
				var all = lib.match(libPat);

				// search for dependencies
				if (lib.search(dep) != -1) {
					var ignore = lib.match(searchForIgnore);
					if (ignore) {
						ignoreLib = ignore[0].match(libPat);
					} else {
						// nothing to ignore
						ignoreLib = [];
					}

					var checkCounter = 0;

					for ( var i in ignoreLib) {
						var y = fujon.dependencies.indexOf(ignoreLib[i]);
						if (y != -1) {
							checkCounter++
							d.splice(y, 1);
							all.splice(all.indexOf(ignoreLib[i]), 1);
						}
					}
					// error in dependencies ignore declaration !
					if (ignoreLib.length != checkCounter)
						throw new Error(
								'Error in dependencies ignore declaration !'
										+ '\nSee your library definition in <script src="'
										+ scripts[s].getAttribute('src')
										+ '" library="..."');
				} else
					d = null; // no dependencies

				if (d) {
					libToLoad = d ; 
					if(all)libToLoad = d.concat(all); //dependencies + other libraries 
				} else
					libToLoad = all;
			
				if (!libToLoad)
					throw new Error('Error in library declaration !'
							+ '\nSee your library definition in <script src="'
							+ scripts[s].getAttribute('src')
							+ '" library="..."');

				//alert(libToLoad);
				// fire load
				handler = callback ? callback + '()' : undefined;
				fLibs.load(libToLoad, handler);
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
