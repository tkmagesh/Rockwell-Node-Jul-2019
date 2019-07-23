function addNumbers(){
	var txtN1 = document.getElementById('txtNumber1');
	var n1 = parseInt(txtN1.value);
	var txtN2 = document.getElementById('txtNumber2');
	var n2 = parseInt(txtN2.value);
	var result = n1 + n2;
	var divResult = document.getElementById('divResult');
	divResult.innerText = result;
}

function init(){
	var btnAdd = document.getElementById('btnAdd');
	btnAdd.addEventListener('click', addNumbers);
}

window.addEventListener('load', init);