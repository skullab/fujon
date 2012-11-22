var out ;
function main() {
	// alert('libraries load');
	fImport(fujon.core);
	fImport(fujon.shortcuts);
	fImport(fujon.debug);
	fImport(fujon.app);

	out = new Console();
	
	var wa = new WebApp(new WebAppCallback({
		onReady : function() {
			out.log('my app is ready');
		},
		onStart : function() {
			out.log('my  app is started !');
			out.log(wa.getContext());
		},
		onStop : function() {
		},
		onCancel : function() {
		}
	}));

	
	var a = Element.convert(get('box'));
	console.log(a.getAttribute('id'));
	a.setOnClickListener(new OnClickListener({
		onClick : function(e, ev) {
			out.log(e);
		}
	}));

}
