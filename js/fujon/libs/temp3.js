<<<<<<< HEAD
var fujon = {
  core: {}
};

fujon.core.Class = function(){
  
  var option = arguments[1] ? arguments[0] : null ;
  var _class = option ? arguments[1] : arguments[0] ;
  if(!_class) throw new Error('Bad Class implementation');
  
  engine(extractOption(option),_class);
  
  function extractOption(o){
    if(!o || !(o instanceof Object))return null;
    var keys = [] ;
    for(var p in o){
      keys.push(p);
    }
    return keys ;
  };
  
  function engine(k,c){
    
  };
  function subclass(){};
  function modifier(m){};
  function extend(parent){};
  function implement(i){};
  function addClass(obj){};
  
};


=======
var fujon = {
	core : {}
}

// ********************************************
function log() {
	var LINE = '--------------------------------------------------------';
	if (!log.enable)
		return;
	var tab = ' ';
	var v = '';
	v = (arguments[0] == 'ls') ? LINE : arguments[0];
	console.log('*', v);

	for ( var i = 1; i < arguments.length; i++) {
		v = arguments[i];
		v = v == 'ls' ? LINE : v;
		console.log(tab, v);
		tab += ' ';
	}
};
// ********************************************
log.enable = true;
// ********************************************
fujon.core.Class = function() {

	var option = arguments[1] ? arguments[0] : null;
	var _class = option ? arguments[1] : arguments[0];

	var EXTEND = 'extend';
	var ABSTRACT = 'abstract';
	var FINAL = 'final';
	var IMPLEMENT = 'implement';
	var MODIFIER = 'modifier';
	var test = /(extend|implement|modifier)/;

	// the primitive function of every Class
	function primitive() {
		this.constructor.apply(this, arguments);
	};
	// function support for inheritance
	function subclass() {};

	log('ls', 'START CLASS ENGINE');
	primitive.engine = engine;
	primitive.inflate = inflate;
	primitive.extend = extend;
	primitive.modifier = modifier;
	primitive.implement = implement;

	// start engine !
	return primitive.engine(extractOption(option), _class);

	// *********************************************************************************************************************
	// extract option
	function extractOption(o) {
		if (!o || !(o instanceof Object))
			return null;
		var keys = [];
		for ( var k in o) {
			keys.push(k);
		}
		return keys;
	}
	;

	// apply modifier
	function modifier(m) {
		switch (m) {
		case ABSTRACT:
			_class.constructor = function() {
				throw new Error('Abstract Class cannot be instantiated');
			};
			break;
		case FINAL:
			this.finalClass = true ;
			break;
		}
	}
	;

	// inheritance
	function extend(parent) {
		if(parent.finalClass)throw new Error('Final Class cannot be extended !');
		subclass.prototype = parent.prototype;
		this.prototype = new subclass;
		this.superClass = parent;
		this.prototype._super = _super;
		this.prototype._superCall = _superCall ;
		
		var keys = [];
		for ( var p in this.prototype) {
			keys.push(p);
		}
		log('-> ' + keys);
	}
	;

	// check for implementation interface
	function implement(i) {
		for ( var p in i.prototype) {
			if (typeof i.prototype[p] == 'function')
				if (!_class[p])
					throw new Error('You must implement the method : ' + p);
		}
	}
	;

	function checkSuperParent(parent){
		var reg = /this._super\([a-zA-Z0-9,*'*]+\) *;/ ;
		var isCommented = /(\/\/|\/\*|\/\*\*|\*) *this._super\([a-zA-Z0-9,*'*]+\) *;/ ;
		log(isCommented);
		if(isCommented.test(parent.constructor))return false;
		var c = reg.exec(parent.constructor);
		if(c)return c ;
		return false;
	};
	
	function checkSuperMethod(parent,method){
		var reg = /this._superCall\([a-zA-Z0-9,*'*]+\) *;/ ;
		var isCommented = /(\/\/|\/\*|\/\*\*|\*) *this._superCall\([a-zA-Z0-9,*'*]+\) *;/ ;
		log(isCommented);
		if(isCommented.test(parent[method]))return false;
		var c = reg.exec(parent[method]);
		if(c)return c ;
		return false;
	};
	
	// call super constructor
	function _super() {
		log('call super');
		
		var firstClass = primitive.superClass , check = false , _this = this , r , _return ;
		
		while(!check){
			if(firstClass.superClass){
				if(r = checkSuperParent(firstClass.prototype)){
					var fn = r.input.replace(r[0],'');
					var reconstruct = new Function('return '+fn);
					log(reconstruct);
					_return = reconstruct().apply(this,arguments);
				}else {
					log('no super call inside parent constructor !');
					check = true ;
					break;
				}
				log('parent have super class');
				firstClass = firstClass.superClass ;
			}else check = true ;
		}
		
		var parent = firstClass.prototype ;
		
		this._super.to = function(method) {
			arguments = Array.prototype.slice.call(arguments, 1);
			return parent[method].apply(_this, arguments);
		};
		
		//log(constructors);
		return parent.constructor.apply(this, arguments);
	};
	
	// call super method by name
	function _superCall(method){
		log('call super method '+method);
		var args = Array.prototype.slice.call(arguments, 1) , check = false , r , _return ;
	    ___parent = primitive.superClass ;
	    
		
		while(!check){
			if(___parent.superClass){
				if(r = checkSuperMethod(___parent.prototype,method)){					
					//var rr = r[0].replace('this._superCall','___parent.prototype._superCall');
					var fn = r.input.replace(r[0],'');
					var rec = new Function('return '+fn);
					log(rec());
					_return = rec().apply(this,args);
				}else {
					check = true ;
					break;
				}
				___parent = ___parent.superClass ;
			}else check = true ;
		}
		
		var parent = ___parent.prototype ;
		log('have return',_return);
		if(_return)return _return ;
		return parent[method].apply(this, arguments);
	}

	// inflate values into primitive
	function inflate(obj) {
		var stamp = [];
		for ( var p in obj) {
			stamp.push(p);
			var value = obj[p];
			this.prototype[p] = value;
		}
		log('inflate primitive', '-> ' + stamp);
	}
	;

	// the main function of Class
	function engine(k, c) {

		for ( var p in c) {
			if (test.test(p)) {
				k = extractOption(option = c);
				c = {};
				break;
			}
		}

		log('option : ', k);
		log('class', c);

		if (c == null || !(c instanceof Object))
			throw new Error(
					'Bad Class implementation : Class must be an Object');

		for ( var key in k) {
			var v = k[key];
			switch (v) {
			case EXTEND:
				log('processing option...', v);
				this.extend(option.extend);
				break;
			case MODIFIER:
				log('processing option...', v);
				this.modifier(option.modifier);
				break;
			case IMPLEMENT:
				log('processing option...', v);
				this.implement(option.implement);
				break;
			}
		}

		this.inflate(c);
		log('END CLASS ENGINE', 'ls');
		return this;
	}
	;
};

fujon.core.Interface = function(obj){
	var _interface = fujon.core.Class({});
	for(var p in obj){
		_interface.prototype[p] = obj[p] ;
	}
};
>>>>>>> f9aaea1baaf2009e1b42064bd5919a418376431f
