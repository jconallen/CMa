// globals

var InstructionDescriptions = {};

class Instruction {
	
	constructor( impl, argument, label ) {
		this.impl = impl;
		this._argument = argument;
		this._label = label;
		this._breakpoint = false;
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
			if( this.argument.type=="label" ) {
				str += " <i>" + this.argument.toString() + "</i>";
			} else {
				str += " " + this.argument.toString();
			}
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
	
	get name(){
		this.impl.name;
	}
	
	get description(){
		var descr = InstructionDescriptions[this.impl.name];
		return descr;
	}
	
	get breakpoint(){
		return this._breakpoint;
	}
	
	toggleBreakpoint(){
		this._breakpoint = !this._breakpoint;
		return this._breakpoint;
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
		} else if( this.type=="float" ){
			if( this.value % 1 ){				
				str += this.value;
			} else {
				str += this.value + ".0"; 
			}
		} else if( this.type=="ptr" ) {
			str += "*" + this.value;
		} else if( this.type=="label" ) {
			str += this.value;
		} else {
			str += "UNKNOWN";
		}
		return str;
	}
	
};

const NULL_VALUE = new Value("int", 0 );
const NOP = new Instruction(null,null,null);


class VirtualMachine {

	constructor( ProgramStoreSize, MainMemorySize, MaxStackSize ){
		this.MAIN_MEMORY_SIZE = MainMemorySize;
		this.PROGRAM_STORE_SIZE = ProgramStoreSize;
		this.MAX_STACKSIZE = MaxStackSize;
		
		this.C = [];  // Program Store
		
		for(var i=0; i<this.PROGRAM_STORE_SIZE; i++) {
			this.C.push(NOP);
		}
		
		this.running = false;
		this.restart();
	}
	
	get HeapSize(){
		return this.MAIN_MEMORY_SIZE-this.MAX_STACKSIZE+1;
	}
	
	get currentInstruction(){
		return this.C[this.PC];
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
		
		this.S_Stack = [];  
		
		for(var i=0; i<this.MAX_STACKSIZE; i++) {
			this.S_Stack.push(NULL_VALUE);
		}

		var heapSize = this.MAIN_MEMORY_SIZE-this.MAX_STACKSIZE+1;
		this.S_Heap = [];  

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
		this.S_Stack[this.SP] = NULL_VALUE;
		this.SP--;
		return v;
	}

	push(value) {
		this.SP++;
		this.S_Stack[this.SP] = value;
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
	
	getAddress(label){
		for(var i=0; i<this.PROGRAM_STORE_SIZE; i++) {
			var instr = this.C[i];
			if( label == instr._label ){
				return i;
			}
		}
		return -1;
	}
	
}

