

//var starter_prog_src = 
//	"loadc 7 \n" +
//	"load ; comment\n" +
//	"loadc 1 \n" +
//	"add \n" +
//	"loadc 4 \n" +
//	"store \n" +
//	"end: halt";
//
//var starter_memory = [
//	{ "address": 4, "value": 32 },
//	{ "address": 7, "value": 12 },
//];

//var starter_memory = [
//	{ "address": 0, "value": 0 },  // the return value for int main()
//	{ "address": 1, "value": 32 },  // EP
//];

var starter_memory = [];
var starter_prog_src = 
	'; \n' +
	';  CMa program for factorial function \n' +
	'; \n' +
	'; \n' +
	';  int _fac(int n) {  \n' +
	';	  if( n <= 0 ) return 1; \n' +
	';	  else return n * fac(n-1); \n' +
	';  } \n' +
	';   \n' +
	';  int main(){ \n' +
	';     int f = _fac(3); \n' +
	';     printf("%i", f ); \n' +
	'; } \n' +
	'; \n' +
	'\n' +
	'_main: loadc 3       ; put constant 3 on top of stack \n' +
	'       mark          ; prepare for call to function \n' +
	'       loadc _fac    ; put the address of _fac on top of stack \n' +
	'       call          ; call the recursive function _fac \n' +
	'       print         ; print the result of the call to _fac to the output \n' +
	' end:  halt          ; end of program \n' +
	'_fac:  enter 3       ;  \n' +
	'       loadr -3      ; put local n on top of stack \n' +
	'       loadc 0       ; put constant 0 on top of stack \n' +
	'       leq           ; compare  n <= 0 \n' +
	'       jumpz A       ; if it is not, then jump to A  \n' +
	'       loadc 1       ; otherwise put constant 1 on top of stack \n' +
	'       storer -3     ;     update return value to the value at top of stack (=1).  \n' +
	'       return 3      ;     return this instance of function \n' +
	'   A:  loadr -3      ; put value of local variable n on top of stack \n' +
	'       loadr -3      ; put value of local variable n on top of stack (again)  \n' +
	'                     ;    - now value of n is top two values on stack \n' +
	'       loadc 1       ; put constant 1 on top of stack \n' +
	'       sub           ; subtract, putting value on top of stack ( n-1 ) \n' +
	'       mark          ; prepare to call function \n' +
	'       loadc _fac    ; put address of function on top of stack \n' +
	'       call          ; instantiate function, this invokes the function and  \n' +
	'                     ;   places result back on top of stack \n' +
	'       mul           ; multiply the top two values on stack (one of which  \n' +
	'                     ;   is the return value of the prev fac call) \n' +
	'       storer -3     ; put value of local n on top of stack \n' +
	'       return 3      ; return this instance of the function';


var parsed_prog = parseProgram(starter_prog_src);

if( parsed_prog.errors.length>0 ) {
	alert('Error parsing starter program: ' + parsed_prog.error );
} 

var starter_prog = parsed_prog.instructions;
