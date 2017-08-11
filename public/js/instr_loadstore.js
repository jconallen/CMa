
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
		"displayName":	"loadc",
		"semantics": 	"S[SP] ← S[S[SP]]",
		"description": 	"The value in memory refrenced by the address at the top of the stack, is" +
						"copied to the top of the stack.",
		"impl": 		function(instr,vm){
							var addr = vm.pop();
							if( addr.type == "int" || addr.type == "ptr" ) {
								var val = vm.S[addr.value];
								vm.push( val );
							} else {
								throw "Memory reference value not an int or ptr.  Unable to load.";
							}
						}
}

InstructionDefinition["store"] = {
		"name": "store",
		"displayName":	"store",
		"semantics": 	"S[S[SP]] ← S[SP-1]; SP ← SP - 1",
		"description": 	"At the location refrenced by the top of the stack, store the value " +
						"next on the stack.",
			"impl": 	function(instr,vm){
							var addr = vm.pop().value;
							var val = vm.pop();
							vm.S[addr] = val;
						}
}

InstructionDefinition["loada"] = {
		"name": 		"loada",
		"displayName":	"loada q",
		"semantics": 	"SP←SP+1; S[SP]←S[q]",
		"description": 	"Put the value referenced by the address at the top of the stack, " +
						"on top of the stack.  Rquivalent to <b>loadc</b> q; <b>load</b>",
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


InstructionDefinition["storea"] = {
		"name": 		"storea",
		"displayName":	"storea q",
		"semantics": 	"SP[q] ← S[SP]",
		"description": 	"Store the value q at the location pointed to by the top of the stack.  Equivalent " +
						"to <b>loadc</b> q; <b>store</b>",
		"impl":			function(instr,vm){
							var addr = instr.argument;
							if( addr.type == "int" || addr.type == "ptr" ) {
								var val = vm.S[addr.value];
								vm.push( val );
							} else {
								throw "Memory reference value not an int or ptr.  Unable to storea.";
							}
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
		"semantics": 	"SP[FP + q] ← S[SP]",
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


