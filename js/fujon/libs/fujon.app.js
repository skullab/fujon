fujon.app = {
	toString : function() {
		return 'fujon.app';
	}
};

fujon.app.WebAppCallback = new fujon.core.Interface({
	onReady : function() {
	},
	onStart : function() {
	},
	onStop : function() {
	},
	onCancel : function() {
	}
});
fujon.app.BaseWebApp = new fujon.core.Class({
  constructor:function(){
    var _this = this ;
    this.readyInterval = setInterval(
      function(){
        if(document.readyState === "complete"){
					_this.onReady();
					clearInterval(_this.readyInterval);
				}
			},0);
    this.loadInterval = setInterval(
      function(){
				if(fujon.windowisloaded){
					_this.onStart();
					clearInterval(_this.loadInterval);
				}			
			},0);
  },
  implement:new fujon.app.WebAppCallback({
    onReady : function() {},
    onStart : function() {},
    onStop : function() {},
    onCancel : function() {}
  })
});

fujon.app.WebApp = new fujon.core.Class({
	constructor : function() {
    this._super.constructor();
		this.context = new fujon.content.Context(this) ;
	},
  initialize:function(){
    
  },
  extend: fujon.app.BaseWebApp,
	getContext:function(){
		return this.context ;
	}
});

fPackage.create(fujon.app);
