/**
 *              THE FUJON JAVASCRIPT FRAMEWORK !
 *                  Copyright(c)2005-2012  
 *  Released under Apache License Version 2.0, January 2004
 *  (see the license here : http://www.apache.org/licenses/LICENSE-2.0.txt)
 *    
 *  Author : ivan[dot]maruca[at]gmail[dot]com <http://fujon.blogspot.com>
 *   
 **/ 
 
/**-------------------------------------------
 *            SHORTCUTS
 *------------------------------------------**/ 
           
fujon.shortcuts = {
  toString: function(){
    return 'fujon.shortcuts' ;
  },
  get: function(id){
    return document.getElementById(id);
  },
  tag: function(tag){
    return document.getElementsByTagName(tag);
  }
}
fPackage.create(fujon.shortcuts); 
