InstructionDefinition["neg"] = {
		"name": 		"neg",
		"displayName": 	"neg",
		"semantics": 	"S[SP] &larr; -S[SP]",
		"description": 	"Replaces the top of the stack with the negative value.",
		"impl":		
function(instr,vm){
	var v = vm.pop();
	v.value = -Number(v.value);
}
}

InstructionDefinition["add"] = {
		"name": 		"add",
		"displayName": 	"add",
		"semantics": 	"S[SP-1] &larr; S[SP-1] + S[SP]; SP &larr; SP - 1",
		"description": 	"The top two values on the stack are added together and replaced but the result.",
		"impl":			
function(instr,vm){
	var a = vm.pop();
	var b = vm.pop();
	var c = Number(a) + Number(b);
	var t = "int";
	if( a.type=="float" || b.type=="float" ) {
		t = "float";
	}
	var value = new Value( c, t);
	vm.push(value);
}
}

InstructionDefinition["sub"] = {
		"name": 		"sub",
		"displayName": 	"sub",
		"semantics": 	"S[SP-1] &larr; S[SP-1] - S[SP]; SP &larr; SP - 1",
		"description": 	"The top value on the stack is subtracted from the next value on the stack " +
						"and the result placed back on the stack.",
		"impl":			
function(instr,vm){
	var a = Number(vm.S[vm.SP-1].value);
	var b = Number(vm.S[vm.SP].value);
	if( vm.S[vm.SP-1].type=="float" || vm.S[vm.SP].type=="float"){
		vm.S[ vm.SP-1 ] = new Value(a-b, "float");
	} else {
		vm.S[ vm.SP-1 ] = new Value(a-b, "int");
	}
	vm.SP--;
}
}

InstructionDefinition["mul"] = {
		"name": 		"mul",
		"displayName": 	"mul",
		"semantics": 	"S[SP-1] &larr; S[SP-1] * S[SP]; SP &larr; SP - 1",
		"description": "The top two values on the stack are multiplied and replaced with the result.",
		"impl":			
function(instr,vm){
	var a = vm.S[vm.SP-1];
	var b = vm.S[vm.SP];
	var m = Number(a.value) * Number(b.value);
	if( a.type=="float" || b.type=="float"){
		vm.S[ vm.SP-1 ] = new Value(m, "float");
	} else {
		vm.S[ vm.SP-1 ] = new Value( m );
	}
	vm.SP--;
	
}
}

InstructionDefinition["div"] = {
		"name": 		"div",
		"displayName": 	"div",
		"semantics": 	"S[SP-1] &larr; S[SP-1] / S[SP]; SP &larr; SP - 1",
		"description": 	"The top value on the stack is divided into the next value on the stack. " +
						"If either value is a float the result is a float.  If the are both ints then the " +
						"result is an int and there is no remainder.",
		"impl":			
function(instr,vm){
	var a = Number(vm.S[vm.SP-1].value);
	var b = Number(vm.S[vm.SP].value);
	var v = a/b;
	if( vm.S[vm.SP-1].type=="float" || vm.S[vm.SP].type=="float"){
		vm.S[ vm.SP-1 ] = new Value(v, "float");
	} else {
		vm.S[ vm.SP-1 ] = new Value( Math.floor(v) );
	}
	vm.S--;
					
}
}

InstructionDefinition["mod"] = {
		"name": 		"mod",
		"displayName": 	"mod",
		"semantics": 	"S[SP-1] &larr; S[SP-1] mod S[SP]; SP &larr; SP - 1",
		"description": 	"The top value on the stack is divided into the next value on the stack. " +
						"The value of the remainder is placed on the stack as an integer.",
		"impl":			
function mod(instr,vm){

	var a = vm.pop();
	var b = vm.pop();
	
	var c = Number(b) % Number(a);
	
	var value = new Value( c );
	vm.push(value);
	
}
}
