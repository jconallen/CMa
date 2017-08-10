
InstructionDescriptions["loadc"] = {
		"name": "loadc q",
		"semantics": "SP←SP+1;S[SP]←q",
		"description": "The stack pointer (SP) is incremented by one. The constant argument q is placed at the" +
				" on the stack at the position of the stack pointer."
}
	
function loadc(instr,vm){
	vm.push( instr.argument );
}

InstructionDescriptions["jump"] = {
		"name": "jump q",
		"semantics": "PC←q",
		"description": "Unconditional jump to instruction at q."
}
function jump(instr,vm){

	var q = instr.argument;
	if( q.type=="label" ) {
		var addr = vm.getAddress(q.value);
		vm.PC = addr-1; // because the machine will auto increment PC after this instruction
	} else if( q.type=="int" ){
		vm.PC = q.value-1;
	}
	
	
}

InstructionDescriptions["jumpz"] = {
		"name": "jumpz q",
		"semantics": "if( S[SP] = 0 ) PC←q; SP←SP-1",
		"description": "Conditional jump to instruction at q.  If the value on top of the stack is zero then " +
				"set the next instruction to the label, or if an int then relative to the current PC. " +
				"Then decrement the stack pointer (SP)"
}
function jumpz(instr,vm){
	var q = instr.argument;
	var cond = vm.pop();
	if( cond.value == 0 ) {
		vm.PC = q.value-1;
	}
}

InstructionDescriptions["add"] = {
		"name": "add",
		"semantics": "S[SP-1] ← S[SP-1] + S[SP]; SP ← SP - 1",
		"description": "The top two values on the stack are added together and replaced but the result."
}
function add(instr,vm){

	var a = vm.pop();
	var b = vm.pop();
	
	var c = Number(a) + Number(b);
	
	var value = new Value( "int", c );
	vm.push(value);
	
}

InstructionDescriptions["print"] = {
		"name": "print",
		"semantics": "print S[SP]; SP ← SP - 1",
		"description": "Prints the value on the stack at the stack pointer (SP) to the standard output. If the value is a float the " +
				"output value will be formatted with a decimal point (even if it is a whole number). The stack pointer is then " +
				"decremented by one."
}

function print(inst,vm){
	// send the value on top of the stack to std out
	var a = vm.pop();
	vm.print(a.toString());
	
}

InstructionDescriptions["halt"] = {
		"name": "halt",
		"semantics": "",
		"description": "Stops the virtual machine."
}

function halt(inst,vm){
	// stop processing - disable the execute button
	vm.halt();
	
}