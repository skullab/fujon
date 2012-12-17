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



