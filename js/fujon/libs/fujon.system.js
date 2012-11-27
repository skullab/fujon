fujon.system = {
  toString:function(){
    return 'fujon.system' ;
  }
};
fujon.system.getTimestamp = function(){
  var now = new Date();
  var timestamp = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+':'+now.getMilliseconds() ;
  return timestamp ;
};
fPackage.create(fujon.system);
