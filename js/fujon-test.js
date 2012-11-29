function main() {
	fImport(fujon.core);
	fImport(fujon.system);
	fImport(fujon.shortcuts);
	fImport(fujon.debug);
	fImport(fujon.app);
  
  //Logger.enable(false);
  var log = Logger.getLogger('fujonLog');
  log.setLocalTag('FUJON');
	
  var A = new Class({
    constructor:function(){
      pVar = 30 ;
      pFun = function(){
        alert('private function');
      }
    },
    static$foo:function(){
      alert('static method');
    },
    abstract$myAbstractMethod:function(){},
    getVar:function(){
      return pVar ;
    },
    runPFun:function(){
      pFun();
    }
  });
  
  var B = new Class({
    constructor:function(){
      this._super.constructor();
    },
    extend:A,
    myAbstractMethod:function(){
    }
  });
  
  /*var a = new A();
  a.pVar = 50000 ;
  log.d(a.getVar());
  a.runPFun();  */
  
  var b = new B();
  for(var i in b){
    console.log(i);
  }
  
  

}
