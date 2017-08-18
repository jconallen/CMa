// globals

var InstructionDefinition = {};

class Argument {
	constructor( value, type ){
		if( type == undefined ) {
			type = "int";
		}
		// type can be "int", "float", "char", "label"
		if( type != "int" && type != "float" && type != "char" && type != "label"){
			throw "Invalid type '" + type + "' intializing Value";
		}

		this._type = type;
		this._value = value;
	}
	
	get type(){
		return this._type;
	}
	
	get value(){
		if( this.isLabel() ) {
			throw "Unable to create value from label.";
		}
		var v = new Value(this._value, this._type );
		return v;
	}
	
	get label(){
		if( !this.isLabel() ) {
			throw "Not a label.";
		}
		return this._value;
	}
	
	asInt(){
		if( this._type == 'label' ) {
			throw "Argument type is label and can not be directly converted to int";
		}
		return parseInt(this._value);
	}
	
	asChar(){
		if( this._type == 'label' ) {
			throw "Argument type is label and can not be directly converted to char";
		}
	
		if( this._value == parseInt(this._value) ){
			String.fromCharCode(this.value);
		}
	}
	
	isLabel(){
		return this._type=='label';
	}
	
	toString(){
		var str = "";
		if( this._type=="int" ){
			str += this._value;
		} else if( this._type=="float" ){
			if( this._value % 1 ){				
				str += this._value;
			} else {
				str += this._value + ".0"; 
			}
		} else if( this._type=="char" ) {
			str += "'" + String.fromCharCode(this._value) + "'";
		} else if( this._type=="label" ) {
			str += this.label;
		} 
		return str;
	}
	
}

class Instruction {
	
	constructor( def ) {
		this._def = def;
		this._args = [];
		this._label = null;
		this._breakpoint = false;
		this._comment = null;
	};
	
	toString(){
		var str =  this.def.name;
		if( this.argument ) {
			str += " " + this.argument.toString();
		} 
		return str;
	};
	
	get label(){
		if( this._label ) {
			return this._label;
		};
		return "";
	}
	
	set label(val){
		this._label = val;
	}
	
	get name(){
		return this._def.name;
	}
	
	set name(val) {
		return this._name = val;
	}
	
	get comment(){
		if( this._comment ) {
			return this._comment;
		};
		return "";
	}

	set comment(val){
		this._comment = val;
	}

	get def(){
		return this._def;
	}
	
	set def(val) {
		this._def = val;
	}
	
	get args(){
		return this._args;
	}
	
	arg(i){
		if( i>=this._args.length || i<0 ){
			throw "Invalid argument index " + i + " args[" + this._args.length + "]";
		}
		return this._args[i];
	}
	
	hasArg(i){
		return (i<this._args.length && i>0);
	}
	
	addArg( arg ){
		this._args.push( arg );
	}
	
	argAsInt(i){
		if( i>=this._args.length || i<0 ){
			throw "Invalid argument index " + i + " args[" + this._args.length + "]";
		}
		return this._args[i].asInt();
	}
	
	argAsValue(i){
		if( i>=this._args.length || i<0 ){
			throw "Invalid argument index " + i + " args[" + this._args.length + "]";
		}
		var a = this._args[i];
		if( a._type == "label") {
			throw "Can not convert a argument of type label to a stack value.";
		}
		var v = new Value(a._value, a._type);
		return v;
	}
	
	toFormattedString(){
		if( this._def ) {
			var str =  '<b>' + this._def.name + '</b>';
			for(var i=0; i<this._args.length; i++){
				str += " " + this._args[i].toString();
			}			
			return str;
		}
		
		return "-";
		
	};
		
	toggleBreakpoint(){
		this.breakpoint = !this.breakpoint;
		return this.breakpoint;
	}
	
};

class Value {
	constructor( value, type ){
		if( type == undefined ) {
			type = "int";
		}
		// valid types are "int" "float" "char"
		if( type != "int" && type != "float" && type != "char" ){
			throw "Invalid type '" + type + "' intializing Value";
		}
		this.type = type;
		this.value = value;
	}
	
	asInt(){
		if( this.type == "int" || this.type == "char") {
			return this.value;
		} else {
			throw 'Value expected to be an int or char, not float.';
		}
	}
	
	isNumber(){
		return this._type=='int' || this._type=='float';
	}
	
	isChar(){
		return this._type=="char";
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
		} else if( this.type=="char" ) {
			str += "'" + String.fromCharCode(this.value) + "'";
		} 
		return str;
	}
	
};

const NOP = new Instruction(null,null,null);

const NULL_VALUE = new Value( 0 );
const TRUE = new Value( 1 );
const FALSE = new Value( 0 );


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
		this.memory = null;
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
	
	isNextInstructionBreakpoint() {
		var instr = this.C[this.PC];
		return instr.breakpoint;
	}
	
	executeNextInstruction() {
		
		if( this.running) {

			// get next instruction, invoke implementation with a reference to the instr and vm
			var instr = this.C[this.PC];
			
			this.PC++;

			// perform the instruction
			instr.def.impl( instr, this );

		} 
		
	}
	
	restart(){
		this.PC = 0;
		this.FP = 0;
		this.SP = -1;
		this.EP = this.MAX_STACK_SIZE;
		this.HP = this.MAIN_MEMORY_SIZE;
		
		this.out = "";
		this.err = "";
		this.running = true;
		
		this.S = [];  
		
		for(var i=0; i<this.MAIN_MEMORY_SIZE; i++){
			this.S[i] = NULL_VALUE;
		}

		if( this.memory ) {
			// now update main memory with the supplied values
			for( var i=0; i<this.memory.length; i++ ) {
				var v = this.memory[i];
				this.S[v.address] = v.value;
			}	
		}
		
	}
	
	loadProgram( program, memory ) {
		this.memory = memory;
		
		for( var i=0; i <program.length; i++ ){
			var instr = program[i];
			this.C[i] = instr;
		}
		for( var i=program.length; i<this.PROGRAM_STORE_SIZE; i++){
			this.C[i] = NOP;
		} 
		
		restart();
		
	}
	
	getSource(){
		return serializeProgram(this.C);
	}
	
	pop() {
		if( this.SP < 0 ) {
			throw "Stack underflow.  Attempt to pop on empty stack.";
		}
		var v = this.S[this.SP];
		this.SP--;
		return v;
	}

	peek() {
		if( this.SP < 0 ) {
			throw "Stack underflow.  Attempt to peek empty stack.";
		}
		var v = this.S[this.SP];
		return v;
	}

	push(value) {
//		if( this.SP >= this.EP ) {
//			throw "Stack overflow.  Attempt to push on full stack.";
//		}
		this.SP++;
		this.S[this.SP] = value;
	}
	
	print( value ) {
		if( value.type == "char" ) {
			this.out += String.fromCharCode(value.value);
		} else {
			this.out += value.toString();
		}
		
	}
	
	eatOutput(){
		var buf = this.out;
		this.out = ""
		return buf;
	}

	halt(){
		this.running = false;
		this.out += '\nMachine halted';	
	}
	
	getAddressFromArgument(arg){
		if( arg.isLabel() ) {
			for(var i=0; i<this.PROGRAM_STORE_SIZE; i++) {
				var instr = this.C[i];
				if( arg.label == instr.label ){
					return i;
				}
			}
		} else if( arg.type=="int" ){
			return arg.value;
		}
		throw "Error: unable to convert label to physical address.";
	}
	
}

