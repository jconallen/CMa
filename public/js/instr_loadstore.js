
InstructionDefinition["loadc"] = {
		"name": 		"loadc",
		"displayName":	"loadc q",
		"semantics": 	"SP&larr;SP+1; S[SP]&larr;q",
		"description": 	"The stack pointer (SP) is incremented by one. The constant argument q is placed at the" +
						" on the stack at the position of the stack pointer.", 
		"impl": 		
function(instr,vm){
	var q = instr.arg(0);
	if( q && q.isLabel() ) {
		// compute address
		var addr = vm.getAddressFromArgument(q);
		vm.push( new Value(addr) );
	} else {
		vm.push( instr.arg(0).value );
	}							
}
}


InstructionDefinition["load"] = {
		"name": 		"load",
		"displayName":	"load m",
		"semantics": 	"S[SP]&larr;S[S[SP]] with no argument otherwise; for(i&larr;m-1; i>=0; i--) { S[SP+i]&larr;S[S[SP]+i]; } SP&larr;SP+m-1;",
		"description": 	"The value in memory refrenced by the address at the top of the stack, is " +
						"copied to the top of the stack.  If there is an optional argument <i>m</i>, then " +
						"that number of memory locations is copied to the top of the stack. " +
						"Note: <b>load</b> <i>m</i> where <i>m</i>=1 is equivalent to <b>load</b>.",
		"impl": 		
function(instr,vm){
	
	if( instr.hasArg(0) ) {
		var addr = vm.pop().asInt();
		var m = instr.arg(0).asInt();
		for(var i=m-1; i>=0; i-- ) {
			var val = vm.S[addr-i];
			vm.push( val );
		}
	} else {
		vm.S[vm.SP] = vm.S[ vm.S[vm.SP].value ];
	}
	
}
}

InstructionDefinition["store"] = {
		"name": 		"store",
		"displayName":	"store m",
		"semantics": 	"S[S[SP]]&larr;S[SP] with no argument otherwise; for(i&larr;0; i&lt;m; i++) { S[S[SP]+i]&larr;S[SP-m+i]; } SP&larr;SP+m-1;",
		"description": 	"At the location refrenced by the top of the stack, store the value " +
						"next on the stack.  If there is an argument, m, then store the m consequtive values ",
			"impl": 	
function(instr,vm){
	if( instr.hasArg(0) ) { 
		var m = instr.argAsInt(0);
		for(var i=0; i<m; i++ ) {
			
			vm.S[ vm.S[vm.SP].value + i ] = vm.S[vm.SP-m+i];
		}
		vm.SP = vm.SP-m-1;
	} else {
		var addr = vm.pop().asInt();
		var val = vm.pop();
		vm.S[addr] = val;
	}
}
}

InstructionDefinition["loadrc"] = {
		"name": 		"loadrc",
		"displayName":	"loadrc q",
		"semantics": 	"SP&larr;SP+1; S[SP]&larr;FP+q",
		"description": 	"Copy the value at the relative address q to the top of the stack.",
		"impl":			
function(instr,vm){
	var q = instr.argAsInt(0);
	vm.SP = vm.SP + 1;
	vm.S[vm.SP] = new Value(vm.FP+q);
}
}

InstructionDefinition["loada"] = {
		"name": 		"loada",
		"displayName":	"loada q",
		"semantics": 	"SP&larr;SP+1; S[SP]&larr;S[q]",
		"description": 	"Put the value referenced by the address at the top of the stack, " +
						"on top of the stack.  Rquivalent to <b>loadc</b> q; <b>load</b>",
		"impl":			
function(instr,vm){
	var q = instr.argAsInt(0);
	var v = vm.S[q];
	vm.push(v);
}
}


InstructionDefinition["storea"] = {
		"name": 		"storea",
		"displayName":	"storea q",
		"semantics": 	"S[S[SP]] &larr; q; SP &larr; SP-1;",
		"description": 	"Store the value q at the location pointed to by the top of the stack.  Equivalent " +
						"to <b>loadc</b> q; <b>store</b>;",
		"impl":			
function(instr,vm){
	var q = instr.argAsValue(0);
	var a = vm.pop().asInt();
	vm.S[a] = q;
}
}

InstructionDefinition["loadr"] = {
		"name": 		"loadr",
		"displayName":	"loadr q",
		"semantics": 	"SP&larr;SP+1; S[SP]&larr;S[FP+q]",
		"description": 	"Put the value referenced by the address at the top of the stack, " +
						"on top of the stack.",
		"impl":			
function(instr,vm){
	var q = instr.argAsInt(0);
	vm.SP = vm.SP + 1;
	vm.S[vm.SP] = vm.S[ vm.FP + q ];
}
}

InstructionDefinition["storer"] = {
		"name": 		"storer",
		"displayName":	"storer q",
		"semantics": 	"S[FP+q] &larr; S[SP]; ",
		"description": 	"Store the value at the top of the stack to the relative address q",
		"impl":			
function(instr,vm){
	var q = instr.argAsInt(0);
	vm.S[vm.FP+q] = vm.S[vm.SP];
}
}
