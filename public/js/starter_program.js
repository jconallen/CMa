

var starter_prog = [

	new Instruction( loadc, new Value("int",1), null ),
	new Instruction( _new, null, null ),
	new Instruction( storea, new Value("int",42), null ),
	new Instruction( loada, new Value("int",63), null ),
	new Instruction( print, null, null ),
	new Instruction( halt, null, 'end')
	
];