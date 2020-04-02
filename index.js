

var itensMenu= ["verDispensa"];

var elementosDispensa=["Leite","Àgua", "Sumo", "Arroz", "Massa", "Azeite", "Carne", "Peixe", "Cereais", "Ovos", "Aveia"]
var valoresDispensa=[6,12,2,2,1,2,3,2,2,12,3]
var validadeDispensa=[3,24,5,18,18,6,3,2,12,3,24]
var inDispensa = false;
var mesesPassados = 4;
var anosPassados = 2020;
function start() {
    setDate();
    setDispensa();
  }
window.onload = start;

function setDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');

    var data = dd + '/' + String(mesesPassados).padStart(2, '0') + '/' + String(anosPassados);
    document.getElementById("date").innerHTML=data;
}


function setDispensa(){
    for(i=0; i<elementosDispensa.length; i++){
        setDispensaHandler(i)
    }
}

function setDispensaHandler(i){
    var div = document.createElement("div");
    div.id="dispensaFlex";
    div.style.display="flex";
    div.style.justifyContent="space-between";
    div.style.width="300px";
    var h31 = document.createElement("h3");
    var elemento = elementosDispensa[i];
    h31.innerHTML=elemento+" : ";
    var h32 = document.createElement("h3");
    h32.id=elemento;
    h32.innerHTML=this.valoresDispensa[i] + " Unid";  
    var p = document.createElement("p");
    p.style.marginTop="20px";
    p.id=elemento+"mes";
    p.innerHTML=this.validadeDispensa[i].toString() + " Meses";
    var img = document.createElement("img");
    img.src="minus.png";
    img.onclick=function () {
        removeElement(event);
    }
    img.id=elemento;
    img.style.width="32px";
    img.style.height="32px";
    img.style.marginTop="10px";
    div.append(h31);
    div.append(h32);
    div.append(p);
    div.append(img);
    document.getElementById("dispensaa").append(div);
}

function removeElement(e){
    var atual = parseFloat(document.getElementById(e.target.id).innerHTML);
    if(atual > 0){
        var reduzido = atual - 1;
        document.getElementById(e.target.id).innerHTML = reduzido.toString()+" Unid";
        var index = elementosDispensa.indexOf(e.target.id);
        valoresDispensa[index] = reduzido;
        console.log(valoresDispensa);
        if(inDispensa){
            var rem = document.getElementById("verDispensa");
            rem.remove()
            verDispensa()
        }
    }
    
}

function verMenu(){
    document.getElementById('menu').style.display="block";
    for(i=0; i<itensMenu.length; i++){
        var element = document.getElementById("verDispensa")
        element.remove()
    }
    inDispensa=false;

}

function verDispensa(){
    document.getElementById('menu').style.display = "none";
    var disp = document.createElement("div");
    disp.id="verDispensa"
    disp.className="verDispensa"
    for(i=0; i<elementosDispensa.length; i++){
        var div = document.createElement("div");
        div.style.display="flex";
        div.style.justifyContent="space-between";
        div.style.width="300px";
        var h31 = document.createElement("h3");
        var elemento = elementosDispensa[i];
        h31.innerHTML=elemento+" : ";
        var h32 = document.createElement("h3");
        var nrElementos = valoresDispensa[i];
        h32.innerHTML=nrElementos + " Unid";
        var p = document.createElement("p");
        p.style.marginTop="20px";
        p.innerHTML=this.validadeDispensa[i] + " Meses";
        div.append(h31);
        div.append(h32);
        div.append(p);
        document.getElementById("verDispensa").append(div)
    }
    document.getElementById("mainApp").append(disp);
    document.getElementById("verDispensa").style.display = "block";
    inDispensa=true;
}

function showAdd(){
    document.getElementById("addBox").style.visibility="visible"
    document.getElementById("backdrop").style.visibility="visible"

}
function addElement(){
    var inputNome = document.getElementById("nome").value;
    var inputQuant = document.getElementById("quant").value;
    var inputValid = document.getElementById("valid").value;
    if(inputNome != "" && inputQuant!="" && inputValid != "" && !elementosDispensa.includes(inputNome)){
        elementosDispensa.push(inputNome)
        valoresDispensa.push(inputQuant)
        validadeDispensa.push(inputValid)
        setDispensaHandler(elementosDispensa.length - 1)
    }
    else{
        alert("Tenta outra vez")
    }
  
    if(inDispensa){
        var rem = document.getElementById("verDispensa");
        rem.remove()
        verDispensa()
    }
    document.getElementById("addBox").style.visibility="hidden"
    document.getElementById("backdrop").style.visibility="hidden"
}
function addMes(){
    for(i=0; i<validadeDispensa.length; i++){
        atual = validadeDispensa[i]
        if(atual > 0){
            reduzido = atual - 1;
            validadeDispensa[i] = reduzido;
            document.getElementById(elementosDispensa[i]+"mes").innerHTML=reduzido+" Meses";
        }
    }
    
    mesesPassados+=1;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    if(mesesPassados==13){
        anosPassados+=1;
        mesesPassados=0;
    }
    var data = dd + '/' + String(mesesPassados).padStart(2, '0') + '/' + String(anosPassados);
    document.getElementById("date").innerHTML=data;
    if(inDispensa){
        var rem = document.getElementById("verDispensa");
        rem.remove()
        verDispensa()
    }
    verificaENotifica()
}

//"ATENÇÃO: de acordo com os seus hábitos alimentares, o produto"+ elementosDispensa[i]+ " acabará este mês!"

function verificaENotifica(){
    console.log(validadeDispensa)
    for(i = 0; i<elementosDispensa.length; i++){
        if(validadeDispensa[i]==1){
            document.getElementById("backdropMovel").style.visibility="visible"
            var newNotificacao = document.createElement("div");
            newNotificacao.style.width="80%"
            newNotificacao.style.height="110px"
            newNotificacao.style.background="#1e3c72"
            newNotificacao.style.border="4px solid black"
            newNotificacao.style.borderRadius="6px"
            newNotificacao.style.margin="auto"
            newNotificacao.style.marginTop="10px"
            newNotificacao.style.zIndex="27"
            newNotificacao.className="notificacao"
            var newP = document.createElement("p")
            newP.style.color="white"
            newP.style.fontSize="20px"
            newP.innerHTML="ATENÇÃO: " + "O produto "+ elementosDispensa[i]+ " acaba a sua validade este mês"
            newNotificacao.append(newP)
            var zonaButtons = document.createElement("div");
            zonaButtons.style.display="flex"
            zonaButtons.style.justifyContent="space-evenly"
            zonaButtons.style.marginTop="10px"
            var buttonOk = document.createElement("button")
            var buttonReceitas = document.createElement("button")
            buttonOk.style.backgroundColor="#44c767"
            buttonOk.style.borderRadius="28px"
            buttonOk.innerHTML="OK"
            buttonReceitas.style.backgroundColor="#44c767"
            buttonReceitas.style.borderRadius="28px"
            buttonReceitas.innerHTML="Receitas com "+elementosDispensa[i].toLowerCase()
            zonaButtons.append(buttonOk)
            zonaButtons.append(buttonReceitas)
            newNotificacao.append(zonaButtons)
            document.getElementById("zonaNotificacoes").append(newNotificacao)
        }
    }
}

function removeNotificationHandler(){
    var listNot = document.getElementsByClassName("notificacao")
    listNot[0].remove()
    if(listNot.length==0){
        document.getElementById("backdropMovel").style.visibility="hidden"
    }
}

