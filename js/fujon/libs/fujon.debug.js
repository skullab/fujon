/**
 * THE FUJON JAVASCRIPT FRAMEWORK ! Copyright(c)2005-2012 Released under Apache
 * License Version 2.0, January 2004 (see the license here :
 * http://www.apache.org/licenses/LICENSE-2.0.txt)
 * 
 * Author : ivan[dot]maruca[at]gmail[dot]com <http://fujon.blogspot.com>
 * 
 */

/*----------------------------------------
DEBUG
-----------------------------------------*/
// alert('fire debug');
fujon.debug = {
	toString : function() {
		return 'fujon.debug';
	}
};

fujon.debug.Console = new fujon.core.Class(
		{
			constructor : function() {
				this.activateConsole();
				this.blurforced = false;
			},
			initialize : function() {
				this.console = window
						.open('', fujon.constants.CONSOLE.NAME,
								'location=no,menubar=no,status=no,titlebar=no,toolbar=no');
				this.console.resizeTo(screen.width, 210);
				this.console.moveTo(0, screen.height - 210);
				this.console.document.write(this.UI);
			},
			UI : '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Fujon Output Console</title>'
					+ '<style type="text/css">'
					+ '.info{font:10px monospace;width:100%;margin-bottom:5px;}'
					+ '.board{font:12px monospace;width:100%;height:100px;overflow:auto;}'
					+ '.optionbar{font:12px monospace;position:relative;float:right;top:-20px}'
					+ 'span.date{color:#666666;}'
					+ 'span.w_msg{color:#b26e03;}'
					+ 'span.e_msg{color:#b21602;}'
					+ 'span.d_msg{color:#019db2;}'
					+ 'span.v_msg{color:#000000;}'
					+ 'span.filter_e,span.filter_w,span.filter_d,span.filter_v{color:#ff0000;cursor:pointer;}'
					+ '</style>'
					+ '<script>'
					+ 'var filters = new Array(4);'
					+ 'filters["e"] = filters["w"] = filters["d"] = filters["v"] = 1 ;'
					+ 'function flush(t,s,m){'
					+ ' var f = s.split("_")[0] ;'
					+ ' if(!filters[f])return;'
					+ '	var board = document.getElementById(\'board\');'
					+ '	board.innerHTML += \'<span class="date">\'+t+\' : '
					+ ' 	</span><span class="\'+s+\'">\'+m+\'</span><br>\';'
					+ '	board.scrollTop = board.scrollHeight ;'
					+ '};'
					+ 'function filter(f){'
					+ ' filters[f] = filters[f] ? 0 : 1 ;'
					+ ' var el = document.getElementById("filter_"+f);'
					+ ' if(el.style.color == "rgb(255, 0, 0)" || el.style.color == ""){'
					+ '   el.style.color = "rgb(102,102,102)" ;'
					+ ' }else{'
					+ '   el.style.color = "rgb(255, 0, 0)" ;'
					+ ' }'
					+ '};'
					+ '</script>'
					+ '</head><body>'
					+ '<div id="info" class="info">Console ver '
					+ fujon.versionCode
					+ '</div>'
					+ '<div id="optionbar" class="optionbar">Filter : '
					+ '<span id="filter_e" class="filter_e" onclick="filter(\'e\')">[E]</span>'
					+ '<span id="filter_w" class="filter_w" onclick="filter(\'w\')">[W]</span>'
					+ '<span id="filter_d" class="filter_d" onclick="filter(\'d\')">[D]</span>'
					+ '<span id="filter_v" class="filter_v" onclick="filter(\'v\')">[V]</span>'
					+ '</div>'
					+ '<div id="board" class="board"></div>'
					+ '</body></html>',
			close : function() {
				this.console.close();
			},
			verify : function() {
				// safe debug mode
				return (fujon.signature == fujon.constants.SIGNATURE.DEBUG);
			},
			log : function(m, type) {
				var msg = m.toString();
				if (!this.activateConsole())
					return;
				var msgStyle;

				switch (type) {
				case 'e':
					msgStyle = 'e_msg';
					break;
				case 'w':
					msgStyle = 'w_msg';
					break;
				case 'd':
					msgStyle = 'd_msg';
					break;
				case 'v':
					msgStyle = 'v_msg';
					break;
				default:
					msgStyle = 'd_msg';
				}

				msg = msg.replace(/(<br>)/gi, '<br>+------------> ');
				// var now = new Date();
				// var timestamp =
				// now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+':'+now.getMilliseconds()
				// ;
				this.console.flush(fujon.system.getTimeStamp(), msgStyle, msg);
			},
			forceBlur : function(v) {
				this.blurforced = v;
			},
			deactivateConsole : function() {
				if (this.console) {
					this.console.close();
				}
			},
			activateConsole : function() {
				// safe debug mode
				if (!this.verify())
					return false;
				if (!this.console || this.console.closed) {
					this.initialize();
				}
				if (!this.blurforced)
					this.console.focus();
				return true;
			},
			static$E : 'e',
			static$W : 'w',
			static$V : 'v',
			static$D : 'd'
		});

fujon.debug.Logger = new fujon.core.Class(
		{
			constructor:function(n){
				this.name = n ;
			},
			static$enabled : (fujon.signature == fujon.constants.SIGNATURE.DEBUG) ? true
					: false,
			static$globalTag : '',
			static$setGlobalTag : function(t) {
				fujon.debug.Logger.globalTag = t;
			},
			localTag : '',
			setLocalTag : function(t) {
				this.localTag = t;
			},
			clearLocalTag:function(){
				this.localTag = '' ;
			},
			static$group : function(g) {
				console.group(g);
			},
			static$groupEnd : function() {
				console.groupEnd();
			},
			static$enable : function(b) {
				fujon.debug.Logger.enabled = b;
			},
			static$getLogger:function(n){
				return new fujon.debug.Logger(n);
			},
			l : function() {
				if (fujon.debug.Logger.enabled) {
					var t = arguments[1] ? arguments[0] : ((this.localTag != '')? this.localTag : fujon.debug.Logger.globalTag);
					var m = arguments[1] || arguments[0];
					var d = fujon.system.getTimestamp();
					console.log(d, ' ', t, ' : ', m);
				}
			},
			i : function() {
				if (fujon.debug.Logger.enabled) {
					var t = arguments[1] ? arguments[0] : ((this.localTag != '')? this.localTag : fujon.debug.Logger.globalTag);
					var m = arguments[1] || arguments[0];
					var d = fujon.system.getTimestamp();
					console.info(d, ' ', t, ' : ', m);
				}
			},
			d : function() {
				if (fujon.debug.Logger.enabled) {
					var t = arguments[1] ? arguments[0] : ((this.localTag != '')? this.localTag : fujon.debug.Logger.globalTag);
					var m = arguments[1] || arguments[0];
					var d = fujon.system.getTimestamp();
					console.debug(d, ' ', t, ' : ', m);
				}
			},
			w : function() {
				if (fujon.debug.Logger.enabled) {
					var t = arguments[1] ? arguments[0] : ((this.localTag != '')? this.localTag : fujon.debug.Logger.globalTag);
					var m = arguments[1] || arguments[0];
					var d = fujon.system.getTimestamp();
					console.warn(d, ' ', t, ' : ', m);
				}
			},
			e : function() {
				if (fujon.debug.Logger.enabled) {
					var t = arguments[1] ? arguments[0] : ((this.localTag != '')? this.localTag : fujon.debug.Logger.globalTag);
					var m = arguments[1] || arguments[0];
					var d = fujon.system.getTimestamp();
					console.error(d, ' ', t, ' : ', m);
				}
			}
		});

/*fujon.debug.Logger = new function() {

	this.tag = '';
	var run = (fujon.signature == fujon.constants.SIGNATURE.DEBUG) ? true
			: false;

	this.setTag = function(t) {
		this.tag = t;
	};
	this.getTag = function() {
		return this.tag;
	};
	this.enable = function(v) {
		run = v;
	};
	this.getLogger = function(n) {
		_this = this;
		_this.name = n;
		return _this;
	};
	this.group = function(n) {
		console.group(n);
	};
	this.groupEnd = function() {
		console.groupEnd();
	};
	
	this.l = function() {
		if (run) {
			var t = arguments[1] ? arguments[0] : this.tag;
			var m = arguments[1] || arguments[0];
			var d = fujon.system.getTimestamp();
			console.log(d, ' ', t, ' : ', m);
		}
	};
	this.d = function() {
		if (run) {
			var t = arguments[1] ? arguments[0] : this.tag;
			var m = arguments[1] || arguments[0];
			var d = fujon.system.getTimestamp();
			console.debug(d, ' ', t, ' : ', m);
		}
	};
	this.i = function() {
		if (run) {
			var t = arguments[1] ? arguments[0] : this.tag;
			var m = arguments[1] || arguments[0];
			var d = fujon.system.getTimestamp();
			console.info(d, ' ', t, ' : ', m);
		}
	};
	this.w = function() {
		if (run) {
			var t = arguments[1] ? arguments[0] : this.tag;
			var m = arguments[1] || arguments[0];
			var d = fujon.system.getTimestamp();
			console.warn(d, ' ', t, ' : ', m);
		}
	};
	this.e = function() {
		if (run) {
			var t = arguments[1] ? arguments[0] : this.tag;
			var m = arguments[1] || arguments[0];
			var d = fujon.system.getTimestamp();
			console.error(d, ' ', t, ' : ', m);
		}
	};
};*/

fPackage.create(fujon.debug);