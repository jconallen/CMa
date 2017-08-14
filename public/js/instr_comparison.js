
InstructionDefinition["leq"] = {
		"name": 		"leq",
		"displayName":	"leq",
		"semantics": 	"S[SP-1] ← S[SP-1] ≤ S[SP]; SP ← SP - 1",
		"description": 	"", 
		"impl": 		function(instr,vm){
							var a = vm.S[vm.SP-1];
							var b = vm.S[vm.SP];
							if( a <= b ) {
								vm.SP = vm.SP -1;
							}
						}
}
