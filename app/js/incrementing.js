var value = 10;
var value2 = 10;
var value3 = 10;
var maxValue = 210;

function checkTotal(){
    totalValue = value + value2 + value3;
    printPoint();
    return (totalValue<maxValue)
}
function printPoint(){
    tb4 = document.getElementById("tb4");
    v = maxValue -value - value2 - value3
    document.getElementById("tb4").innerHTML=v;
}
function increase(){
    if(checkTotal()){
        progress = document.getElementById("progress");
        tb = document.getElementById("tb");
        value+= 10;// same as value += 1, but better

        if(value>=100) value = 100;//keep it under 100%
        tb.value = value;// set the value of the text field
        progress.style.width = value + "%";// set the width of the progress bar
        document.getElementById("tb").innerHTML=value;
        return false;
    }else{
    }

}
function decrease(){

    progress = document.getElementById("progress");
    tb = document.getElementById("tb");
    value -= 10;

    if(value<=10) value = 10;//keep it over 0%
    tb.value = value;
    progress.style.width = value + "%";
    document.getElementById("tb").innerHTML=value;
    printPoint();
    return false;
}

function increase2(){
    if (checkTotal()){
        progress2 = document.getElementById("progress2");
        tb2 = document.getElementById("tb2");
        value2+= 10;// same as value += 1, but better


        if(value2>=100) value2 = 100;//keep it under 100%
        tb2.value = value2;// set the value of the text field
        progress2.style.width = value2 + "%";// set the width of the progress bar
        document.getElementById("tb2").innerHTML=value2;
    }else{
        //alert("You have no More point left!")
    }

}
function decrease2(){

    progress2 = document.getElementById("progress2");
    tb2 = document.getElementById("tb2");
    value2 -= 10;

    if(value2<=10) value2 = 10;//keep it over 0%
    tb2.value = value2;
    progress2.style.width = value2 + "%";
    document.getElementById("tb2").innerHTML=value2;
    printPoint();
}

function increase3(){
    if (checkTotal()){
        progress3 = document.getElementById("progress3");
        tb3 = document.getElementById("tb3");
        value3+= 10;// same as value += 1, but better


        if(value3>=100) value3 = 100;//keep it under 100%
        tb3.value = value3;// set the value of the text field
        progress3.style.width = value3 + "%";// set the width of the progress bar
        document.getElementById("tb3").innerHTML=value3;
    }else{
        //alert("You have no More point left!")
    }
}
function decrease3(){

    progress3 = document.getElementById("progress3");
    tb3 = document.getElementById("tb3");
    value3 -= 10;

    if(value3<=10) value3 = 10;//keep it over 0%
    tb3.value = value3;
    progress3.style.width = value3 + "%";
    document.getElementById("tb3").innerHTML=value3;
    printPoint();
}
function checkPoint(){
    totalValue = value + value2 + value3;
    if(totalValue == 210){
        return true;
    }else{
        //alert("You have not allocate all your points!")
        //return false;
        return true;
    }
}