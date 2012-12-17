/* optional option object : abstract,extend,implement
 * -> var MyClass = Class({extend:MyParentClass},{define class here...});
 * -> var MyBaseClass = Class('abstract',{define class here...}); THIS CANNOT BE INSTANTIATED
 * -> var MyCoolClass = Class({extend:MyBaseClass,implement:MyListener},{define class here...});
 * 
 * option for method into your own class : abstract_,static_
 * -> abstract_your_method_name : function(){}
 * -> static_your_method_or_value_name : 'SO COOL'
 * 
 * classic use :
 * -> var MyClass = Class({define class here...});
 */
var fujon = {
	core : {}
}

fujon.core.toArray = function(iterable) {
	var length = iterable.length || 0, results = new Array(length);
	while (length--)
		results[length] = iterable[length];
	return results;
};
fujon.core.keysOf = function(object) {
	if (!(object instanceof Object))
		throw new Error('bad object');
	var keys = [];
	for ( var property in object) {
		keys.push(property);
	}
	return keys;
};
fujon.core.valuesOf = function(object) {
	if (!(object instanceof Object))
		throw new Error('bad object');
	var values = [];
	for ( var property in object) {
		values.push(object[property]);
	}
	return values;
};
fujon.core.isString = function(str) {
	return (typeof (str) == 'string');
};
fujon.core.Primitive = function() {
	return function() {
		return this.constructor.apply(this, arguments);
	};
};
fujon.core.Primitive.prototype.constructor = fujon.core.Primitive;

/*
 * Function.prototype.update = function(array,args){ var arrayLenght =
 * array.length, length = args.length ; while(length--)array[arrayLenght+length] =
 * args[length]; return array ; }; Function.prototype.merge =
 * function(array,args){ array = Array.slice.call(array,0); return
 * update(array,args); }; Function.prototype.bind = function(context){
 * if(arguments.length < 2 && arguments[0] == undefined)return this ; if(typeof
 * this == 'function')throw new Error('THIS OBJECT IS NOT CALLABLE'); var nop =
 * function(){}; var __method = this, args = Array.slice.call(arguments,1); var
 * bound = function(){ var a = merge(args,arguments); var c = this instanceof
 * bound ? this : context ; return __method.apply(c,a); }; nop.prototype =
 * this.prototype ; bound.prototype = new nop(); return bound ; };
 * Function.prototype.wrap = function(wrapper){ var __method = this ; return
 * function(){ var a = update([__method.bind(this)],arguments); return
 * wrapper.apply(this,a); }; };
 */

if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable
			// function
			throw new TypeError(
					"Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function() {
		}, fBound = function() {
			return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
		};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}

fujon.core.Class = function() {

	var optionKeys, optionValues, option = arguments[1] ? fujon.core.toArray(arguments).shift() : null;
	var _class = arguments[1] ? arguments[1] : arguments[0];
	// var _classKeys = fujon.core.keysOf(_class);
	// var _classValues = fujon.core.valuesOf(_class);
	var _finalClass = false;
	var primitive = fujon.core.Primitive();

	// check option : is Object ?
	if (option != null && option instanceof Object) {
		optionKeys = fujon.core.keysOf(option);
		optionValues = fujon.core.valuesOf(option);
	}

	// check if _class exist
	if (_class == null)
		throw new Error('bad class !');

	function subclass() {};
	// check option keys
	if (optionKeys) {
		for ( var value in optionKeys) {
			switch (optionKeys[value]) {
			case 'modifier':
				switch (option.modifier) {
				case 'abstract':
					_class.constructor = function() {
						throw new Error('Abstract Class cannot be instantiated');
					}
					break;
				case 'final':
					_finalClass = true;
					break;
				}
				break;
			case 'extend':
				if (_finalClass)
					throw new Error('Final Class cannot be extended !');
				console.log('class extend -> ');

				subclass.prototype = option.extend.prototype;
				primitive.prototype = new subclass;

				primitive._superClass = option.extend.prototype;
				
				
				/*for ( var property in primitive.prototype) {
					console.log('--------> '+property)
					if (typeof primitive.prototype[property] === 'function') {
						primitive.prototype[property] = subclass.prototype[property].bind(primitive.prototype);
					}
				}*/
				
				primitive.prototype._super = function() {
					
				};

				break;
			case 'implement':
				for ( var property_to_override in option.implement.prototype) {
					if (!_class[property_to_override])
						throw new Error('You must implement the method : '
								+ property_to_override);
				}
				break;
			}
		}
	}

	primitive.addProperty = addProperty;
	primitive.addProperty(_class);

	function addProperty(object) {
		var parent = this._superClass; // && this._superClass.prototype ;
		if (parent && parent._super)
			console.log('parent have super');
		var context = parent && parent._super ? parent.prototype : primitive.prototype;
		var contextHistory = [] ;
		console.log('Have parent ? ->');
		console.log(parent);

		for ( var property in object) {
			var value = object[property];
			if (parent != undefined && parent[property] != undefined && property != 'constructor') {
				console.log('add parent property -> _super.' + property);
				this.prototype._super[property] = function() {
					console.log('call parent ' + property);
					console.log(context);
					return parent[property].apply(context, arguments);
				};
			}
			console.log('add property : ' + property);
			this.prototype[property] = value;
		}
		
		contextHistory.push(context);

		if (parent && parent._super) {
			for ( var sp in parent._super) {
				console.log('parent is subclass and have this property -> '
						+ sp);
				if (sp != 'constructor')
					this.prototype._super[sp] = function() {
						console.log('call super parent ' + property);
						console.log(parent._super);
						return parent[sp].apply(context, arguments);
					};
			}
		}

		if (this.prototype._super != undefined) {
			console.log('super ok');
			var instance = this.prototype ;
			this.prototype._super.constructor = function() {
				console.log('call super constructor');
				console.log(context);
				if(this.context)console.log('gia chiamato');
				var r = parent.constructor.apply(this.context, arguments);
				this.context = instance ;
				return r ;
			};
		};
	};

	primitive.prototype.constructor = _class.constructor;
	delete primitive.addProperty; // this is dangerous !
	console.log('*************PRIMITIVE****************');
	for ( var p in primitive) {
		console.log('-> ' + p);
	}
	console.log('*************PRIMITIVE****************');
	return primitive;

};
fujon.core.Class.prototype = {
	constructor : fujon.core.Class
};