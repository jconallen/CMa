// PC←q

InstructionDescriptions["loadc"] = {
		"name": "jump q",
		"semantics": "PC←q",
		"description": "Unconditional jump to value specified by the argument."
}
	
function jump(instr,vm){
	vm.SP = instr.value;
}