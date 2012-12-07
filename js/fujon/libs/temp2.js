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
		this.constructor.apply(this,arguments);
	};
};
fujon.core.Primitive.prototype.constructor = fujon.core.Primitive;

fujon.core.Class = function() {

	var optionKeys, optionValues, option = arguments[1] ? fujon.core.toArray(arguments).shift() : null;
	var _class = arguments[1] ? arguments[1] : arguments[0];
	var _classKeys = fujon.core.keysOf(_class);
	var _classValues = fujon.core.valuesOf(_class);
	var primitive = fujon.core.Primitive();

	// check option : is Object ?
	if (option != null && option instanceof Object) {
		optionKeys = fujon.core.keysOf(option);
		optionValues = fujon.core.valuesOf(option);
	}

	// check if _class exist
	if (_class == null)
		throw new Error('bad class !');
	
	function transfer(){};
	// check option keys
	if (optionKeys) {
		for(var value in optionKeys){
			switch(optionKeys[value]){
			case 'type' :
				if (option.type == 'abstract'){
					_class.constructor = function(){
						throw new Error('Abstract Class cannot be instantiated');
					}
				}
				break;
			case 'extend':
				transfer.prototype = option.extend.prototype ;
				//var tmp = transfer.prototype.constructor ;
				//transfer.prototype.constructor = function(){} ;
				primitive.prototype = new transfer ;
				primitive._superClass = option.extend.prototype ;
				primitive.prototype._super = {} ;
				//primitive.prototype.constructor = tmp ;
				break;
			case 'implement':
				for(var property_to_override in option.implement.prototype){
					if(!_class[property_to_override])throw new Error('You must implement the method : '+property_to_override);
				}
				break;
			}
		}
	}
	
	primitive.addProperty = addProperty ;
	primitive.addProperty(_class);
	
	function addProperty(object){
		for(var property in object){
			if(this._superClass && this._superClass[property])
		}
		this.prototype[name] = value ;
	}
	
	primitive.prototype.constructor = _class.constructor ;
	return primitive ;

};
fujon.core.Class.prototype = {
	constructor : fujon.core.Class
};