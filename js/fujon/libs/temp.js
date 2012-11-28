fujon.core.Class2 = function(object){
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

fujon.core.Class2.prototype.constructor = fujon.core.Class2 ;

