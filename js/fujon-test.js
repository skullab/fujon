function main() {
	fImport(fujon.core);
	fImport(fujon.system);
	fImport(fujon.shortcuts);
	fImport(fujon.debug);
	fImport(fujon.app);

	// Logger.enable(false);
	var log = Logger.getLogger('fujonLog');
	log.setLocalTag('FUJON');

	var a = new WebApp(new WebAppCallback({
		onReady : function() {
			box = Element.convert(Element.getById('box'));
			console.log(box);
			a = new Class({
				constructor:function(){},
				
			});
			
			myi = new OnClickListener({
				onClick:function(element){
					alert('you click on '+element);
				}
			});
			
			box.setOnClickListener(myi);
		},
		onStart : function() {
			alert('win load');
		},
		onStop : function() {
		},
		onCancel : function() {
		}
	}));

}
