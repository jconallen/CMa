
InstructionDefinition["leq"] = {
		"name": 		"leq",
		"displayName":	"leq",
		"semantics": 	"S[SP-1] ← S[SP-1] ≤ S[SP]; SP ← SP - 1",
		"description": 	"If the value at top of stack is greater than or equal to the next value on the stack.", 
		"impl": 		
function(instr,vm){
	var a = vm.S[vm.SP-1];
	var b = vm.S[vm.SP];
	if( a <= b ) {
		vm.S[vm.SP-1] = TRUE;
	} else {
		vm.S[vm.SP-1] = FALSE;
	}
	vm.SP = vm.SP -1;
}
}


InstructionDefinition["gr"] = {
		"name": 		"gr",
		"displayName":	"gr",
		"semantics": 	"S[SP-1] ← S[SP-1] > S[SP]; SP ← SP - 1",
		"description": 	"", 
		"impl": 		
function(instr,vm){
	var a = vm.S[vm.SP-1];
	var b = vm.S[vm.SP];
	if( a > b ) {
		vm.S[vm.SP-1] = TRUE;
	} else {
		vm.S[vm.SP-1] = FALSE;
	}
	vm.SP = vm.SP-1;
}
}

InstructionDefinition["eq"] = {
		"name": 		"eq",
		"displayName":	"eq",
		"semantics": 	"S[SP-1] ← S[SP-1] = S[SP]; SP ← SP - 1",
		"description": 	"", 
		"impl": 		
function(instr,vm){
	var a = vm.S[vm.SP-1];
	var b = vm.S[vm.SP];
	if( a == b ) {
		vm.S[vm.SP-1] = TRUE;
	} else {
		vm.S[vm.SP-1] = FALSE;
	}
	vm.SP = vm.SP-1;
}
}

InstructionDefinition["neq"] = {
		"name": 		"neq",
		"displayName":	"neq",
		"semantics": 	"S[SP-1] ← S[SP-1] != S[SP]; SP ← SP - 1",
		"description": 	"", 
		"impl": 		
function(instr,vm){
	var a = vm.S[vm.SP-1];
	var b = vm.S[vm.SP];
	if( a != b ) {
		vm.S[vm.SP-1] = TRUE;
	} else {
		vm.S[vm.SP-1] = FALSE;
	}
	vm.SP = vm.SP-1;
}
}


InstructionDefinition["geq"] = {
		"name": 		"eq",
		"displayName":	"eq",
		"semantics": 	"S[SP-1] ← S[SP-1] ≥ S[SP]; SP ← SP - 1",
		"description": 	"", 
		"impl": 		
function(instr,vm){
	var a = vm.S[vm.SP-1];
	var b = vm.S[vm.SP];
	if( a >= b ) {
		vm.S[vm.SP-1] = TRUE;
	} else {
		vm.S[vm.SP-1] = FALSE;
	}
	vm.SP = vm.SP-1;
}
}

