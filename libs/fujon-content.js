//alert('fire content');
fujon.content = {
	toString : function() {
		return 'fujon.content';
	},
	Context : new fujon.core.Class({
		constructor : function(obj) {
			if (obj instanceof Object) {
				this.prototype = obj;
			}
		},
	})
};
fPackage.create(fujon.content);