function main(){	
	fImport(fujon.core);
	fImport(fujon.shortcuts);
	//alert(Element.HEAD.innerHTML);
  
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
