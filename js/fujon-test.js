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
  
  var MyApp = new Class({
    constructor:function(){
      //this._super.constructor();
    },
    extend:WebApp,
    onReady:function(){
      alert('ready !');
    }
  });
  
  new MyApp();
  
}
