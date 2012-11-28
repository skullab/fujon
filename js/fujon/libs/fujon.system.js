fujon.system = {
	toString : function() {
		return 'fujon.system';
	}
};
fujon.system.getTimestamp = function(d) {
	var now = d ? new Date(d) : new Date() ;
	var timestamp = now.getFullYear() + '-' + now.getMonth() + '-'
			+ now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes()
			+ ':' + now.getSeconds() + ':' + now.getMilliseconds();
	return timestamp;
};
fujon.system.currentTimeMillis = function() {
	return new Date().getTime();
};
fPackage.create(fujon.system);
