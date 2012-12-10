function main() {
	fImport(fujon.core);
	fImport(fujon.core.thread);
	fImport(fujon.system);
	fImport(fujon.shortcuts);
	fImport(fujon.debug);
	// fImport(fujon.app);

	// Logger.enable(false);
	var log = Logger.getLogger('fujonLog');
	log.setLocalTag('FUJON');

	var A = Class({
		constructor:function(){
			this.x = 10 ;
		},
		foo : function() {
			alert('oh yeah');
		}
	});
	var B = Class({
		constructor:function(v){
			this._super.constructor();
		},
		extend:A,
		foo:function(){
			this._super.foo();
		}
	});
	
	var C = Class({
		constructor:function(){
			//this._super.constructor();
		},
		extend:B
	});
	var test = new C();
	log.l(test);
}
//******************************

var Point = fujon.core.Class({
	constructor:function(x,y){
		this.x = x ;
		this.y = y ;
	},
	getX:function(){
		return this.x ;
	},
	getY:function(){
		return this.y ;
	}
});

var Axis = fujon.core.Class({extend:Point},{
	constructor:function(x,y,z){
		this._super.constructor(x,y);
		this.z = z ;
	},
	getX:function(){
		this._super.getX();
	},
	getZ:function(){
		return this.z ;
	}
});

var p0 = new Point(1,2);
//var p1 = new Point(3,4);

var a0 = new Axis(10,20,30);
//var a1 = new Axis(40,50,60);

console.log(a0.getX());


