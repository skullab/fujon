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
	pilot:'',
	getPilot:function(){
		return this.passenger ;
	},
	setPilot:function(n){
		this.pilot = n ;
	}
});

var ferrari = new Car('Ferrari');
var hammer = new Suv('Hammer');
var robot = new Machine('Robot');


console.log(ferrari.name,(ferrari instanceof Suv),(ferrari instanceof Car),(ferrari instanceof Machine));
console.log(hammer.name,(hammer instanceof Suv),(hammer instanceof Car),(hammer instanceof Machine));
console.log(robot.name,(robot instanceof Suv),(robot instanceof Car),(robot instanceof Machine));


