
function main() {
	fImport(fujon.core);
	fImport(fujon.shortcuts);
	fImport(fujon.debug);
	fImport(fujon.app);
	
	var A = new Class2({
		constructor:function(x,y){
			console.log('constructor of A : '+x+' '+y);
			this.x = x ;
			this.y = y ;
		},
		getX:function(){
			return this.name+'- value of x is : '+this.x ;
		}
	});
	
	var B = new Class2({
		constructor:function(x,y){
			console.log('constructor of B : '+x+' '+y);
			this._super.constructor(x,y);
		},
		extend:A,
		name:'Class B'
	});
	
	var b = new B(10,20);
	console.log(b.getX());
	
	var a = new A(100,200);
	console.log(a.getX());
	
	console.log(A);
	console.log(B);
	
	
}
