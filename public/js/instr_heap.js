
InstructionDefinition["new"] = {
		"name": 		"new",
		"displayName": 	"new",
		"semantics": 	"S[SP] ← A Mark free cells A, A..., A + S[SP] - 1 as allocated",
		"description": 	"Allocates memory from the heap size of value on the stack.",
		"impl":			function _new(inst,vm){
							
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
		"displayName": 	"enter m",
		"semantics": 	"EP ← SP + m; if( EP>=HP ) error('Stack Overflow Error')",
		"description": 	"",
		"impl":			function _new(inst,vm){
							var m = inst.argument1AsInt();
							//vm.EP = vm.SP + m;
							if( vm.HP < vm.EP ) {
								throw "Stack Overflow.";
							}
						}
}
