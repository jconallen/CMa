
var errors;
var instructions;

function parseLine(line, lineNo) {
	
	var code =line.trim();
	var label = null;
	var arg = null;
	var comment = null;
	
	var t = line.indexOf(';');
	if( t>0 ) {
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
				arg = new Value("label", argVal );
			} else {
				if( argVal.includes('.') ){
					arg = new Value("float", Number(argVal) );
				} else {
					arg = new Value("int", Number(argVal) );
				}
			}
		}
		
		var def = InstructionDefinition[code];
		
		if (def) {
			var instr = new Instruction(def, arg, label, comment);
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