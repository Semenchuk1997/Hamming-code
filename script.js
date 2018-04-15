const input = document.getElementById('input');
const submit = document.getElementById('submit');
const coder = document.getElementById('coder');
const select = document.getElementById('error');
const addError = document.getElementById('addError');
const uncorrect = document.getElementById('uncorrect');
const fix = document.getElementById('fix');
const decoder = document.getElementById('decoder');

let code;

function getCoder(info){
	let arr = info.split('');
	code = [0, 0, +arr[0], 0, +arr[1], +arr[2], +arr[3]];
	code = helpFunc(code);
	coder.innerHTML = code.join('');
}

function helpFunc(code){
	let s1 = code[0] ^ code[2] ^ code[4] ^ code[6];
	let s2 = code[1] ^ code[2] ^ code[5] ^ code[6];
	let s3 = code[3] ^ code[4] ^ code[5] ^ code[6];

	if(s1) code[0] = 1;
	if(s2) code[1] = 1;
	if(s3) code[3] = 1;

	return code;
}

function getUncorrectCode(bit){
	bit = +bit;
	code[bit-1] = +!code[bit-1];
	uncorrect.innerHTML = code.join('');
}

function fixCode(){
	let s1 = code[0] ^ code[2] ^ code[4] ^ code[6];
	let s2 = code[1] ^ code[2] ^ code[5] ^ code[6];
	let s3 = code[3] ^ code[4] ^ code[5] ^ code[6];

	let arr = [s1, s2, s3];
	let sim = ['001', '010', '011', '100', '101', '110', '111'];

	arr = arr.reverse().join('');

	for(let i = 0; i < sim.length; i++){
		if(sim[i] === arr){
			code[i] = +!code[i];
		}
	}

	decoder.innerHTML = code.join('');
}

fix.addEventListener('click', function(){
	fixCode();
	return false;
});

addError.addEventListener('click', function(){
	getUncorrectCode(select.value);
	return false;
});

submit.addEventListener('click', function(){
	getCoder(input.value);
	return false;
});