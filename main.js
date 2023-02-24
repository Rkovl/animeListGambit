const axios = require('axios');
require('dotenv').config();

// const apiUrl = `https://api.myanimelist.net/v2/anime/${randomAnimeID()}?fields=id,title,main_picture,alternative_titles,start_date,synopsis,mean,media_type`;
const apiUrl = `https://api.myanimelist.net/v2/anime/ranking?ranking_type=tv&limit=500&fields=synopsis,start_date,mean`
const clientId = process.env.ID

function randomAnimeSelector(){
    let num = Math.floor(Math.random() * 500)
    console.log(num)

    return num;
}

function gatherData() {
    return new Promise((resolve, reject) => {
      let dataHolder = [];
      let failSafe = 0;
      axios
        .get(apiUrl, {
          headers: {
            'X-MAL-CLIENT-ID': clientId
          }
        })
        .then(response => {
          while (dataHolder.length < 2 && failSafe < 10) {
            dataHolder.push(response.data.data[randomAnimeSelector()]);
            failSafe++;
          }
          if (dataHolder.length < 2) {
            reject('Failed to gather data');
          } else {
            resolve(dataHolder);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
}
gatherData().then(data => {
    console.log(data, "gatherData")
  })
  .catch(error => {
    console.log(error, "how did this happen");
  });

function dataDisplay(){

}




// // Make a request to the API
// axios.get(apiUrl, {
//   headers: {
//     'X-MAL-CLIENT-ID': clientId
//   }
// })
// .then(response => {
//   // Handle the API response
//   console.log(response.data.data[10])
// })
// .catch(error => {
//   // Handle any errors that occur
//   console.log("error in data collection", error.code, error.response.data)
// });