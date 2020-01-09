//A way to add an element as a sibling
//header2.insertAdjacentElement("afterend", button);

const loadForm = () => {

    //Select Body
    const body = document.querySelector("body");

    //Input Fields
    let fieldArray = ["ehcp", "slope", "cr", "par"];

    //Create Div Container 
    const createFormContainer = document.createElement("div");
    //======TO DO => Remove all these variables. can just use the created element variable
    body.appendChild(createFormContainer);
    //Div Container Class
    createFormContainer.classList.add("containerWrapper")

    //Create <form> tag
    const createFormTag = document.createElement("form");
    createFormContainer.appendChild(createFormTag);
    createFormTag.classList.add("formContainer")

    //Create Input HTML
    fieldArray.forEach(input => {
        createFormTag.innerHTML += `<label> ${input} </label>`    
        createFormTag.innerHTML += `<input type="number" class="${input}" name=${input} required>`
    });

    //Create buttons Div
    const buttonDiv = document.createElement("div");
    createFormTag.appendChild(buttonDiv);
    buttonDiv.classList.add("buttonDiv");

    //Create Reset <input>
    const createInputReset = document.createElement("input");

    //Create Submit <input>  
    const createInputSubmit = document.createElement("input");

    //Append Submit and Reset buttons
    buttonDiv.appendChild(createInputReset);
    buttonDiv.appendChild(createInputSubmit);
    
    createInputReset.classList.add("resetButton");
    createInputReset.setAttribute("type", "reset");
    createInputReset.setAttribute("value", "Reset");

    createInputSubmit.classList.add("submitButton");
    createInputSubmit.setAttribute("type", "submit");
    createInputSubmit.setAttribute("value", "Calculate");
    
    //Allow Decimals in EHcp
    let ehcpInput = document.querySelector(".ehcp");
    ehcpInput.setAttribute("step", "0.1");

    //Allow Decimals in CR
    document.querySelector(".cr").setAttribute("step", "0.1")

    //Set Placeholders
    document.querySelector(".ehcp").setAttribute("placeholder", "e.g. 7.2")
    document.querySelector(".slope").setAttribute("placeholder", "e.g. 113")
    document.querySelector(".cr").setAttribute("placeholder", "e.g. 72.0")
    document.querySelector(".par").setAttribute("placeholder", "e.g. 72")
};

//Loadform when page is loaded

loadForm();

//========Event Listener======

const bodyNode = document.querySelector("body");

//console.log(form.innerHTML)

//Calculate PHcp Function
bodyNode.addEventListener("submit", e => {
   
    const form = document.querySelector("form");
    //Prevent default prevents the default action, which is a page refresh
    e.preventDefault();
    let ehcp = form.ehcp.value
    let slope = form.slope.value
    let cr = form.cr.value
    let par = form.par.value

    let phcp = (ehcp, slope, cr, par) => (ehcp*(slope/113))+(cr-par);
    console.log(Number(phcp(ehcp, slope, cr, par)));
    
    //remove the containerWrapper Div
    const formContainer = document.querySelector(".formContainer");
    formContainer.remove();

    //Create Text Div
    let containerWrapper = document.querySelector(".containerWrapper");

    let textDiv = document.createElement("div");
    containerWrapper.appendChild(textDiv);
    textDiv.classList.add("yourHcp");
    textDiv.innerText = "Your Handicap:"
    //Create Div to add PHCP
    let handicapDiv = document.createElement("div");
   
    let phcpResult = Math.round(Number(phcp(ehcp, slope, cr,par)));
    containerWrapper.appendChild(handicapDiv);
    handicapDiv.classList.add("handicapDiv");
    handicapDiv.innerText = "0";

    //Animation
    let output = 0;
    const timer = setInterval(() => {
        handicapDiv.innerText = `${output++}`
        if(output > phcpResult){
            clearInterval(timer);
        }
    }, 80);



    //Create a Button to "Re-Start"
    let createRestartButton = document.createElement("button");
    handicapDiv.insertAdjacentElement("afterend", createRestartButton);
    createRestartButton.innerText = "Restart";
    createRestartButton.classList.add("restartButton");
});

//Click of Restart Button

bodyNode.addEventListener("click", e => {

    if(e.target.classList.contains("restartButton")){
        console.log("Yes");
        document.querySelector(".yourHcp").remove();
        document.querySelector(".handicapDiv").remove();
        e.target.remove();
        loadForm()
    }
});


//==========Input Check=============

//EHcp

bodyNode.addEventListener("focusout", e => {
    if(e.target.classList.contains("ehcp")){
        if(e.target.value > 54){
            let ehcpErrorDiv = document.createElement("span");
            e.target.insertAdjacentElement("afterend", ehcpErrorDiv);
            ehcpErrorDiv.classList.add("error");
            ehcpErrorDiv.innerText = "Insert a number below 54"

            document.querySelector(".submitButton").setAttribute("disabled")
        } 
    }
});

bodyNode.addEventListener("focusin", e => {
    if(e.target.classList.contains("ehcp")){
        if(e.target.value > 54){
            document.querySelector(".error").remove()
        }
    }
})