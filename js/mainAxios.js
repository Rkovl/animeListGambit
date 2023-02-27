// const axios = require('axios');
import axios from 'axios';
require('dotenv').config({path:'../.env'});

let animeData
const clientId = process.env.ID
let bodyInfo = document.querySelector('#bodyInfo')

function randomAnimeSelector(){
    let animeSelectNum = Math.floor(Math.random() * 4000)
    console.log(animeSelectNum, "animeNumber")
    return animeSelectNum;
}

async function gatherData() {
  try {
    console.log("trying gatherData Function")
    let apiUrl = [
      `https://api.myanimelist.net/v2/anime/ranking?ranking_type=tv&limit=500&fields=synopsis,start_date,mean`,
      `https://api.myanimelist.net/v2/anime/ranking?offset=500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
      `https://api.myanimelist.net/v2/anime/ranking?offset=1000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
      `https://api.myanimelist.net/v2/anime/ranking?offset=1500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
      `https://api.myanimelist.net/v2/anime/ranking?offset=2000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
      `https://api.myanimelist.net/v2/anime/ranking?offset=2500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
      `https://api.myanimelist.net/v2/anime/ranking?offset=3000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
      `https://api.myanimelist.net/v2/anime/ranking?offset=3500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
    ]
    let dataArr = [];
    for(const url of apiUrl){
      const response = await axios.get(url, {
        headers: {
          'X-MAL-CLIENT-ID': clientId
        }
      });
        dataArr.push(response.data.data);
    }
    return dataArr.flat();
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}



// async function handleLogoClick() {
//   try {
//     const data = await gatherData();
//     console.log(data, "gatherData");
//     animeData = data;
//   } catch (error) {
//     console.error(error);
//   }
// }

setInterval(async () => {
  try {
    console.log("in setInt")
    const data = await gatherData();
    console.log(data, "gatherData");
    animeData = data;
  } catch (error) {
    console.log(error, "how did this happen");
  }
}, 172800000);


function dataDisplay(){
  if(animeData == undefined){
    gatherData().then(data => {
      animeData = data;
      console.log(animeData[Number(randomAnimeSelector())])
      let animeLeft = animeData[Number(randomAnimeSelector())]
      let animeRight = animeData[Number(randomAnimeSelector())]
    })
    .catch(error => {
      console.log(error, "how did this happen");
    });
  }
  else{
    console.log(animeData[Number(randomAnimeSelector())])
  }
}
console.log("tun")
if(animeData == undefined){
  gatherData().then(data => {
    animeData = data;
    console.log(animeData[Number(randomAnimeSelector())])
    let animeLeft = animeData[Number(randomAnimeSelector())]
    let animeRight = animeData[Number(randomAnimeSelector())]
    bodyInfo.innerHTML = `
    <div class="col-6" id="leftInfo">
      <div class="card m-5">
        <h3 class="card-header" id="leftCardTitle">${animeLeft.node.title}</h3>
        <div class="card-body">
          <h5 class="card-text" id="leftCardBody">${animeLeft.node.synopsis}</h5>
        </div>
      </div>
    </div>
    <div class="col-6" id="rightInfo">
      <div class="card m-5">
        <h3 class="card-header" id="leftCardTitle">${animeRight.node.title}</h3>
        <div class="card-body">
          <h5 class="card-text" id="leftCardBody">${animeRight.node.synopsis}</h5>
        </div>
      </div>
    </div>
    `
  })
  .catch(error => {
    console.log(error, "how did this happen");
  });
}
else{
  console.log(animeData[Number(randomAnimeSelector())])
}
