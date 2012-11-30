function main() {
	fImport(fujon.core);
  fImport(fujon.core.thread);
	fImport(fujon.system);
	fImport(fujon.shortcuts);
	fImport(fujon.debug);
	fImport(fujon.app);

	// Logger.enable(false);
	var log = Logger.getLogger('fujonLog');
	log.setLocalTag('FUJON');
  
 var Point = new Class({
	 constructor:function(x,y){
		 this.x = x ;
		 this.y = y ;
	 }
 });
 
 var Rect = new Class({
	constructor:function(x,y,x1,y1){
		this._super.constructor(x,y);
		this.x1 = x1 ;
		this.y1 = y1 ;
	},
	extend:Point
 });
 
 var DoubleRect = new Class({
	 constructor:function(x,y,x1,y1,x2,y2){
		 //this._super.constructor(x,y,x1,y1);
		 this.x2 = x2 ;
		 this.y2 = y2 ;
	 },
	 extend:Rect
 });
 
 var myRect = new Rect(10,20,30,40,50,60);
 log.d(myRect.x);
 
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
  
}
