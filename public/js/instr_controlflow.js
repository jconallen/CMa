InstructionDefinition["jump"] = {
		"name": 		"jump",
		"displayName": 	"jump q",
		"semantics": 	"PC←q",
		"description": 	"Unconditional jump to instruction at q.",
		"impl":			function(instr,vm){
							var q = instr.argument;
							if( q.type=="label" ) {
								var addr = vm.getAddress(q.value);
								vm.PC = addr-1; // because the machine will auto increment PC after this instruction
							} else if( q.type=="int" ){
								vm.PC = q.value-1;
							}
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
							var q = instr.argument;
							var cond = vm.pop();
							if( cond.value == 0 ) {
								vm.PC = q.value-1;
							}
						}
}

InstructionDefinition["jumpi"] = {
		"name": 		"jumpi",
		"displayName": 	"jumpi",
		"semantics": 	"if( S[SP] = 0 ) PC←S[SP]+q; SP←SP-1",
		"description": 	"Jump indirect. The value ontop of the stack is added to the contstant q to determine " +
				"the next value of the program counter (PC).",
		"impl":			function(instr,vm){
							var q = instr.argument;
							var relAddr = vm.pop();
							var jmpAddr = q.value+relAddr.value;
							vm.PC = jmpAddr-1;  // remember that the vm will increment the pc after this invocation
						}
}

InstructionDefinition["call"] = {
		"name": 		"call",
		"displayName": 	"call q",
		"semantics": 	"FP←SP-q-1;S[FP]←PC;PC←S[SP];SP←SP-1",
		"description": 	"",
		"impl":			function(instr,vm){
							var q = instr.argument;
							var addr;
							if( q.type=="label" ) {
								addr = vm.getAddress(q.value);
							} else if( q.type=="int" ){
								addr = q.value;
							}
							vm.FP = vm.SP - addr - 1;
							vm.S[vm.SP] = vm.PC;
							vm.PC = vm.S[vm.SP];							 
						}
}

InstructionDefinition["return"] = {
		"name": 		"return",
		"displayName": 	"return",
		"semantics": 	"PC←S[FP];EP←S[FP-2];SP←FP-3;FP←S[SP+2]",
		"description": 	"",
		"impl":			function(instr,vm){
							var q = instr.argument;
							var addr;
							if( q.type=="label" ) {
								addr = vm.getAddress(q.value);
							} else if( q.type=="int" ){
								addr = q.value;
							}
							vm.PC = vm.S[vm.FP];
							vm.EP = vm.S[vm.FP-2];
							vm.SP = vm.FP-3;
							vm.FP = vm.S[vm.SP+2];
							vm.SP = vm.SP +1;  // remember it will decrement automatically
						}
}


InstructionDefinition["halt"] = {
		"name": 		"halt",
		"displayName": 	"halt",
		"semantics": 	"",
		"description": 	"Stops the virtual machine.",
		"impl":			function halt(inst,vm){
							vm.halt();
						}
}