/*fujon.core.Class2 = function(object){
	if(object instanceof Object){
		var primitive = new fujon.core.Primitive();

		for(var property in object){
			console.log('property -> '+property);
			var tag_property = property.split('$');
			if (tag_property.length > 1) {
				if (tag_property[0] == 'static') {
					primitive[tag_property[1]] = object[property];
				}
			}else{
				switch(property){
				case 'extend':
					console.log(object.extend.prototype);
					if(!primitive._super){
						primitive.prototype._super = {} ;
					}
					for(var extend_property in object.extend.prototype){
						console.log('extend property -> '+extend_property);
					    primitive.prototype[extend_property] = object.extend.prototype[extend_property] ;
						primitive.prototype._super[extend_property] = object.extend.prototype[extend_property] ;
					}
					primitive.prototype._super.constructor = function(){
						object.extend.prototype.constructor.apply(primitive.prototype,arguments);
					};
					break;
				case 'constructor':
					primitive = object.constructor ;
					break;
				case 'toString':
					console.log('------toString-----');
					primitive.toString = object.toString ;
					break;
				default:
					console.log('------default-----');
					primitive.prototype[property] = object[property];
					primitive.toString = function(){
						return '[object Class]' ;
					};
				}
			}
		}
		
		return primitive ;
		
	}else throw ERROR.CORE.IllegalTypeAssignment ;
};

fujon.core.Class2.prototype.constructor = fujon.core.Class2 ; */
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype

(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class2 = function(){};
  
  // Create a new Class that inherits from this class
  Class2.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class2() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class2.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class2.prototype.constructor = Class;

    // And make this class extendable
    Class2.extend = arguments.callee;
    
    return Class2;
  };
})();

