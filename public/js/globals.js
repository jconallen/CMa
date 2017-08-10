// globals

class Instruction {
	
	constructor( impl, argument, label ) {
		this.impl = impl;
		this._argument = argument;
		this._label = label;
	};
	
	toString(){
		var str =  this.impl.name;
		if( this.argument ) {
			str += " " + this.argument.toString();
		} 
		return str;
	};
	
	toFormattedString(){
		var str =  '<b>' + this.impl.name + '</b>';
		if( this.argument ) {
			str += " " + this.argument.toString();
		} 
		return str;
	};
	
	get label(){
		if( !this._label ) return ""; 
		return this._label+':';
	}
	
	get argument(){
		return this._argument;
	}
	
};

class StackValue {
	constructor( value, variable ){
		this.value = value;
		this.variable = variable;
	}
	
	toString(){
		return " " + this.value.toString();
	}
	
};


class Value {
	constructor( type, value ){
		this.type = type;
		this.value = value;
	}
	
	toString(){
		
		var str = "";
		if( this.type=="int" ){
			str += this.value;
		} else if( this.type="float" ){
			if( this.value % 1 ){				
				str += this.value;
			} else {
				str += this.value + ".0"; 
			}
		} else if( this.type="ptr" ) {
			str += "*" + this.value;
		} else {
			str += "UNKNOWN";
		}
		return str;
	}
	
};

const NULL_VALUE = new Value("int", 0 );
const NULL_STACK_VALUE = new StackValue( NULL_VALUE, null);
const NOP = new Instruction(null,null,null);


class VirtualMachine {

	constructor( MainMemorySize, ProgramStoreSize, MaxStackSize ){
		this.MAIN_MEMORY_SIZE = MainMemorySize;
		this.PROGRAM_STORE_SIZE = ProgramStoreSize;
		this.MAX_STACKSIZE = MaxStackSize;
		
		this.C = [this.PROGRAM_STORE_SIZE];  // Program Store
		
		for(var i=0; i<this.PROGRAM_STORE_SIZE; i++) {
			this.C.push(NOP);
		}
		
		this.running = false;
		this.restart();
	}
	
	get HeapSize(){
		return this.MAIN_MEMORY_SIZE-this.MAX_STACKSIZE;
	}

	isRunning() {
		return this.running;
	}
	
	executeNextInstruction() {
		
		if( this.running) {
			// get next instruction, invoke implementation with a reference to the instr and vm
			var instr = this.C[this.PC];
			
			if( instr.impl.name != "halt" ) {
				// perform the instruction
				instr.impl( instr, this );
				
				// increment the program counter
				this.PC += 1;
			} else {
				this.running = false;
				this.out = '\nMachine halted';	
			}
		} 
		
	}
	
	restart(){
		this.PC = 0;
		this.FP = -1;
		this.SP = -1;
		this.EP = this.MAX_STACKSIZE;
		this.HP = this.MAIN_MEMORY_SIZE - 1 ;
		
		this.out = "";
		this.running = true;
		
		this.S_Stack = [this.MAX_STACKSIZE];  
		
		for(var i=0; i<this.MAX_STACKSIZE; i++) {
			this.S_Stack.push(NULL_STACK_VALUE);
		}

		var heapSize = this.MAIN_MEMORY_SIZE-this.MAX_STACKSIZE;
		this.S_Heap = [heapSize];  

		for(var i=0; i<heapSize; i++) {
			this.S_Heap.push(NULL_VALUE);
		}
	}
	
	loadProgram( program ) {
		for( var i=0; i <program.length; i++ ){
			var instr = program[i];
			this.C[i] = instr;
		}
	}
	
	pop() {
		var v = this.S_Stack[this.SP];
		this.S_Stack[this.SP] = NULL_STACK_VALUE;
		this.SP--;
		return v;
	}

	push(stackValue) {
		this.SP++;
		this.S_Stack[this.SP] = stackValue;
	}
	
	print( value ) {
		this.out += value;
	}
	
	eatOutput(){
		var buf = this.out;
		this.out = ""
		return buf;
	}

	halt(){
		this.running = false;
	}
	
}

