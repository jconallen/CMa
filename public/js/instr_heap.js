
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
	vm.push( new Value("ptr", hp) );
}
}

InstructionDefinition["enter"] = {
		"name": 		"enter",
		"displayName": 	"enter",
		"semantics": 	"EP &larr; SP + m;",
		"description": 	"Not really sure what this instruction is intended for.  In fact, I still can't figure out " +
				"why the EP register exists at all.  What's the big deal with just checking to see if the SP and HP overlap?",
		"impl":			
function _new(inst,vm){
	var m = inst.argument1AsInt();
	vm.EP = vm.SP + m;
//	if( vm.HP < vm.EP ) {
//		throw "Stack Overflow.";
//	}
}
}
