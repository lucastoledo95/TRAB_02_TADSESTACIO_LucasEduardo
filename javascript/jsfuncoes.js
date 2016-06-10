$(function validacaoGeral(){
    //Sempre verificando
	$(document).ready(function(){
		validarCPF();
                validarMask();
		validarLetras();
                validarCaracteres();
		validarSenha();
		mensagemCB();
		storage();
	});
});
function storage() {
    var operacao = "A";
    var posicao = -1;
    var TableList = localStorage.getItem("Dados");
    TableList = JSON.parse(TableList);
    if (TableList == null)
        TableList = [];
		$("#formCadastro").on("submit", function () {
    if (operacao == "A")
        adicionarElemento();
    else
        editarElemento();
    });
    
    function GetCliente(propriedade, valor){
          var cli = null;
        for (var item in TableList) {
            var i = JSON.parse(TableList[item]);
            if (i[propriedade] == valor)
                cli = i;
     }
        return cli;
}
    
	function adicionarElemento() {
                var cli = GetCliente("cpf", $("#cpf").val());
		if(cli !== null){
			window.alert("CPF inv\u00e1lido ja existente.");
			$("#cpf").val("");
                        $("#cpf").focus();
			return false;
                }else{
		var cliente = JSON.stringify({
			cpf: $("#cpf").val(), 
			nome: $("#nome").val(), 
			estadoCivil: $("#estadoCivil").val(),
			sexo: $("#sexo").val(),
			telefone: $("#telefone").val(),
			cep: $("#cep").val(),
			endereco: $("#endereco").val(),
			bairro: $("#bairro").val(),
			estado: $("#estado").val(),
			cidade: $("#cidade").val(),
			email: $("#email").val(),
			senha: $("#senha").val(),
			obs: $("#obs").val(),
			promocao: $("#promocao").is(":checked") 
		});
		TableList.push(cliente);
		localStorage.setItem("Dados", JSON.stringify(TableList));
		alert("Registro adicionado com sucesso");
		return true;
    }
 }
	function editarElemento(){
		TableList[posicao] = JSON.stringify({
			cpf: $("#cpf").val(), 
			nome: $("#nome").val(), 
			estadoCivil: $("#estadoCivil").val(),
			sexo: $("#sexo").val(),
			telefone: $("#telefone").val(),
			cep: $("#cep").val(),
			endereco: $("#endereco").val(),
			bairro: $("#bairro").val(),
			estado: $("#estado").val(),
			cidade: $("#cidade").val(),
			email: $("#email").val(),
			senha: $("#senha").val(),
			obs: $("#obs").val(),
			promocao: $("#promocao").is(":checked")
		});
		localStorage.setItem("Dados", JSON.stringify(TableList));
		alert("Registro editado com sucesso");
		operacao = "E";
                listar();
		return true;
	}
	function excluir(){
		TableList.splice(posicao, 1);
		localStorage.setItem("Dados", JSON.stringify(TableList));
	}
        
	function listar() {
        $("#ListDados").html("");
		for (var i in TableList) {
			var cli = JSON.parse(TableList[i]);
			$('#TableList').find('tbody').append('<tr>' +
			'<td>'+cli.cpf+'</td>' +
			'<td>'+cli.nome+'</td>' +
			'<td><img src="imagens/Editar.png" height="30" width="30" alt = " '+i+' " id="btnEditar" class="btnEditar" title="Editar Dados" />   ' +
			'<img src="imagens/Remover.png" height="30" width="30" alt = " '+i+' " id="btnExcluir" class="btnRemover" title="Remover Dados" />' +
			'</tr>');
			destacarLinha();
			limpar();
		}
	}
        
        
            $("#TableList").on("click", "#btnEditar", function(){
		$("#enviar").attr('value', "Alterar");
		operacao = "E";
        posicao = parseInt($(this).attr("alt"));
        
        var cli = JSON.parse(TableList[posicao]);
			$("#cpf").val(cli.cpf);
			$("#nome").val(cli.nome);
			$("#estadoCivil").val(cli.estadoCivil);
			$("#sexo").val(cli.sexo);
			$("#telefone").val(cli.telefone);
			$("#cep").val(cli.cep);
			$("#endereco").val(cli.endereco);
			$("#bairro").val(cli.bairro);
			$("#estado").val(cli.estado);
			$("#cidade").val(cli.cidade);
			$("#email").val(cli.email);
			$("#senha").val(cli.senha);
			$("#obs").val(cli.obs);
			$('#promocao').attr('checked', cli.promocao);
			$("#nome").focus();
		verificaCheck();
                
    });
    
    $("#TableList").on("click", "#btnExcluir", function(){
        posicao = parseInt($(this).attr("alt"));
        if (window.confirm (' Tem certeza que deseja excluir? ')){
		excluir();
                listar();
            } 
            else{
         return false;
      }    
    });
        
        
	//CANCELAR
	$("#cancelar").click(function(){
                if($("#promocao").is(":checked")){
                $("#mensagem").hide();
                $('#promocao').attr('checked', false);
                }else{
                 $("#mensagem").hide();
                 $('#promocao').attr('checked', false);
            }   
                limpar();
		$("#enviar").attr('value', "Enviar");
                operacao = "A";
	});
    listar();
}
function limpar(){
	$('#cpf').val('');
	$('#nome').val('');
	$('#estadoCivil').val('');
	$('#sexo').val('');
	$('#telefone').val('');
	$('#cep').val('');
	$('#endereco').val('');
	$('#bairro').val('');
	$('#estado').val('');
	$('#cidade').val('');
	$('#email').val('');
	$('#senha').val('');
	$('#obs').val('');
	$('#promocao').val('');
        
        
}
function destacarLinha(){
	$('table#TableList tbody tr').hover(
		function(){
			$(this).addClass('destaque');
		},
		function(){
			$(this).removeClass('destaque');
		}
    );
}
function validarMask(){
	$("#telefone").mask('(00) 0000-0000');
    $("#cpf").mask('000.000.000-00');
    $("#cep").mask('00000-000');
}
function validarLetras(){
	$("#nome").keypress(function(event){
		//variavel recebendo o valor do evento da tecla pressionada
		var tecla = event.keyCode || event.which;  
		//Somente as letras minusculas, maisculas e o espaço
		if((tecla >= 65 && tecla <= 90 || tecla >= 97 && tecla <= 122 || tecla == 32)) 
			return true;
		else{
			//apagar e esc liberados
			if (tecla==8 || tecla==0) 
			return true;
		else  
			return false;
		}
	});
}


function validarCPF(){
	//Evento blur do campo cpf
		$("#cpf").blur(function(){
		var cpf = $("#cpf").val();
		if( cpf <= 0 ) return;
		var filtro = /^\d{3}.\d{3}.\d{3}-\d{2}$/i;
		if(!filtro.test(cpf)){
			window.alert("CPF Invalido");
			$("#cpf").focus();
			$("#cpf").val("");
			return false;                          
		}
		cpf = remove(cpf, ".");
		cpf = remove(cpf, "-");	
		if(cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" 
							|| cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999"){
			window.alert("CPF Invalido");
			$("#cpf").focus();
			$("#cpf").val("");
			return false;
		}
		//verifica o primeiro digito validando
		soma = 0;
		for(i = 0; i < 9; i++)
			soma += parseInt(cpf.charAt(i)) * (10 - i);
		resto = 11 - (soma % 11);
		if(resto == 10 || resto == 11)
			resto = 0;
		if(resto != parseInt(cpf.charAt(9))){
			window.alert("CPF Invalido");
			$("#cpf").focus();
			$("#cpf").val("");
			return false;
		}
		//verifica com o primeiro digito e o segundo validando novamente
		soma = 0;
		for(i = 0; i < 10; i ++)
			soma += parseInt(cpf.charAt(i)) * (11 - i);
		resto = 11 - (soma % 11);
		if(resto == 10 || resto == 11)
			resto = 0;
		if(resto != parseInt(cpf.charAt(10))){
			window.alert("CPF Invalido");
			$("#cpf").focus();
			$("#cpf").val("");
			return false;
		}               
		return true;
                                
	});
	//remove os pontos e traço do numero de cpf antes de verificar
	function remove(str, sub) {
		i = str.indexOf(sub);
		r = "";
		if (i == -1) return str;
		r += str.substring(0,i) + remove(str.substring(i + sub.length), sub);
		return r;
	}
}
function validarSenha(){
	$("#senha").keypress(function(event){
		//variavel recebendo o valor do evento da tecla pressionada
		var tecla = event.keyCode || event.which;   
		//Somente as letras minusculas, maisculas e os numeros
		if((tecla >= 65 && tecla <= 90 || tecla >= 97 && tecla <= 122 || tecla >= 48 && tecla <= 57))
			return true;
		else{
			//apagar e esc liberados
			if (tecla==8 || tecla==0) 
				return true;
			else  
				return false;
		}
	});
}
function validarCaracteres(){
	//evento keypress do campo obs
	$("#obs").keypress(function(event){
		//verifica se tem mais do que 200 caracteres
		if(formCadastro.obs.value.length == 200){
			alert("O Campo observação deve conter no maximo 200 caracteres.");
			//nao deixa digitar mais que 200 caracteres
			event.preventDefault();
			formCadastro.obs.focus();
			return false;
		}
	});
}
function mensagemCB(){
	//evento verifica ao clicar no checkbox para trocar mensagem como ativa
	$("#promocao").on("change",function () {  
		verificaCheck();
	});
}
function verificaCheck(){
	if($("#promocao").is(":checked")){
		$("#mensagem").show();
	}else
		$("#mensagem").hide();
}
