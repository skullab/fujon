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
    constructor: function(){
    	//safe debug mode
    	if(fujon.signature != fujon.constants.SIGNATURE.DEBUG)return;
    	this.console = window.open('libs/console/console.html','fujonConsole','location=no,menubar=no,status=no,titlebar=no,toolbar=no');
    	alert(this.console);
    	this.console.resizeTo(screen.width,150);
    	this.console.moveTo(0,screen.height-150);
    	this.boardName = 'board' ;
    	this.infoName = 'info' ;
    	this.console.blur();
    },
    info: function(){
    	this.consoleInfo = this.console.document.getElementById(this.infoName) ;
    	this.consoleInfo.innerHTML = 'Console ver '+fujon.versionCode ;
    },
    log: function(msg,type){
    	//this.console.focus();
    	var msgStyle = 'd_msg' ;
    	switch(type){
    	case 'e' :
    		msgStyle = 'e_msg' ;
    		break;
    	case 'w' :
    		msgStyle = 'w_msg' ;
    		break;
    	case 'd' :
    		msgStyle = 'd_msg' ;
    		break;
    	case 'v' :
    		msgStyle = 'v_msg' ;
    		break;
    	}
    	
    	//this.consoleBoard = this.console.document.getElementById(this.boardName) ;
    	var now = new Date();
    	var timestamp = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+':'+now.getMilliseconds() ;
    	/*this.consoleBoard.innerHTML += 
    		'<span class="date">'+timestamp+ 
    		' : </span><span class="'+msgStyle+'">'+msg+'</span><br>';*/
    	
    	this.queue(timestamp,msgStyle,msg);
    },
    activeConsole:function(){
    	var _this = this ;
    	setTimeout(function(){
    		_this.console.focus();
    	},0);
    },
    queue: function(t,s,m){
    	var _this = this ;
    	if(!this.console.focus)this.console.focus();
    	
    	/*this.console.document.onreadystatechange = function() {
    		alert('on ready');
    		if (document.readyState == "complete") {
    			alert('doc complete');
    			_this.consoleBoard = _this.console.document.getElementById(_this.boardName);
        		_this.consoleBoard.innerHTML += 
        			'<span class="date">'+t+ 
        			' : </span><span class="'+s+'">'+m+'</span><br>';
    		}
    	}*/
    }
  })  
};
fPackage.create(fujon.debug);