
InstructionDefinition["leq"] = {
		"name": 		"leq",
		"displayName":	"leq",
		"semantics": 	"S[SP-1] ← S[SP-1] ≤ S[SP]; SP ← SP - 1",
		"description": 	"", 
		"impl": 		function(instr,vm){
							var a = vm.pop();
							var b = vm.pop();
							if( b <= a ) {
								vm.push( new Value("int", 1 ) );
							} else {
								vm.push( new Value("int", 0 ) );
							}
							
							// decrement the SP
							vm.SP = vm.SP - 1;
						}
}
