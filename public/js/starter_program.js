

var starter_prog_src = 
	"loadc 7 \n" +
	"load ; comment\n" +
	"loadc 1 \n" +
	"add \n" +
	"loadc 4 \n" +
	"store \n" +
	"end: halt";

var starter_memory = [
	{ "address": 4, "value": 32 },
	{ "address": 7, "value": 12 },
];


var parsed_prog = parseProgram(starter_prog_src);

if( parsed_prog.errors.length>0 ) {
	alert('Error parsing starter program: ' + parsed_prog.error );
} 

var starter_prog = parsed_prog.instructions;
