
InstructionDefinition["new"] = {
		"name": 		"new",
		"displayName": 	"new",
		"semantics": 	"S[SP] &larr; A Mark free cells A, A..., A + S[SP] - 1 as allocated",
		"description": 	"Allocates memory from the heap size of value on the stack.",
		"impl":			
function _new(inst,vm){
	var m = vm.pop();
	var hp = vm.HP-m;
	
	if( hp< vm.EP ) {
		throw "Out of memory error.  Attempt to allocate memory from heap; EP=" + vm.EP + " HP=" + vm.HP + ".";
	}
	
	vm.HP = hp;
	vm.push( new Value(hp) );
}
}

InstructionDefinition["enter"] = {
		"name": 		"enter",
		"displayName": 	"enter m",
		"semantics": 	"EP &larr; SP + m; if( HP < EP ) error(Stack Overflow);",
		"description": 	"Push up the EP register.  This puts an upper limit on the expected use of the stack during " +
				"the next stack frame.  The value m should include memory space for the return value, stack frame " +
				"(EP, FP, PC) formal parameters, local variables and any additional stack usage needed to do the math.",
		"impl":			
function _new(inst,vm){
	var m = inst.arg(0).asInt();
	vm.EP = vm.SP + m;
	if( vm.EP >= vm.HP ) {
		throw "Stack Overflow.";
	}
}
}
