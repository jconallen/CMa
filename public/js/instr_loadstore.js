
InstructionDefinition["loadc"] = {
		"name": 		"loadc",
		"displayName":	"loadc q",
		"semantics": 	"SP←SP+1; S[SP]←q",
		"description": 	"The stack pointer (SP) is incremented by one. The constant argument q is placed at the" +
						" on the stack at the position of the stack pointer.", 
		"impl": 		function(instr,vm){
							vm.push( instr.argument );
						}
}


InstructionDefinition["load"] = {
		"name": 		"load",
		"displayName":	"load m",
		"semantics": 	"for(i←m-1; i>=0; i--) { S[SP+i]←S[S[SP]+i]; } SP←SP+m-1;",
		"description": 	"The value in memory refrenced by the address at the top of the stack, is" +
						"copied to the top of the stack.  If there is an optional argument <i>m</i>, then " +
						"that number of memory locations is copied to the top of the stack. " +
						"Note: <b>load</b> <i>m</i> where <i>m</i>=1 is equivalent to <b>load</b>.",
		"impl": 		function(instr,vm){
							var addr = vm.pop().asIntOrPtr();
							if( instr.argument ) {
								var m = instr.argumentAsInt();
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
		"semantics": 	"for(i←0; i&lt;m; i++) { S[S[SP]+i]←S[SP-m+i]; } SP←SP+m-1;",
		"description": 	"At the location refrenced by the top of the stack, store the value " +
						"next on the stack.  If there is an argument, m, then store the m consequtive values " +
						"to the heap. ",
			"impl": 	function(instr,vm){
							if( instr.argument ) { 
								var m = instr.argumentAsInt();
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
		"semantics": 	"SP←SP+1; S[SP]←FP+q",
		"description": 	"",
		"impl":			function(instr,vm){
							var q = instr.argumentAsInt();
							vm.SP = vm.SP + 1;
							vm.S[vm.SP] = vm.FP+q;
						}
}

InstructionDefinition["loada"] = {
		"name": 		"loada",
		"displayName":	"loada q",
		"semantics": 	"SP←SP+1; S[SP]←S[q]",
		"description": 	"Put the value referenced by the address at the top of the stack, " +
						"on top of the stack.  Rquivalent to <b>loadc</b> q; <b>load</b>",
		"impl":			function(instr,vm){
							var q = instr.argumentAsInt();
							var v = vm.S[q];
							vm.push(v);
						}
}


InstructionDefinition["storea"] = {
		"name": 		"storea",
		"displayName":	"storea q",
		"semantics": 	"S[S[SP]] ← q; SP ← SP-1;",
		"description": 	"Store the value q at the location pointed to by the top of the stack.  Equivalent " +
						"to <b>loadc</b> q; <b>store</b>;",
		"impl":			function(instr,vm){
							var q = instr.argument;
							var a = vm.pop().asIntOrPtr();
							vm.S[a] = q;
						}
}

InstructionDefinition["loadr"] = {
		"name": 		"loadr",
		"displayName":	"loadr q",
		"semantics": 	"SP←SP+1; S[SP]←S[FP+q]",
		"description": 	"Put the value referenced by the address at the top of the stack, " +
						"on top of the stack.",
		"impl":			function(instr,vm){
							var q = instr.argument;
							if( q.type == "int" || q.type == "ptr" ) {
								vm.SP = vm.SP + 1;
								vm.S[vm.SP] = vm.S[ vm.FP + q.value ];
							} else {
								throw "Memory reference value not an int or ptr.  Unable to load.";
							}
			
							
						}
}

InstructionDefinition["storer"] = {
		"name": 		"storer",
		"displayName":	"storer q",
		"semantics": 	"SP[FP+q] ← S[SP]",
		"description": 	"Store relative the value q at the location pointed to by the top of the stack.  Equivalent " +
						"to <b>loadc</b> q; <b>store</b>",
		"impl":			function(instr,vm){
							var addr = instr.argument;
							if( addr.type == "int" || addr.type == "ptr" ) {
								var val = vm.S[addr.value];
								vm.push( val );
							} else {
								throw "Memory reference value not an int or ptr.  Unable to load.";
							}
						}
}


