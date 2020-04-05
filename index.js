
var itensMenu= ["verDispensa", "verEstatistica"];

var elementosDispensa=["Leite","Àgua", "Sumo", "Arroz", "Massa", "Carne", "Peixe", "Azeite",  "Cereais", "Ovos", "Aveia"]
var valoresDispensa=       [10,20,4,4,3,10,7,4,5,36,7]
var mediaValoresConsumidos=[8,15,3,3,2,8,5,3,3,30,5] //encomenda automatica aos 30%
var valoresConsumidosMesAtual=[0,0,0,0,0,0,0,0,0,0,0]
var listaComprasAtual=[0,0,0,0,0,0,0,0,0,0,0]
var validadeDispensa=[3,24,5,18,18,3,2,6,12,3,24]
var valoresValidadeBase=[3,24,5,18,18,3,2,6,12,3,24]
var inDispensa = false;
var inEstatisticas = false;
var inLista = false;
var inReceitas = false;
var mesesPassados = 4;
var anosPassados = 2020;
var buttonToggled = false
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

function changeButtonToggle(){
    if(buttonToggled){
        buttonToggled=false
    }
    else{
        buttonToggled=true
    }
    document.getElementById("butToggle").remove()
    var buttonToggle = document.createElement("button")
    buttonToggle.className="myButton"
    buttonToggle.id="butToggle"
    
    if(buttonToggled){
        buttonToggle.style.backgroundColor="green"
        buttonToggle.innerHTML="Comprar automaticamente por mês (toggled)"
        
    }
    else{
        buttonToggle.style.backgroundColor="red"
        buttonToggle.innerHTML="Comprar automaticamente por mês (not toggled)"
    }
    buttonToggle.onclick=function () {
        changeButtonToggle();
    }
    document.getElementById("botoesLista").append(buttonToggle)
    console.log(buttonToggled)
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
    img.src="minusLista.png";
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
        valoresConsumidosMesAtual[index] += 1
        var index = elementosDispensa.indexOf(e.target.id);
        listaComprasAtual[index] = (Math.round(valoresConsumidosMesAtual[index]*0.7 + mediaValoresConsumidos[index]*0.3)) //a nova media para cada produto so tem em conta um peso de 30% dos meses anteriores                                                 //e um peso de 70% do mes atual que passou
        console.log("oioi"+listaComprasAtual)
        if(inDispensa){
            var rem = document.getElementById("verDispensa");
            rem.remove()
            verDispensa()
        }
        if(inLista){
            document.getElementById("verLista").remove()
            document.getElementById("listaAtual").remove()
            document.getElementById("botoesLista").remove()
            verListaAtual()
        }
    }
    
}

function adicionaElementLista(e){
    console.log(valoresDispensa)
    
    var index = elementosDispensa.indexOf(e.target.id);
    listaComprasAtual[index] += 1
    if(inDispensa){
        var rem = document.getElementById("verDispensa");
        rem.remove()
        verDispensa()
    }
    if(inLista){
        document.getElementById("verLista").remove()
        document.getElementById("listaAtual").remove()
        document.getElementById("botoesLista").remove()
        verListaAtual()
    }
    
}

function retiraElementLista(e){
    var index = elementosDispensa.indexOf(e.target.id);
    atual = listaComprasAtual[index]
    console.log(valoresDispensa)
    if(atual > 0){
        var index = elementosDispensa.indexOf(e.target.id);
        listaComprasAtual[index] += -1
        if(inDispensa){
            var rem = document.getElementById("verDispensa");
            rem.remove()
            verDispensa()
        }
        if(inLista){
            document.getElementById("verLista").remove()
            document.getElementById("listaAtual").remove()
            document.getElementById("botoesLista").remove()
            verListaAtual()
        }
    }
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
        valoresConsumidosMesAtual.push(0)
        mediaValoresConsumidos.push(0)
        listaComprasAtual.push(0)
        valoresValidadeBase.push(inputValid)
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
    if(inEstatisticas){
        var rem = document.getElementById("verEstatistica");
        rem.remove()
        verEstatisticas()
    }
    if(inLista){
        document.getElementById("verLista").remove()
        document.getElementById("listaAtual").remove()
        document.getElementById("botoesLista").remove()
        verListaAtual()
    }
    document.getElementById("addBox").style.visibility="hidden"
    document.getElementById("backdrop").style.visibility="hidden"
}
function addMes(){
    if(buttonToggled){
        comprarLista()
    }
    for(i=0; i<validadeDispensa.length; i++){
        atual = validadeDispensa[i]
        if(atual > 1){
            reduzido = atual - 1;
            validadeDispensa[i] = reduzido;
            document.getElementById(elementosDispensa[i]+"mes").innerHTML=reduzido+" Meses";

        }
        else if(atual == 1){
            reduzido = atual - 1;
            validadeDispensa[i] = reduzido;
            document.getElementById(elementosDispensa[i]+"mes").innerHTML=reduzido+" Meses";
            document.getElementById(elementosDispensa[i]).innerHTML=0+" Unid";
            console.log(valoresDispensa)
            valoresDispensa[i]=0
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
    atualizaMedias()
}

function atualizaMedias(){
    var temp = []
    for(i=0; i<elementosDispensa.length; i++){
        temp.push(Math.round(valoresConsumidosMesAtual[i]*0.7 + mediaValoresConsumidos[i]*0.3)) //a nova media para cada produto so tem em conta um peso de 30% dos meses anteriores
        valoresConsumidosMesAtual[i]=0                                                         //e um peso de 70% do mes atual que passou
    }
    
    if(true){
        for(i=0; i<elementosDispensa.length; i++){
            if(valoresDispensa[i] < temp[i]){
                valoresDispensa[i] = temp[i]
            }
        }
        mediaValoresConsumidos = temp
        if(inEstatisticas){
            var rem = document.getElementById("verEstatistica");
            rem.remove()
            verEstatisticas()
        }
    }
    
    
    console.log(mediaValoresConsumidos)
    console.log(valoresDispensa)
}



/////MENUS///////////////
function verMenu(){
    document.getElementById('menu').style.display="block";
    if(inDispensa){
        var element = document.getElementById("verDispensa")
        element.remove()
        
    }
    if(inEstatisticas){
        var element = document.getElementById("verEstatistica")
        element.remove()
        
    }
    if(inLista){
        document.getElementById("verLista").remove()
        document.getElementById("listaAtual").remove()
        document.getElementById("botoesLista").remove()
    }
    if(inReceitas){
        document.getElementById("listaReceitas").remove()
        document.getElementById("botaoSite").remove()
    
    }
    
    inDispensa=false;
    inEstatisticas=false;
    inLista=false;
    inReceitas=false;
    document.getElementById("back").style.visibility="hidden"
}

function verDispensa(){
    document.getElementById("back").style.visibility="visible"
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



//"ATENÇÃO: de acordo com os seus hábitos alimentares, o produto"+ elementosDispensa[i]+ " acabará este mês!"

function verificaENotifica(){
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
            buttonReceitas.id=elementosDispensa[i]
            buttonReceitas.innerHTML="Receitas com "+elementosDispensa[i].toLowerCase()
            buttonReceitas.onclick = function() {
                goToReceitaEspecifica(event)
            }
            zonaButtons.append(buttonOk)
            zonaButtons.append(buttonReceitas)
            newNotificacao.append(zonaButtons)
            document.getElementById("zonaNotificacoes").style.visibility="visible"
            document.getElementById("zonaNotificacoes").append(newNotificacao)
        }
    }
}

function removeNotificationHandler(){
    var listNot = document.getElementsByClassName("notificacao")
    listNot[0].remove()
    if(listNot.length==0){
        document.getElementById("backdropMovel").style.visibility="hidden"
        document.getElementById("zonaNotificacoes").style.visibility="hidden"
    }
}

function verEstatisticas(){
    document.getElementById("back").style.visibility="visible"
    document.getElementById('menu').style.display = "none";
    var disp = document.createElement("div");
    disp.id="verEstatistica"
    disp.className="verEstatistica"
    var titulo = document.createElement("h3") 
    titulo.style.color="white"
    titulo.innerHTML="Consumo médio mensal"
    disp.style.textAlign="center"
    document.getElementById("verEstatistica").append(titulo)
    for(i=0; i<elementosDispensa.length; i++){
        var div = document.createElement("div");
        div.style.display="flex";
        div.style.justifyContent="space-between";
        div.style.width="200px";
        div.style.marginLeft="50px"
        var h31 = document.createElement("h3");
        var elemento = elementosDispensa[i];
        h31.innerHTML=elemento+" : ";
        var h32 = document.createElement("h3");
        var mediaConsumoElemento = mediaValoresConsumidos[i];
        h32.innerHTML=mediaConsumoElemento + " Unidades";
        div.append(h31);
        div.append(h32);
        document.getElementById("verEstatistica").append(div)
    }
    document.getElementById("mainApp").append(disp);
    document.getElementById("verEstatistica").style.display = "block";
    inEstatisticas=true;
}

function verListaCompras(){
    inLista=true
    inDispensa=false
    document.getElementById("back").style.visibility="visible"
    document.getElementById("menu").style.display = "none";
    verListaAtual()
    
}

function verListaAtual(){ 
    var place = document.createElement("div")
    place.id="verLista"
    var disp = document.createElement("div");
    disp.id="listaAtual"
    disp.className="listaAtual"
    var titulo = document.createElement("h3") 
    titulo.style.color="white"
    titulo.innerHTML="Lista de compras atual"
    disp.style.textAlign="center"
    disp.append(titulo)
    for(i=0; i<elementosDispensa.length; i++){
        var div = document.createElement("div");
        div.style.display="flex";
        div.style.justifyContent="space-between";
        div.style.width="250px";
        div.style.marginLeft="50px"
        var h31 = document.createElement("h3");
        var elemento = elementosDispensa[i];
        h31.innerHTML=elemento+" : ";
        var h32 = document.createElement("h3");
        var valorAtualAComprar = listaComprasAtual[i]; //Quando o mes passa isto fica 0, por adicionares e subtraires para cada
        h32.innerHTML=valorAtualAComprar + " Unidades";
        var img = document.createElement("img");
        img.src="plusLista.png";
        img.onclick=function () {
            adicionaElementLista(event);
        }
        img.id=elemento;
        img.style.marginTop="10px"
        img.style.width="32px";
        img.style.height="32px";
        var img1 = document.createElement("img");
        img1.src="minusLista.png";
        img1.onclick=function () {
            retiraElementLista(event);
        }
        img1.id=elemento;
        img1.style.marginTop="10px"
        img1.style.width="32px";
        img1.style.height="32px";
        
        div.append(h31);
        div.append(h32);
        div.append(img);
        div.append(img1);
        disp.append(div)
    }
    var zonaButtons = document.createElement("div");
    zonaButtons.id="botoesLista"
    zonaButtons.style.display="flex"
    zonaButtons.style.justifyContent="space-evenly"
    zonaButtons.style.marginTop="10px"
    var buttonOk = document.createElement("button")
    var buttonToggle = document.createElement("button")
    buttonOk.className="myButton"
    buttonOk.innerHTML="Comprar já"
    buttonToggle.className="myButton"
    buttonToggle.id="butToggle"
    if(buttonToggled){
        buttonToggle.style.backgroundColor="green"
        buttonToggle.innerHTML="Comprar automaticamente por mês (toggled)"
        
    }
    else{
        buttonToggle.style.backgroundColor="red"
        buttonToggle.innerHTML="Comprar automaticamente por mês (not toggled)"
    }
    buttonToggle.onclick=function () {
        changeButtonToggle();
    }
    buttonOk.onclick=function () {
        comprarLista();
    }
    zonaButtons.append(buttonOk)
    zonaButtons.append(buttonToggle)
    document.getElementById("mainApp").append(place);
    place.append(disp);
    place.append(zonaButtons)
    disp.style.display = "block";
}

function comprarLista(){
    for(i=0; i<elementosDispensa.length; i++){
        if(listaComprasAtual[i]>0){
            valoresDispensa[i] += listaComprasAtual[i]
            validadeDispensa[i] = valoresValidadeBase[i]
            listaComprasAtual[i]=0
            document.getElementById(elementosDispensa[i]).innerHTML=valoresDispensa[i]+" Unid"
            document.getElementById(elementosDispensa[i]+"mes").innerHTML=validadeDispensa[i]+" Meses"
        }
        
    }
    if(inLista){
        document.getElementById("verLista").remove()
        document.getElementById("listaAtual").remove()
        document.getElementById("botoesLista").remove()
        verListaAtual()
    }
    
}


function verReceitas(){
    var place = document.createElement("div")
    place.id="verReceitas"
    document.getElementById("back").style.visibility="visible"
    document.getElementById('menu').style.display = "none";
    var disp = document.createElement("div");
    disp.id="listaReceitas"
    disp.className="listaReceitas"
    var titulo = document.createElement("h3") 
    titulo.style.color="white"
    titulo.innerHTML="Produtos disponíveis"
    disp.style.textAlign="center"
    disp.append(titulo)
    for(i=0; i<elementosDispensa.length; i++){
        if(valoresDispensa[i]>0){
            var div = document.createElement("div");
            div.style.display="flex";
            div.style.justifyContent="space-between";
            div.style.width="100px";
            div.style.marginLeft="50px"
            var box = document.createElement("input")
            box.type="checkbox"
            box.id=elementosDispensa[i]+i
            box.style.marginTop="20px"
            var h31 = document.createElement("h3");
            var elemento = elementosDispensa[i];
            h31.innerHTML=elemento
            div.append(box)
            div.append(h31)
            disp.append(div)
        }
        
    }
    var botao = document.createElement("button")
    botao.className="myButton"
    botao.id="botaoSite"
    botao.innerHTML="Ver receitas"
    botao.onclick = function(){
        irParaSite()
    }
    document.getElementById("mainApp").append(place);
    place.append(disp);
    place.append(botao)
    disp.style.display = "block";
    inReceitas=true
}

function backToReceitas(){
    document.getElementById("pesquisa").style.display="none"
    url = "https://www.bing.com/search?q=Receitas+"
}
var url = "https://www.bing.com/search?q=Receitas+"
"receitas+peixe+e+massa"
function irParaSite(){
    for(i=0;i<elementosDispensa.length;i++){
        if(valoresDispensa[i]>0){
            if(document.getElementById(elementosDispensa[i]+i).checked){
                console.log(elementosDispensa[i])
                url+=elementosDispensa[i]+"+"
            }
        }
        
    }
    document.getElementById("site").src=url
    document.getElementById("pesquisa").style.display="block"
}


function goToReceitaEspecifica(e){
    url += e.target.id
    document.getElementById("site").src=url
    document.getElementById("pesquisa").style.display="block"
}