const Base_url = "https://latest.currency-api.pages.dev/v1/currencies";

const dropDown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select"); 
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

document.addEventListener("load",() =>{
    updateExchangeRate();
})

for(let select of dropDown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}

//To change flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newScr;
};
const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === " " || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    //console.log(fromCurr.value,toCurr.value);
    const URL = `${Base_url}/${fromCurr.value.toLowerCase()}.json`; 
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    console.log(amount);
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
}

//To change the value of currency
btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",() =>{
    updateExchangeRate();
})

