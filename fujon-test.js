function main() {
  alert('libraries load');
	fImport(fujon.core);
	fImport(fujon.shortcuts);
  fImport(fujon.debug);
  
  var a = Element.convert(get('box'));
  console.log(a.getAttribute('id'));
  a.setOnClickListener(new OnClickListener({
    onClick:function(e,ev){
      alert(e);
    }
  }));
}

onDocumentReady(function(){
  alert('document ready'); 
});
onWindowLoad(function(){
  alert('window load');
});


