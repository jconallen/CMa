
InstructionDefinition["mark"] = {
		"name": 		"mark",
		"displayName":	"mark",
		"semantics": 	"SP←SP+4; S[SP-2]←EP; S[SP-1]←FP",
		"description": 	"", 
		"impl": 		function(instr,vm){
			
							vm.SP = vm.SP + 4;
							vm.S[vm.SP-2] = vm.EP;
							vm.S[vm.SP-1] = vm.FP;
							
							vm.SP = vm.SP + 1; // compensate for auto increment
			
						}
}
