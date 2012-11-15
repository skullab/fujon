var c ;
function main() {
	
	fImport(fujon.core);
	fImport(fujon.debug);
	
	c = new Console();
  c.forceBlur(true);
}

function message(type){
	c.log('this is a message to output console<br>with more lines<br>to test functionality',type);
}

