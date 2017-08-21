
InstructionDefinition["leq"] = {
		"name": 		"leq",
		"displayName":	"leq",
		"semantics": 	"S[SP-1] &larr; S[SP-1] &le; S[SP]; SP &larr; SP - 1",
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
		"semantics": 	"S[SP-1] &larr; S[SP-1] &gt; S[SP]; SP &larr; SP - 1",
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
		"semantics": 	"S[SP-1] &larr; S[SP-1] = S[SP]; SP &larr; SP - 1",
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
		"semantics": 	"S[SP-1] &larr; S[SP-1] != S[SP]; SP &larr; SP - 1",
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
		"name": 		"geq",
		"displayName":	"geq",
		"semantics": 	"S[SP-1] &larr; S[SP-1] &ge; S[SP]; SP &larr; SP - 1",
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
