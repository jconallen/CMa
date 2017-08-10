function loadc(instr,vm){
	
	var stackValue = new StackValue(instr.argument, null);
	vm.push( stackValue );
}

function add(instr,vm){

	var a = vm.pop();
	var b = vm.pop();
	
	var c = Number(a) + Number(b);
	
	var value = new Value( "int", c );
	var sv = new StackValue( value, null );
	vm.push(sv);
	
}

function print(inst,vm){
	// send the value on top of the stack to std out
	var a = vm.pop();
	vm.print(a.value.toString());
	
}

function halt(inst,vm){
	// stop processing - disable the execute button
	vm.halt();
	
}