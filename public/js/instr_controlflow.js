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

InstructionDescriptions["jumpi"] = {
		"name": "jumpi q",
		"semantics": "if( S[SP] = 0 ) PC←S[SP]+q; SP←SP-1",
		"description": "Jump indirect. The value ontop of the stack is added to the contstant q to determine " +
				"the next value of the program counter (PC)."
}
function jumpi(instr,vm){
	var q = instr.argument;
	var relAddr = vm.pop();
	var jmpAddr = q.value+relAddr.value;
	vm.PC = jmpAddr-1;  // remember that the vm will increment the pc after this invocation
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