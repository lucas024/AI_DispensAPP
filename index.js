

var itensMenu= ["verDispensa"];

var elementosDispensa=["Leite","Àgua", "Sumo", "Arroz", "Massa", "Azeite", "Carne", "Peixe", "Cereais", "Ovos", "Aveia"]
var valoresDispensa=[6,12,2,2,1,2,3,2,2,12,3]
var validadeDispensa=[2,24,5,18,18,2,1,1,12,2,24]
var inDispensa = false;


function start() {
    setDate();
    setDispensa();
  }
window.onload = start;
function setDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    document.getElementById("date").innerHTML=today;
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
        h32.innerHTML=nrElementos;
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
        alert("Wrong Item")
    }
  
    if(inDispensa){
        var rem = document.getElementById("verDispensa");
        rem.remove()
        verDispensa()
    }
    document.getElementById("addBox").style.visibility="hidden"
    document.getElementById("backdrop").style.visibility="hidden"
    
}