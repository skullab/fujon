var fujon = {
  core: {}
};

fujon.core.Class = function(){
  
  var option = arguments[1] ? arguments[0] : null ;
  var _class = option ? arguments[1] : arguments[0] ;
  if(!_class) throw new Error('Bad Class implementation');
  
  engine(extractOption(option),_class);
  
  function extractOption(o){
    if(!o || !(o instanceof Object))return null;
    var keys = [] ;
    for(var p in o){
      keys.push(p);
    }
    return keys ;
  };
  
  function engine(k,c){
    
  };
  function subclass(){};
  function modifier(m){};
  function extend(parent){};
  function implement(i){};
  function addClass(obj){};
  
};


