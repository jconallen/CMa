InstructionDefinition["jump"] = {
		"name": 		"jump",
		"displayName": 	"jump q",
		"semantics": 	"PC←q",
		"description": 	"Unconditional jump to instruction at q.  q may be a label reference.",
		"impl":			function(instr,vm){
							var q = vm.getAddressFromArgument(instr.arg1);
							vm.PC = q-1;  // sub 1 because vm process next instr will auto increment;
						}
}

InstructionDefinition["jumpz"] = {
		"name": 		"jumpz",
		"displayName": 	"jumpz q",
		"semantics": 	"if( S[SP] = 0 ) PC←q; SP←SP-1",
		"description": 	"Conditional jump to instruction at q.  If the value on top of the stack is zero then " +
						"set the next instruction to the label, or if an int then relative to the current PC. " +
						"Then decrement the stack pointer (SP)",
		"impl":			function(instr,vm){
							var q = vm.getAddressFromArgument(instr.arg1);
							if( vm.S[vm.SP].value == 0 ) {
								vm.PC = q; 
							}
							// decrement the SP
							vm.SP = vm.SP - 1;
						}
}

InstructionDefinition["jumpi"] = {
		"name": 		"jumpi",
		"displayName": 	"jumpi",
		"semantics": 	"PC←S[SP]+q; SP←SP-1",
		"description": 	"Jump indirect. The value pointed to by the address on top of the stack is added to " +
						"the argument q to determine the next value of the program counter (PC).",
		"impl":			function(instr,vm){
							var q = instr.argument1AsInt();
							vm.PC = vm.S[vm.SP].value + q - 1; // sub 1 because vm process next instr will auto increment;
							// decrement the SP
							vm.SP = vm.SP - 1;
						}
}

InstructionDefinition["call"] = {
		"name": 		"call",
		"displayName": 	"call q",
		"semantics": 	"FP←SP-q-1; S[FP]←PC; PC←S[SP]; SP←SP-1;",
		"description": 	"q is the number of formal parameters",
		"impl":			function(instr,vm){
			                var q = 0;
							if( instr.arg1 ) {
								q = instr.argument1AsInt();
							}
							vm.FP = vm.SP - q - 1;
							vm.S[vm.FP] = new Value("ptr", vm.PC);
							vm.PC = vm.S[vm.SP];
							vm.SP = vm.SP -1;
						}
}

InstructionDefinition["return"] = {
		"name": 		"return",
		"displayName": 	"return",
		"semantics": 	"PC←S[FP]; EP←S[FP-2]; SP←FP-3; FP←S[FP-1];",
		"description": 	"",
		"impl":			function(instr,vm){
							vm.PC = vm.S[vm.FP].value; 
							vm.EP = vm.S[vm.FP-2].value;
							vm.SP = vm.FP-3;
							vm.FP = vm.S[vm.FP-1].value;
						}
}


InstructionDefinition["halt"] = {
		"name": 		"halt",
		"displayName": 	"halt",
		"semantics": 	"",
		"description": 	"Stops the virtual machine.",
		"impl":			function halt(inst,vm){
							vm.halt();
							vm.PC = -1;
						}
}