var Class = fujon.core.Class ;
var Interface = fujon.core.Interface ;

var Machine = Class({
	constructor:function(name){
		this.name = name ;
	}
});

var Car = Class({extend:Machine},{
	constructor:function(name){
		this._super(name);
	}
});

var Suv = Class({extend:Car},{
	constructor:function(name){
		this._super(name);
	}
});  

Car.inflate({
	static_pilot:'Schumy',
	static_getPilot:function(){
    console.log(this.name + ' call me');
		return this._static.pilot ;
	},
	static_setPilot:function(n){
		this._static.pilot = n ;
    
	}
});

 

//Car.setPilot('Foo');
console.log(Car.getPilot());

var ferrari = new Car('Ferrari');
var mercedes = new Car('Mercedes');
var hammer = new Suv('Hammer');
var robot = new Machine('Robot');

Car.setPilot('FOO');
mercedes.setPilot('Linus');

console.log(ferrari.getPilot());
console.log(mercedes.getPilot());
//hammer.setPilot('GNU');
console.log(hammer.getPilot());
console.log(ferrari.getPilot());
console.log(mercedes.getPilot());

console.log(hammer.getPilot());
console.log(ferrari.getPilot());
console.log(mercedes.getPilot());

console.log(ferrari.name,(ferrari instanceof Suv),(ferrari instanceof Car),(ferrari instanceof Machine));
console.log(hammer.name,(hammer instanceof Suv),(hammer instanceof Car),(hammer instanceof Machine));
console.log(robot.name,(robot instanceof Suv),(robot instanceof Car),(robot instanceof Machine));

var I = Interface({
  onClick:'',
  foo:function(){}
})

var i = new I({
  onClick:function(){},
  foo:function(){}
});

