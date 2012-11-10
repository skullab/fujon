/**
 * THE FUJON JAVASCRIPT FRAMEWORK ! Copyright(c)2005-2012 Released under Apache
 * License Version 2.0, January 2004 (see the license here :
 * http://www.apache.org/licenses/LICENSE-2.0.txt)
 * 
 * Author : ivan[dot]maruca[at]gmail[dot]com <http://fujon.blogspot.com>
 * 
 */

 /*----------------------------------------
DEBUG
 -----------------------------------------*/
 
fujon.debug = {
  toString: function(){
    return 'fujon.debug' ;
  },
  Console: new fujon.core.Class({
    constructor: new function(){}
  })  
}
fPackage.create(fujon.debug);