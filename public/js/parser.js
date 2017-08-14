
var errors;
var instructions;

function parseLine(line, lineNo) {
	
	var code =line.trim();
	var label = null;
	var arg = null;
	var arg2 = null;
	var comment = null;
	
	var t = line.indexOf(';');
	if( t>=0 ) {
		code = line.substring(0,t).trim(); // everything after the semi is a comment
		comment = line.substring(t+1).trim();
	} 
		
	if( code != '' ) {
		
		if( code.includes(':') ){  // then a label is defined
			var l = code.split(':');
			label = l[0].trim();
			code = l[1].trim();
		} else {
			code = code.trim();
		}
		
		if( code.includes(' ') ){  // then an argument is defined
			var l = code.split(' ');
			
			
			code = l[0].trim();
			var argVal = l[1].trim();
			
			if( isNaN(argVal) ) {
				//assume is a label
				arg = new Value("ptr", argVal );
			} else {
				if( argVal.includes('.') ){
					arg = new Value("float", Number(argVal) );
				} else {
					arg = new Value("int", Number(argVal) );
				}
			}
			
			if( l.length > 2 ) {
				
				
				// there is a second argument
				var arg2Val = l[2].trim();
				
				if( isNaN(arg2Val) ) {
					//assume is a label
					arg2 = new Value("ptr", arg2Val );
				} else {
					if( arg2Val.includes('.') ){
						arg2 = new Value("float", Number(arg2Val) );
					} else {
						arg2 = new Value("int", Number(arg2Val) );
					}
				}
			}
			
		}
		
		var def = InstructionDefinition[code];
		
		if (def) {
			var instr = new Instruction(def, arg, arg2, label, comment);
			instructions.push(instr);
		} else {
			errors.push("<p>Unrecognized instruction: " + code + " at line: " + lineNo + "</p>");
		}
	}

};



function parseProgram( str ){
	
	errors = [];
	instructions = [];
	
	var lines = str.split('\n');
	for( var l=0; l<lines.length; l++){
		
		var line = lines[l];
		parseLine(line, l);
	}
	
	return { "errors": errors, "instructions": instructions };
	
}