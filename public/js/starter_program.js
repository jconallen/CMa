

var starter_prog = [

	new Instruction( InstructionDefinition["loadc"], new Value("int",1), null ),
	new Instruction( InstructionDefinition["new"], null, null ),
	new Instruction( InstructionDefinition["storea"], new Value("int",42), null ),
	new Instruction( InstructionDefinition["loada"], new Value("int",63), null ),
	new Instruction( InstructionDefinition["print"], null, null ),
	new Instruction( InstructionDefinition["halt"], null, 'end')
	
];