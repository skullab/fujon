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
 *            CONSTANTS
 *------------------------------------------**/ 
//alert('fire cons');  
fujon.constants = {
  toString: function(){
    return 'fujon.constants' ;
  },
  LOAD:'load',
  TYPE: {NUMBER:'number',STRING:'string',BOOLEAN:'boolean',OBJECT:'object',FUNCTION:'function'},
  BROWSER:{FIREFOX:'Firefox',OPERA:'Opera',MSIE:'MSIE',CHROME:'Chrome',SAFARI:'Safari',NETSCAPE:'Netscape',KONQUEROR:'Konqueror',AOL:'AOL',SEAMONKEY:'SeaMonkey'},
  SIGNATURE:{DEBUG:'debug',UNSIGNED:''},
  CONSOLE:{NAME:'fujonConsole'}
}
fPackage.create(fujon.constants);  
