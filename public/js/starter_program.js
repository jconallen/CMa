

var starter_prog_src = "loada 3; loadc 7; add; load; loadc 0; add; loada 1; loadc 1; add; loadc 1; mul; add; end: halt;";

// var starter_prog_src = "loadc 42; loadc 40; loadc 38; loadc 3; new; store 3; end: halt;";

var parsed_prog = parseProgram(starter_prog_src);

if( parsed_prog.error ) {
	alert('Error parsing starter program: ' + parsed_prog.error );
} 

var starter_prog = parsed_prog.instructions;


var starter_prog_old = [

	new Instruction( InstructionDefinition["loadc"], new Value("int",1), null ),
	new Instruction( InstructionDefinition["new"], null, null ),
	new Instruction( InstructionDefinition["storea"], new Value("int",42), null ),
	new Instruction( InstructionDefinition["loada"], new Value("int",63), null ),
	new Instruction( InstructionDefinition["print"], null, null ),
	new Instruction( InstructionDefinition["halt"], null, 'end')
	
];