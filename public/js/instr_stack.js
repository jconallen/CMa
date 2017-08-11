
InstructionDefinition["mark"] = {
		"name": 		"mark",
		"displayName":	"mark",
		"semantics": 	"SP←SP+4; S[SP-2]←EP; S[SP-1]←FP",
		"description": 	"", 
		"impl": 		function(instr,vm){
			
							vm.SP = vm.SP + 4;
							vm.S[vm.SP-2] = vm.EP;
							vm.S[vm.SP-1] = vm.FP;
							
			
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
