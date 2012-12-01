function main() {
	fImport(fujon.core);
  fImport(fujon.core.thread);
	fImport(fujon.system);
	fImport(fujon.shortcuts);
	fImport(fujon.debug);
	//fImport(fujon.app);

	// Logger.enable(false);
	var log = Logger.getLogger('fujonLog');
	log.setLocalTag('FUJON');
  
 /*var Point = new Class({
	 constructor:function(x,y){
    log.d('call Point const');
		 this.x = x ;
		 this.y = y ;
	 },
   foo:function(){
    log.d('foo of point');
   },
   toString:function(){
    return '[object Point]' ;
   }
 });
 
 var Rect = new Class({
	constructor:function(x,y,x1,y1){
		Point.call(this,x,y);
    log.d('call Rect const');
		this.x1 = x1 ;
		this.y1 = y1 ;
	},
	extend:Point,
  foo:function(){
    log.d('foo of Rect');
    this.x = 10000 ;
  },
  getX:function(){
    log.d('Rect X : '+this.x);
  },
   toString:function(){
    return '[object Rect]' ;
   }
 });
 
 var DoubleRect = new Class({
	 constructor:function(x,y,x1,y1,x2,y2){
		 Rect.call(this,x,y,x1,y1);
     log.d('call DoubleRect const');
		 this.x2 = x2 ;
		 this.y2 = y2 ;
	 },
	 extend:Rect,
   foo:function(){
      this._super();
   },
   toString:function(){
    return '[object DoubleRect]' ;
   }
 });
 
 var ORect = new Class({
  constructor:function(){
    DoubleRect.call(this,10,20,30,40,50,60);
    //this._super.constructor(10,20,30,40,50,60);
    log.d('call ORect const');
  },
  extend:DoubleRect,
  toString:function(){
    return '[object ORect]' ;
   }
 });
 
 var myRect = new ORect();
 myRect.foo();
 log.d(typeof Rect);
 log.d('x = '+myRect.x);
 log.d('y = '+myRect.y);
 log.d('x1 = '+myRect.x1);
 log.d('y1 = '+myRect.y1);
 log.d('x2 = '+myRect.x2);
 log.d('y2 = '+myRect.y2);
 
 /* var MyApp = new Class({
    constructor:function(){
      //this._super.constructor();
    },
    extend:WebApp,
    onReady:function(){
      alert('ready !');
    }
  });
  
  new MyApp();*/
  
  var Person = Class2.extend({
  init: function(isDancing){
    this.dancing = isDancing;
  },
  dance: function(){
    return this.dancing;
  }
});
var Ninja = Person.extend({
  init: function(){
    this._super( false );
  },
  dance: function(){
    // Call the inherited version of dance()
    return this._super();
  },
  swingSword: function(){
    return true;
  }
});
  
  var p = new Person(true);
  log.d(p.dance());
  var n = new Ninja();
  log.d(n.dance()); // => false
  log.d(n.swingSword()); // => true

// Should all be true
p instanceof Person && p instanceof Class &&
n instanceof Ninja && n instanceof Person && n instanceof Class
}
