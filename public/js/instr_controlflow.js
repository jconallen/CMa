InstructionDefinition["jump"] = {
		"name": 		"jump",
		"displayName": 	"jump q",
		"semantics": 	"PC←q",
		"description": 	"Unconditional jump to instruction at q.  q may be a label reference.",
		"impl":			function(instr,vm){
							var q = vm.getAddressFromArgument(instr.argument);
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
							var q = vm.getAddressFromArgument(instr.argument);
							if( vm.S[vm.SP] == 0 ) {
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
							var q = instr.argumentAsInt();
							vm.PC = vm.S[vm.SP].value + q - 1; // sub 1 because vm process next instr will auto increment;
							// decrement the SP
							vm.SP = vm.SP - 1;
						}
}

InstructionDefinition["call"] = {
		"name": 		"call",
		"displayName": 	"call",
		"semantics": 	"FP←SP; tmp←PC; PC←S[SP]; S[SP]←tmp;",
		"description": 	"",
		"impl":			function(instr,vm){
							vm.FP = vm.SP;
							var tmp = vm.PC;
							vm.PC = vm.S[vm.SP];
							vm.S[vm.SP] = tmp;
						}
}

InstructionDefinition["return"] = {
		"name": 		"return",
		"displayName": 	"return q",
		"semantics": 	"PC←S[FP]; EP←S[FP-2]; if(EP>=HP) error(Stack Overflow); SP←FP-q; FP←S[FP-1];",
		"description": 	"",
		"impl":			function(instr,vm){
							var q = instr.argumentAsInt();
							vm.PC = vm.S[vm.FP]; 
							vm.EP = vm.S[vm.FP-2];
							if( vm.EP >= vm.HP ) throw "Stack Overflow";
							vm.SP = vm.FP-q;
							vm.FP = vm.S[vm.FP-1];
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