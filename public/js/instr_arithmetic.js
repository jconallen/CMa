InstructionDescriptions["neg"] = {
		"name": "neg",
		"semantics": "S[SP] ← -S[SP]",
		"description": "Replaces the top of the stack with the negative value."
}
function neg(instr,vm){

	var a = vm.pop();
	var t = a.type;
	if( t=="int" || t=="float" ) {
		var c = -Number(a.value);
		var value = new Value( t, c );
		vm.push(value);
	} else {
		throw "Unable to take negative of a non int or float value.";
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
	var t = "int";
	if( a.type=="float" || b.type=="float" ) {
		t = "float";
	}
	
	var value = new Value( t, c );
	vm.push(value);
	
}


InstructionDescriptions["sub"] = {
		"name": "sub",
		"semantics": "S[SP-1] ← S[SP-1] - S[SP]; SP ← SP - 1",
		"description": "The top value on the stack is subtracted from the next value on the stack " +
				"and the result placed back on the stack."
}
function sub(instr,vm){

	var a = vm.pop();
	var b = vm.pop();
	
	var c = Number(b) - Number(a);
	var t = "int";
	if( a.type=="float" || b.type=="float" ) {
		t = "float";
	}
	
	var value = new Value( t, c );
	vm.push(value);
	
}

InstructionDescriptions["mul"] = {
		"name": "mul",
		"semantics": "S[SP-1] ← S[SP-1] * S[SP]; SP ← SP - 1",
		"description": "The top two values on the stack are multiplied and replaced with the result."
}
function mul(instr,vm){

	var a = vm.pop();
	var b = vm.pop();
	
	var c = Number(b) * Number(a);
	var t = "int";
	if( a.type=="float" || b.type=="float" ) {
		t = "float";
	}
	var value = new Value( t, c );
	vm.push(value);
	
}

InstructionDescriptions["div"] = {
		"name": "div",
		"semantics": "S[SP-1] ← S[SP-1] / S[SP]; SP ← SP - 1",
		"description": "The top value on the stack is divided into the next value on the stack. " +
				"If either value is a float the result is a float.  If the are both ints then the " +
				"result is an int and there is no remainder."
}
function div(instr,vm){

	var a = vm.pop();
	var b = vm.pop();
	
	var c = Number(b) / Number(a);
	
	if( a.type=="float" || b.type=="float" ) {
		var value = new Value( "float", c );
		vm.push(value);
	} else {
		// treat as int
		var value = new Value( "int", Math.floor(c) );
		vm.push(value);
	}
	
}

InstructionDescriptions["mod"] = {
		"name": "mod",
		"semantics": "S[SP-1] ← S[SP-1] mod S[SP]; SP ← SP - 1",
		"description": "The top value on the stack is divided into the next value on the stack. " +
			"The value of the remainder is placed on the stack as an integer."
}
function mod(instr,vm){

	var a = vm.pop();
	var b = vm.pop();
	
	var c = Number(b) % Number(a);
	
	var value = new Value( "int", c );
	vm.push(value);
	
}
