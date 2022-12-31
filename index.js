
var array1 = [];

function renderData(data) {

  var divContainer = document.createElement("div");
  divContainer.setAttribute("class", "container");

  divContainer.classList.add("row", "mx-auto",);

  var title = document.createElement("h1");
  title.setAttribute("id", "title");
  title.setAttribute("class", "text-center");
  title.innerHTML = "Rest Countries Weather api";
  document.body.append(title);


  for (let i = 0; i < data.length; i++) {

    var div1 = document.createElement("div");
    div1.setAttribute("class", "col-lg-4");
    div1.classList.add("mb-3", "mt-3", "col-sm-12", "mx-auto");
    div1.innerHTML = ` <div class="card text-center" style="width: 18rem;height:26rem; margin: 0 auto;">
        <h5 class="card-header py-2 bg-dark mb-0 text-white">${data[i].name}</h5>
        <div class="div-image" style="height:250px" ><img src=${data[i].flag} class="card-img-top" alt="country-flag">
        </div>
        <div class="card-body">
             <h5 class="card-title">Capital : ${data[i].capital}</h5>
             <h5 class="card-title">Region : ${data[i].region}</h5>
             <h5  class="card-title">Country Code: ${data[i].alpha3Code}</h5>    
                   
          <a href="#" id= ${data[i].alpha3Code} onclick="displayTemp(this.id)" class="btn btn-primary">click for weather</a>
        </div>
      </div>`;
    divContainer.append(div1);

    array1.push(data[i]);

  }

  document.body.append(divContainer);

}

var res = fetch("https://restcountries.com/v2/all")
  .then((packetdata) => packetdata.json())
  .then(renderData)
  .catch((error) => console.log(error));



console.log("array1", array1);

function displayTemp(alphacode) {

  var lat, lon;
  for (let i = 0; i < array1.length; i++) {

    if (array1[i].alpha3Code === alphacode) {
      console.log(array1[i].latlng);
      [lat, lon] = array1[i].latlng;
    }

  }

  openData(lat, lon, alphacode);
}


//async await

async function openData(lat, lon, alphacode) {

  var res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=caf7428b4923d4ee806cf035f1070c9a`);
  var res1 = await res.json();
  var Temp = res1.main.temp;
  document.getElementById(alphacode).innerHTML = Temp;

}

