
InstructionDescriptions["loadc"] = "This is a <b>description</b> about the load constant";
	
function loadc(instr,vm){
	vm.push( instr.argument );
}

InstructionDescriptions["add"] = "This is a description about the add operation.";
function add(instr,vm){

	var a = vm.pop();
	var b = vm.pop();
	
	var c = Number(a) + Number(b);
	
	var value = new Value( "int", c );
	vm.push(value);
	
}

InstructionDescriptions["print"] = "Prints the top of the stack to the std out";

function print(inst,vm){
	// send the value on top of the stack to std out
	var a = vm.pop();
	vm.print(a.toString());
	
}

InstructionDescriptions["halt"] = "Stops execution.  You can only reset to start again.";

function halt(inst,vm){
	// stop processing - disable the execute button
	vm.halt();
	
}