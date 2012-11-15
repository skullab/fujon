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
//alert('fire debug');
fujon.debug = {
  toString: function(){
    return 'fujon.debug' ;
  },
  Console: new fujon.core.Class({
    constructor: function(){
    	this.activateConsole();
    },
    initialize: function(){
    	this.console = window.open('',fujon.constants.CONSOLE.NAME,'location=no,menubar=no,status=no,titlebar=no,toolbar=no');
    	this.console.resizeTo(screen.width,210);
    	this.console.moveTo(0,screen.height-210);
    	this.console.document.write(this.UI);
    },
    UI:'<!DOCTYPE html><html><head><meta charset="utf-8"><title>Fujon Output Console</title>'+
    	'<style type="text/css">'+ 
    	'.info{font:10px monospace;width:100%;margin-bottom:5px;}'+
    	'.board{font:12px monospace;width:100%;height:100px;overflow:auto;}'+
	    '.optionbar{font:12px monospace;position:relative;float:right;top:-20px}'+
    	'span.date{color:#666666;}'+
    	'span.w_msg{color:#b26e03;}'+
    	'span.e_msg{color:#b21602;}'+
    	'span.d_msg{color:#019db2;}'+
    	'span.v_msg{color:#000000;}'+
	    'span.filter_e,span.filter_w,span.filter_d,span.filter_v{color:#ff0000;cursor:pointer;}'+
    	'</style>'+
    	'<script>'+
      'var filters = new Array(4);'+
      'filters["e"] = filters["w"] = filters["d"] = filters["v"] = 1 ;'+
    	'function flush(t,s,m){'+
      ' var f = s.split("_")[0] ;'+
      ' if(!filters[f])return;'+
    	'	var board = document.getElementById(\'board\');'+
    	'	board.innerHTML += \'<span class="date">\'+t+\' : '+ 
		  ' 	</span><span class="\'+s+\'">\'+m+\'</span><br>\';'+
		  '	board.scrollTop = board.scrollHeight ;'+
    	'};'+
	    'function filter(f){'+
      ' filters[f] = filters[f] ? 0 : 1 ;'+
      ' var el = document.getElementById("filter_"+f);'+
      ' if(el.style.color == "rgb(255, 0, 0)" || el.style.color == ""){'+
      '   el.style.color = "rgb(102,102,102)" ;'+
      ' }else{'+
      '   el.style.color = "rgb(255, 0, 0)" ;'+
      ' }'+
	    '};'+
    	'</script>'+
    	'</head><body>'+
    	'<div id="info" class="info">Console ver '+fujon.versionCode+'</div>'+
	'<div id="optionbar" class="optionbar">Filter : '+
	'<span id="filter_e" class="filter_e" onclick="filter(\'e\')">[E]</span>'+
	'<span id="filter_w" class="filter_w" onclick="filter(\'w\')">[W]</span>'+
	'<span id="filter_d" class="filter_d" onclick="filter(\'d\')">[D]</span>'+
	'<span id="filter_v" class="filter_v" onclick="filter(\'v\')">[V]</span>'+
	'</div>'+
    	'<div id="board" class="board"></div>'+
    	'</body></html>',
    close:function(){
	this.console.close() ;
      },
    verify: function(){
    	//safe debug mode
    	return (fujon.signature == fujon.constants.SIGNATURE.DEBUG) ;
    },
    log: function(msg,type){
    	if(!this.activateConsole())return ;
    	var msgStyle ;
    	
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
    	default :
    		msgStyle = 'd_msg' ;
    	}
    	
    	var now = new Date();
    	var timestamp = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+':'+now.getMilliseconds() ;
    	this.console.flush(timestamp,msgStyle,msg);
    },
    deactivateConsole:function(){
    	if(this.console){
    		this.console.close();
    	}
    },
    activateConsole:function(){
    	//safe debug mode
    	if(!this.verify())return false;
    	if(!this.console || this.console.closed){
    		this.initialize();
    	}
    	this.console.focus();
    	return true ;
    },
    static$E:'e',
    static$W:'w',
    static$V:'v',
    static$D:'d'
  })  
};
fPackage.create(fujon.debug);