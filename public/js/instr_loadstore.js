
InstructionDefinition["loadc"] = {
		"name": 		"loadc",
		"displayName":	"loadc q",
		"semantics": 	"SP&larr;SP+1; S[SP]&larr;q",
		"description": 	"The stack pointer (SP) is incremented by one. The constant argument q is placed at the" +
						" on the stack at the position of the stack pointer.", 
		"impl": 		
function(instr,vm){
	if( instr.arg1.type == "int" ) {
		vm.push( instr.arg1 );
	} else if( instr.arg1.type == 'ptr' ){
		// compute add
		var addr = vm.getAddressFromArgument(instr.arg1);
		vm.push( new Value("ptr", addr) );
	}							
}
}


InstructionDefinition["load"] = {
		"name": 		"load",
		"displayName":	"load m",
		"semantics": 	"S[SP]&larr;S[S[SP]] with no argument otherwise; for(i&larr;m-1; i>=0; i--) { S[SP+i]&larr;S[S[SP]+i]; } SP&larr;SP+m-1;",
		"description": 	"The value in memory refrenced by the address at the top of the stack, is" +
						"copied to the top of the stack.  If there is an optional argument <i>m</i>, then " +
						"that number of memory locations is copied to the top of the stack. " +
						"Note: <b>load</b> <i>m</i> where <i>m</i>=1 is equivalent to <b>load</b>.",
		"impl": 		
function(instr,vm){
	var addr = vm.pop().asIntOrPtr();
	if( instr.arg1 ) {
		var m = instr.argument1AsInt();
		for(var i=m-1; i>=0; i-- ) {
			var val = vm.S[addr-i];
			vm.push( val );
		}
	} else {
		var val = vm.S[addr];
		vm.push( val );
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
	if( instr.argu1 ) { 
		var m = instr.argument1AsInt();
		for(var i=0; i<m; i++ ) {
			vm.S[ vm.S[vm.SP].value + i ] = vm.S[vm.SP-m+i].value;
		}
		vm.SP = vm.SP-m-1;
	} else {
		var addr = vm.pop().asIntOrPtr();
		var val = vm.pop();
		vm.S[addr] = val;
	}
}
}

InstructionDefinition["loadrc"] = {
		"name": 		"loadrc",
		"displayName":	"loadrc q",
		"semantics": 	"SP&larr;SP+1; S[SP]&larr;FP+q",
		"description": 	"",
		"impl":			
function(instr,vm){
	var q = instr.argument1AsInt();
	vm.SP = vm.SP + 1;
	vm.S[vm.SP] = new Value("ptr", vm.FP+q);
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
	var q = instr.argument1AsInt();
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
	var q = instr.arg1;
	var a = vm.pop().asIntOrPtr();
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
	var q = instr.argument1AsInt();
	vm.SP = vm.SP + 1;
	vm.S[vm.SP] = vm.S[ vm.FP + q ];
}
}

InstructionDefinition["storer"] = {
		"name": 		"storer",
		"displayName":	"storer q",
		"semantics": 	"S[FP+q] &larr; S[SP]; ",
		"description": 	"Store the value at the top of the stack relative address q (FP+q)",
		"impl":			
function(instr,vm){
	var q = instr.argument1AsInt();
	vm.S[vm.FP+q] = vm.S[vm.SP];
}
}


InstructionDefinition["storerc"] = {
		"name": 		"storerc",
		"displayName":	"storer c",
		"semantics": 	"S[FP+q] &larr; S[SP]; ",
		"description": 	"Store the value at the top of the stack relative address q (FP+q)",
		"impl":			
function(instr,vm){
	var q = instr.argument1AsInt();
	vm.S[vm.FP+q] = vm.S[vm.SP];
}
}


