InstructionDefinition["jump"] = {
		"name": 		"jump",
		"displayName": 	"jump q",
		"semantics": 	"PC&larr;q",
		"description": 	"Unconditional jump to instruction at q.  q may be a label reference.",
		"impl":			
function(instr,vm){
	var q = vm.getAddressFromArgument(instr.arg(0));
	vm.PC = q;  
}
}

InstructionDefinition["jumpz"] = {
		"name": 		"jumpz",
		"displayName": 	"jumpz q",
		"semantics": 	"if( S[SP] = 0 ) PC&larr;q; SP&larr;SP-1",
		"description": 	"Conditional jump to instruction at q.  If the value on top of the stack is zero then " +
						"set the next instruction to the label, or if an int then relative to the current PC. " +
						"Then decrement the stack pointer (SP)",
		"impl":			
function(instr,vm){
	var q = vm.getAddressFromArgument(instr.arg(0));
	if( vm.S[vm.SP].value == 0 ) {
		vm.PC = q; 
	}
	vm.SP = vm.SP - 1;
}
}

InstructionDefinition["jumpi"] = {
		"name": 		"jumpi",
		"displayName": 	"jumpi q",
		"semantics": 	"PC&larr;S[SP]+q; SP&larr;SP-1",
		"description": 	"Jump indirect. The value pointed to by the address on top of the stack is added to " +
						"the argument q to determine the next value of the program counter (PC).",
		"impl":			
function(instr,vm){
	var q = instr.arg(0).asInt();
	vm.PC = vm.S[vm.SP].value + q; 
	vm.SP = vm.SP - 1;
}
}

InstructionDefinition["call"] = {
		"name": 		"call",
		"displayName": 	"call q",
		"semantics": 	"FP&larr;SP-q-1; S[FP]&larr;PC; PC&larr;S[SP]; SP&larr;SP-1;",
		"description": 	"Calls the function referenced by the address on top of the stack. " +
				"First update the frame pointer (FP) with the stack pointer (SP) adjusted " +
				"by q, the number of formal parameters, or more accurately the size of memory " +
				"holding the formal parameters minus one.  Then store the current program counter " +
				"at the location of the frame pointer. Next, change the program counter to point to " +
				"the first instruction of the function being called.  Finally decrement the stack " +
				"by one (eating up the address of the function).",
		"impl":			
function(instr,vm){
    var q = 0;
	if( instr.arg(0) ) {
		q = instr.arg(0).asInt();
	}
	vm.FP = vm.SP - q - 1;
	vm.S[vm.FP] = new Value(vm.PC);
	vm.PC = vm.S[vm.SP];
	vm.SP = vm.SP - 1;
}
}

InstructionDefinition["return"] = {
		"name": 		"return",
		"displayName": 	"return",
		"semantics": 	"PC&larr;S[FP]; EP&larr;S[FP-2]; SP&larr;FP-3; FP&larr;S[FP-1];",
		"description": 	"Returns program control back to the calling function. The program counter is " +
				"updated with the value that was last stored in the stack frame, currently pointed to " +
				"by the frame pointer (FP). Next, the extreme pointer is updated with the value cached in " +
				"the stack frame. The stack pointer is updated to point to the return value of the function, " +
				"or if there is no return value the top of the stack of teh previous stack frame. Finally, the " +
				"frame pointer is updated with the cached value.",
		"impl":			
function(instr,vm){
	vm.PC = vm.S[vm.FP].value; 
	vm.EP = vm.S[vm.FP-2].value;
	if( vm.EP >= vm.HP ) throw "Stack Overflow";
	vm.SP = vm.FP-3;
	vm.FP = vm.S[vm.FP-1].value;
}
}


InstructionDefinition["halt"] = {
		"name": 		"halt",
		"displayName": 	"halt",
		"semantics": 	"",
		"description": 	"Stops the virtual machine. The program counter is set to -1.  A message is printed in the output.",
		"impl":			
function halt(inst,vm){
	vm.halt();
	vm.PC = -1;
}
}