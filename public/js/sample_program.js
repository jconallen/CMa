
/*

      loadc 1;
      loadc 2;
      add;
      print;
 end: halt
 


 */


var ex_prog = [

	new Instruction( loadc, new Value("int",1), null ),
	new Instruction( jumpz, new Value("int", 5), null),
	new Instruction( loadc, new Value("int",1), null ),
	new Instruction( loadc, new Value("int",2), null ),
	new Instruction( add, null, null ),
	new Instruction( print, null, null  ),
	new Instruction( halt, null, 'end')
	
];