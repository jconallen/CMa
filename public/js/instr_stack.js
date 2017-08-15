
InstructionDefinition["mark"] = {
		"name": 		"mark",
		"displayName":	"mark",
		"semantics": 	"S[SP+1]←EP; S[SP+2]←FP; SP←SP+2;",
		"description": 	"Start a new stack frame.  Put the FP and EP on top of the stack.", 
		"impl": 		function(instr,vm){
							vm.S[vm.SP+1] = new Value("ptr", vm.EP);
							vm.S[vm.SP+2] = new Value("ptr", vm.FP);
							vm.S[vm.SP+3] = new Value("ptr", 0 ); // for the PC
							vm.SP = vm.SP + 3;
						}
}


InstructionDefinition["dup"] = {
		"name": 		"dup",
		"displayName":	"dup",
		"semantics": 	"SP←SP+1;S[SP]←S[SP-1]",
		"description": 	"Duplicate the value on top of the stack.", 
		"impl": 		function(instr,vm){
							vm.SP = vm.SP + 1;
							vm.S[vm.SP] = vm.S[vm.SP-1];
						}
}


InstructionDefinition["alloc"] = {
		"name": 		"alloc",
		"displayName":	"alloc q",
		"semantics": 	"SP←SP+q",
		"description": 	"Increment the SP by the amount q.", 
		"impl": 		function(instr,vm){
							var q = instr.argument1AsInt();
							vm.SP = vm.SP + q;
						}
}

InstructionDefinition["slide"] = {
		"name": 		"slide",
		"displayName":	"slide q m",
		"semantics": 	"SP←SP+q",
		"description": 	"", 
		"impl": 		function(instr,vm){
			
							var q = instr.argument1AsInt();
							var m = instr.argument2AsInt();
			
							if(q>0 ) {
								if(m==0) sp = sp-q;
								else {
									sp = sp-q-m
									for(i=0;i<m;i++){
										sp++;
										s[sp] = s[sp+q]
									}
								}
							}
							vm.SP = vm.SP + q;
						}
}

