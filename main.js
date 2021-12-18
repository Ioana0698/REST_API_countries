const countriesList = document.getElementById("countries");
let countries;
let countriesData=[];
const searchBar=document.getElementById('searchBar');


 var selected="";

const filterBy=document.getElementById('filterBy');
const filteredData=document.getElementById("data");
const filterByRegion=document.getElementById("filterByRegion");
const filterByPopulation=document.getElementById("filterByPopulation");
const filterByCurrencies=document.getElementById("filterByCurrencies");


searchBar.addEventListener('keyup',(e)=>{
    const searchString=e.target.value;
    const filteredCards=countriesData.filter((country) =>{
        return(
            country.name.common===searchString ||
            country.capital==searchString ||
            country.ccn3==searchString
            
        );
    });
    if(!filteredCards){
        return countriesList.innerHTML=`<p id="errorMessage">Not found</p>`;
    }else
    displayCards(filteredCards);

});
function filterR(){
    let filterReg=countriesData.filter((country)=>{
        return(country.region==filterByRegion.value)
    })
    displayCards(filterReg);
}

function filterP(){
    let filterPop=countriesData.filter((country)=>{
        return(country.population<=filterByPopulation.value)
    })
    displayCards(filterPop);
}
function fillData(){
    let countries=countriesData;
    let regions=countries.map((country)=>{
        return country.region;
    } );
}

const loadCards=async()=>{
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        countriesData = await res.json();
        console.log(countriesData);
        displayCards(countriesData);
    } catch (err) {
        console.error(err);
    }
};
const displayCards=(countriesData) =>{
  countries = countriesData;
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  
  const htmlString=countries.map((country) => {return `<div class="flip-card" id="country" >
  <div class="flip-card-inner">
      <div class="flip-card-front">
      <img class="pp" src="${country.flags.png}" alt="Flag of ${country.name}" style="width:300px;height:300px;">
      
      </div>
        <div class="flip-card-back">
            <div class="content">
                <p style="font-size:20px; font-weight:1000;"id="${country.name.common}Id">${country.name.common}</p>
                <p style="font-size:15px; font-weight:300;">Capital:<span style="font-size:15px; font-weight:700; id="capital">${country.capital}</span></p>
                <p style="font-size:15px; font-weight:300;">Population: <span style="font-size:15px; font-weight:700; id="capital" id="population">${country.population}</span></p> 
                <p style="font-size:15px; font-weight:300;">Region: <span style="font-size:15px; font-weight:700; id="capital" id="region">${country.region}</span></p>
                <button id="button" onclick="seeMore()">See More</button>
                <div style="visibility:hidden">
                    <p style="font-size:15px; font-weight:300;" id="alpha2Code" class="hidden" style="visibility:hidden">Alpha2 Code:<span style="font-size:15px; font-weight:700;">${country.cca2}</span></p>
                    <p style="font-size:15px; font-weight:300;" id="latlng" class="hidden" style="visibility:hidden">LatLng: <span style="font-size:15px; font-weight:700;">${country.latlng[0]}, ${country.latlng[1]}</span></p>
                    <p style="font-size:15px; font-weight:300;" id="area" class="hidden" style="visibility:hidden">Area: <span style="font-size:15px; font-weight:700;">${country.area}</span></p>
                </div>
                
            </div>
        </div>
    </div>
  </div>`;}).join('');
 
  countriesList.innerHTML = htmlString;
 };
 loadCards();
 var flipCard=document.getElementById("country");
function seeMore(){
    targList=document.getElementsByClassName("hidden");
    if(targList){
        for(var x=0;x<targList.length;x++){
            targList[x].style.visibility="visible"
        }
    document.getElementById("alpha2Code").style.visibility="visible";
    document.getElementById("latlng").style.visibility="visible";
    document.getElementById("area").style.visibility="visible";
    document.getElementById("button").style.visibility="hidden";
}}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }


 


