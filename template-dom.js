let tempaddBtn = document.getElementById("temptheAdd");
let tempclearBtn = document.getElementById("tempclear");
let tempdisplay = document.getElementById("tempdisplay");
let tempinput = document.querySelector(".tempinput");
let tempoutput = document.querySelector(".number-plate");
let temptheList = document.querySelector(".templist-sect");
let temperrormess = document.querySelector(".temperror-message");



document.addEventListener('DOMContentLoaded', function(){


    var tempregFact = regFactFunc();

    var thetempObj = {};
    var thetempArr = [];

    function tempregNumber() {

        tempregFact.getRegNum(tempinput.value);
        tempregFact.testRegNum();

        localStorage["thetempArr"] = JSON.stringify(tempregFact.values().theArr);
        localStorage["thetempobj"] = JSON.stringify(tempregFact.values().theObj);
        

        if (tempregFact.values().switching === true) {

            var templateSource = document.querySelector(".userTemplate").innerHTML;
            var userTemplate = Handlebars.compile(templateSource);

            var userData = { 
                registration: tempregFact.values().theArr
            };

            userDataHTML = userTemplate(userData);
            temptheList.innerHTML = userDataHTML;
            

            temperrormess.classList.remove("warn");
            temperrormess.classList.add("added");

            temperrormess.innerHTML = tempregFact.values().theAdd;
            setTimeout(function(){
                temperrormess.innerHTML = "";
            }, 1500);
            
        } else if (tempregFact.values().switching === false) {
            
            temperrormess.classList.remove("added");
            temperrormess.classList.add("warn");
            
            temperrormess.innerHTML = tempregFact.values().theError;
            setTimeout(function(){
                temperrormess.innerHTML = "";
            }, 1500);
            
        }

        tempinput.value = "";

    }

    tempaddBtn.addEventListener('click', tempregNumber);


    function thetempDisplay() {
        var tempradio = document.querySelector("input[name='temptown']:checked");
        
        if (tempradio) {       
            
            if (tempregFact.filtering(tempradio.value).length >= 1) {
                while (temptheList.hasChildNodes()) {  
                    temptheList.removeChild(temptheList.firstChild);
                }

                tempregFact.filtering(tempradio.value);
                
                for (var i = 0; i < tempregFact.filtering(tempradio.value).length; i++) {
                    var itt1 = tempregFact.filtering(tempradio.value)[i];
                
                    // var newDiv = document.createElement("div");
                    // var newText = document.createTextNode(itt1);
                    // newDiv.appendChild(newText);
                    // newDiv.classList.add("number-plate");
                    // temptheList.appendChild(newDiv);

                    var templateSource = document.querySelector(".userTemplate").innerHTML;
                    var userTemplate = Handlebars.compile(templateSource);

                    var userData = { 
                        registration: itt1
                    };

                    userDataHTML = userTemplate(userData);
                    temptheList.innerHTML = userDataHTML;

                    
                }
            } else if (tempregFact.filtering(tempradio.value).length == 0) {
                while (temptheList.hasChildNodes()) {  
                    temptheList.removeChild(temptheList.firstChild);
                }

                temperrormess.classList.remove("added");
                temperrormess.classList.add("warn");

                temperrormess.innerHTML = tempregFact.values().noReg;
                setTimeout(function(){
                    temperrormess.innerHTML = "";
                }, 1500);
            }
            
        } else if (!tempradio) {

            temperrormess.classList.remove("added");
            temperrormess.classList.add("warn");

            temperrormess.innerHTML = tempregFact.values().noRadio;
            setTimeout(function(){
                temperrormess.innerHTML = "";
            }, 1500);
        }
        
    }

    tempdisplay.addEventListener('click', thetempDisplay);


    function tempclearReg() {
        tempregFact.tempclear();
        while (temptheList.hasChildNodes()) {  
            temptheList.removeChild(temptheList.firstChild);
        }

        temperrormess.classList.remove("warn");
        temperrormess.classList.add("added");
        

        temperrormess.innerHTML = tempregFact.values().theRegClear;
        setTimeout(function(){
            temperrormess.innerHTML = "";
        }, 1500);
        
    }

    tempclearBtn.addEventListener('click', tempclearReg);

    if (localStorage["thetempArr"] && localStorage["thetempobj"]) {

        thetempObj = JSON.parse(localStorage["thetempobj"]);
        thetempArr = JSON.parse(localStorage["thetempArr"]);
        tempregFact.localReset(thetempArr, thetempObj);

        
        for (var j = 0; j < thetempArr.length; j++) {
            var itt1 = thetempArr[j];

            var newDiv = document.createElement("div");
            var newText = document.createTextNode(itt1);
            newDiv.appendChild(newText);
            newDiv.classList.add("number-plate");
            temptheList.appendChild(newDiv);
        }
        
    }
})