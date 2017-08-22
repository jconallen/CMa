
var errors;
var instructions;

function parseLine(line, lineNo) {
	
	var code;
	var label = null;
	var comment = null;
	var memset = null;
	
	var t = line.indexOf(';');
	if( t>=0 ) {
		code = line.substring(0,t).trim(); // everything after the semi is a comment
		comment = line.substring(t+1).trim();
		var i = comment.indexOf('#MEMSET ');
		if( i>=0 ) {
			// we have a memory set command
			i = i+8;
			var addr;
			var val;
			var label;

			var exp = comment.substring(8);
			var labelSeps = exp.split(':'); // separate the label
			if( labelSeps.length>1 ) {
				label = labelSeps[0].trim();
				exp = labelSeps[1].trim();
			}
			
			var cmdIdx = exp.indexOf('S[');
			if( cmdIdx>=0 ){
				var cmdIdx2 = exp.indexOf(']', cmdIdx);
				if( cmdIdx2 > 2 ){
					addr = parseInt(exp.substring(cmdIdx+2,cmdIdx2).trim());
					if( Number.isInteger(addr) ){
						var eqIdx = exp.indexOf('=');
						val = exp.substring(eqIdx+1).trim();
						var value = parseValue(val);
						if( value ) {
							memset = new MemorySetCommand(addr, value, label);
							return memset;
						}
					}
				}
			}
		}
		
	} else {
		code = line.trim();
	}
		
	if( code != '' ) {
		
		if( code.includes(':') ){  // then a label is defined
			var l = code.split(':');
			label = l[0].trim();
			code = l[1].trim();
		} else {
			code = code.trim();
		}
		
		var l = code.split(' ');
		var args = [];
		
		for(var i=0;i<l.length; i++){
			if( l[i] && l[i]!='') {
				args.push(l[i]);
			}
		}
		
		code = args[0].trim();
		
		var def = InstructionDefinition[code];
		if( def ) {
			
			var instr = new Instruction(def);
			instr.comment = comment;
			instr.label = label;
			try{
				var i=1;
				while( i<args.length ){
					var arg;
					var argStr = args[i].trim();
					if( argStr != '' ) {
						if( isNaN(argStr) ) {
							if( argStr.startsWith( "'") && argStr.endsWith("'")){
								// literal character 
								var char = argStr.charAt(1);
								if( char == '\\' ) {
									// then is it a special character
									char = argStr.charAt(2);
									if( char == "n" ){
										arg = new Argument(10, "char");
									} else {
										throw "Invalid escaped char \\" + char + ".";
									}
							    } else {
									arg = new Argument(argStr.charCodeAt(1), "char");
							    }
							} else {
								//assume is a label
								arg = new Argument( argStr, "label" );
							}
						} else {
							if( argStr.includes('.') ){
								arg = new Argument(Number(argStr), "float" );
							} else {
								arg = new Argument(Number(argStr), "int" );
							}
						}
					}
					if( arg ) instr.addArg(arg);
					i++;
				}
				return instr;
			} catch (err){
				errors.push(err);
			}
		} else {
			errors.push("<p>Unrecognized instruction: " + code + " at line: " + lineNo + "</p>");
		}
		
	}

};


function parseValue( str ) {
	var val;
	if( isNaN(str) ) {
		if( str.startsWith( "'") && str.endsWith("'")){
			// literal character 
			var char = str.charAt(1);
			if( char == '\\' ) {
				// then is it a special character
				char = str.charAt(2);
				if( char == "n" ){
					val = new Value(10, "char");
				} else {
					throw "Invalid escaped char \\" + char + ".";
				}
		    } else {
		    	val = new Value(str.charCodeAt(1), "char");
		    }
		} else {
			//assume is a label
			val = new Value( str, "label" );
		}
	} else {
		if( str.includes('.') ){
			val = new Value(Number(str), "float" );
		} else {
			val = new Value(Number(str), "int" );
		}
	}
	return val;
}


function parseProgram( str ){
	
	errors = [];
	instructions = [];
	p = [];
	
	var lines = str.split('\n');
	for( var l=0; l<lines.length; l++){
		
		var line = lines[l];
		var instr = parseLine(line, l);
		if( instr instanceof MemorySetCommand ) {
			p.push(instr);
		}
		if( instr instanceof Instruction ) instructions.push(instr);
	}
	
	return { "errors": errors, "instructions": instructions, "addressSpace": p };
	
}

