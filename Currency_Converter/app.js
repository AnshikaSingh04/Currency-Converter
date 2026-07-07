const BASE_URL = "https://open.er-api.com/v6/latest";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

window.addEventListener("load",()=>{
      updateExchangeRate();
});


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
   let currCode=element.value;
   console.log(currCode);
   let countryCode=countryList[currCode];
   let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newsrc;
};


btn.addEventListener("click",  (evt)=>{
    evt.preventDefault(); 
    updateExchangeRate();
});

async function updateExchangeRate() {
    let amt = document.querySelector(".amount input");
    let amtVal = Number(amt.value);

    if (amtVal < 1 || isNaN(amtVal)) {
        amtVal = 1;
        amt.value = 1;
    }

    const URL = `${BASE_URL}/${fromCurr.value}`;
    const response = await fetch(URL);
    const data = await response.json();

    const rate = data.rates[toCurr.value];
    const finalAmt = (amtVal * rate).toFixed(2);

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}
