//alert('fire content');
fujon.content = {
	toString: function(){
		return 'fujon.content';
	},
	Context: new function(){
		this.window = window ;
		this.document = document ;
	}
};
fPackage.create(fujon.content);