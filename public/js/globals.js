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
		var str =  '<b>' + this.name() + '</b>';
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
	
	name(){
		if( this.impl.name.startsWith("_") ) {
			return this.impl.name.substring(1);
		}
		return this.impl.name;
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
		this.MAX_STACK_SIZE = MaxStackSize;
		
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
		this.EP = this.MAX_STACK_SIZE;
		this.HP = this.MAIN_MEMORY_SIZE - 1 ;
		
		this.out = "";
		this.err = "";
		this.running = true;
		
		this.S = [];  
		
		for(var i=0; i<this.MAIN_MEMORY_SIZE; i++){
			this.S[i] = NULL_VALUE;
		}
		

	}
	
	loadProgram( program ) {
		for( var i=0; i <program.length; i++ ){
			var instr = program[i];
			this.C[i] = instr;
		}
	}
	
	pop() {
		if( this.SP < 0 ) {
			throw "Stack underflow.  Attempt to pop on empty stack.";
		}
		var v = this.S[this.SP];
		this.S[this.SP] = NULL_VALUE;
		this.SP--;
		return v;
	}

	peek() {
		if( this.SP < 0 ) {
			throw "Stack underflow.  Attempt to pop on empty stack.";
		}
		var v = this.S[this.SP];
		return v;
	}

	push(value) {
		if( this.SP >= this.EP ) {
			throw "Stack overflow.  Attempt to push on full stack.";
		}
		this.SP++;
		this.S[this.SP] = value;
	}
	
	print( value ) {
		this.out += value.toString();
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

