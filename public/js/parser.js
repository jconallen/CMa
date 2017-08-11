

function parseProgram( str ){
	
	//var tmp = "loadc 1; loadc 2; add; print; loadc 42; end: halt";
	var instructions = [];
	var errors = "";
	
	if( str.includes(';') ) {
		var strInstructions = str.split(';');

		for(var i=0; i<strInstructions.length; i++ ){
			
			var code = strInstructions[i].trim();
			
			if( code != '' ) {
				var label = null;
				var arg = null;
				
				if( code.includes(':') ){
					var l = code.split(':');
					label = l[0].trim();
					code = l[1].trim();
				} else {
					code = code.trim();
				}
				
				if( code.includes(' ') ){
					var l = code.split(' ');
					code = l[0].trim();
					var argVal = l[1].trim();
					
					if( argVal.endsWith("f") || argVal.includes('.') ){
						arg = new Value("float", Number(argVal) );
					} else {
						arg = new Value("int", Number(argVal) );
					}

				}
				
				var def = InstructionDefinition[code];
				
				if (def) {
					var instr = new Instruction(def, arg, label);
					instructions.push(instr);
				} else {
					errors += "<p>Unrecognized instruction: " + code + " [" + i + "]</p>";
				}
			}

			
			
		}
		
	} else {
		return { "error": "<p>No semi colon (;).  Every instrution should be followed with a semi colon.</p>", "instructions": [] };
	}

	return { "error": errors, "instructions": instructions };
	
}