function main(){	
	fImport(fujon.core);
	fImport(fujon.core.thread);
	fImport(fujon.shortcuts);
	//alert(Element.HEAD.innerHTML);
  var i = 0 ;
  
  
  var t = new Thread();
  
  var f = function(){
	  alert('I\'m a function inside a Thread');
  };
  
  var i = 0 ;
  var loop = function(){
	 ('I\'m a loop inside a Thread ! '+i);
	  return CONTINUE ;
  };
  var r = new Runnable({
	  run:function(){
		  alert('I\'m a runnable interface inside a Thread !');
	  }
  });
  
  t.setRunnable(loop);
  
  
  try{ 
	  t_ref = t.start();
  }catch(e){
	  alert(e);
  }
  
  var e1 = new Element('div');
  
  e1.setAttribute({style:'border:1px solid red',id:'div1'});
  e1.createText('Hello, click me !');
  
  e1.setOnClickListener(new OnClickListener({
    onClick:function(element,event){
      alert('I\'m '+element.getAttribute('id'));
    }
  }));
  
  var e2 = new Element();
  e2.clone(e1).setAttribute('id','div2');
  
  var box = get('box');
  
  e1.appendTo(box);
  e2.appendTo(box);
  
  //alert(get('box').innerHTML);
  //alert(get('box2').innerHTML); 
}
