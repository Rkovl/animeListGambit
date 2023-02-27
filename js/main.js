let animeData
const clientId = 'e1a909433d30ddee822fc956e58d7444'
let bodyInfo = document.querySelector('#bodyInfo')
const randomAnimeSelector = ()=> {
    let animeSelectNum = Math.floor(Math.random() * 4000)
    console.log(animeSelectNum, "animeNumber")
    return animeSelectNum;
}

const gatherData = async ()=> {
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
    ];
    let dataArr = [];
    for(const url of apiUrl) {
      const response = await fetch(url, {
        headers: {
          'X-MAL-CLIENT-ID': clientId,
        },
      });
      console.log(response, "response")
      const data = await response.json();
      console.log(data,"data")
        // dataArr.push(response.data.data);
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


const dataDisplay = async()=> {
  if(animeData == undefined){
      animeData = await gatherData();
      console.log(animeData[Number(randomAnimeSelector())])
      let animeLeft = animeData[Number(randomAnimeSelector())]
      let animeRight = animeData[Number(randomAnimeSelector())]
  }
  else{
    console.log(animeData[Number(randomAnimeSelector())])
  }
}
console.log("tun")
dataDisplay()
// if(animeData == undefined){
  
//     animeData = animeData = await gatherData();
//     console.log(animeData[Number(randomAnimeSelector())])
//     let animeLeft = animeData[Number(randomAnimeSelector())]
//     let animeRight = animeData[Number(randomAnimeSelector())]
//     bodyInfo.innerHTML = `
//     <div class="col-6" id="leftInfo">
//       <div class="card m-5">
//         <h3 class="card-header" id="leftCardTitle">${animeLeft.node.title}</h3>
//         <div class="card-body">
//           <h5 class="card-text" id="leftCardBody">${animeLeft.node.synopsis}</h5>
//         </div>
//       </div>
//     </div>
//     <div class="col-6" id="rightInfo">
//       <div class="card m-5">
//         <h3 class="card-header" id="leftCardTitle">${animeRight.node.title}</h3>
//         <div class="card-body">
//           <h5 class="card-text" id="leftCardBody">${animeRight.node.synopsis}</h5>
//         </div>
//       </div>
//     </div>
//     `
// }
// else{
//   console.log(animeData[Number(randomAnimeSelector())])
// }
