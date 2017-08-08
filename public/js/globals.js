// globals

// CMa machine parameters

const MAIN_MEMORY_SIZE = 1024;
const PROGRAM_STORE_SIZE = 256;
const MAX_STACKSIZE = 512;

//---------------------------

var PC = 0;
var FP = -1;
var SP = 0;
var EP = MAX_STACKSIZE;
var HP = MAIN_MEMORY_SIZE - 1 ;

var C = [PROGRAM_STORE_SIZE];  // Program Store

var S = [MAIN_MEMORY_SIZE];  // Main Memory

class Instruction {
	
	constructor( impl, argument, label ) {
		this.impl = impl;
		this.argument = argument;
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
		} else if( type="float" ){
			str += this.value + "f";  // todo just rely on decimal
		} else if( type="ptr" ) {
			str += "*" + this.value;
		} else {
			str += "UNKNOWN";
		}
		return str;
	}
}

