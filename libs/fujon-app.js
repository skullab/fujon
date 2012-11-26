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
});
fujon.app.WebApp = new fujon.core.Class({
	constructor : function(obj) {
		if(obj instanceof fujon.app.WebAppCallback){
			var _this = this ;
			this.iapp = obj ;
			
			this.readyInterval = setInterval(function(){
				if(document.readyState === "complete"){
					_this.iapp.onReady();
					clearInterval(_this.readyInterval);
				}
			
			},10);
			
			this.loadInterval = setInterval(function(){
				if(fujon.windowisloaded){
					_this.iapp.onStart();
					clearInterval(_this.loadInterval);
				}
			
			},10);
			
		}else alert('error bad app');
		this.context = new fujon.content.Context(this) ;
	},
	getContext:function(){
		return this.context ;
	}
});

fPackage.create(fujon.app);
