
InstructionDescriptions["loadc"] = {
		"name": "loadc q",
		"semantics": "SP←SP+1;S[SP]←q",
		"description": "The stack pointer (SP) is incremented by one. The constant argument q is placed at the" +
				" on the stack at the position of the stack pointer."
}
	
function loadc(instr,vm){
	vm.push( instr.argument );
}


InstructionDescriptions["load"] = {
		"name": "load",
		"semantics": "S[SP] ← S[S[SP]]",
		"description": "The value in memory refrenced by the address at the top of the stack, is" +
				"copied to the top of the stack."
}
	
function load(instr,vm){
	var addr = vm.pop();
	if( addr.type == "int" || addr.type == "ptr" ) {
		var val = vm.S[addr.value];
		vm.push( val );
	} else {
		throw "Memory reference value not an int or ptr.  Unable to load.";
	}
	
}

InstructionDescriptions["store"] = {
		"name": "store",
		"semantics": "S[S[SP]] ← S[SP-1]; SP ← SP - 1",
		"description": "At the location refrenced by the top of the stack, store the value next on the stack."
}
	
function store(instr,vm){
	
	var addr = vm.pop().value;
	var val = vm.pop();
	vm.S[addr] = val;

}

InstructionDescriptions["loada"] = {
		"name": "loada q",
		"semantics": "SP←SP+1;S[SP]←S[q]",
		"description": "Put the value referenced by the address at the top of the stack, " +
				"on top of the stack."
}
	
function loada(instr,vm){
	
	var addr = instr.argument;
	if( addr.type == "int" || addr.type == "ptr" ) {
		var val = vm.S[addr.value];
		vm.push( val );
	} else {
		throw "Memory reference value not an int or ptr.  Unable to load.";
	}
	
}


InstructionDescriptions["storea"] = {
		"name": "storea q",
		"semantics": "SP[q] ← S[SP]",
		"description": "Store the value q at the location pointed to by the top of the stack."
}
	
function storea(instr,vm){
	
	var addr = vm.peek();
	var q = instr.argument;
	
	if( addr.type == "int" || addr.type == "ptr" ) {
		vm.S[addr.value] = q;
	} else {
		throw "Memory reference value not an int or ptr.  Unable to storea.";
	}

}
