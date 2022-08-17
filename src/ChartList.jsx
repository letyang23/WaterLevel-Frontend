import React, { useState, useEffect } from "react";
import "./App.css";
import { sendGetRequest, sendPostRequest } from "./AJAX.jsx";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

// function sendData(){
//     async function send(){
//         console.log("Doing AJAX Request");
//         let data = "April 2022";
//         await sendPostRequest("query/PostData", data);
//     }
// }

function ChartList() {
  //   useEffect(initialize, []);
  //   function initialize() {
  // (async function () {
  console.log("Doing AJAX request");
  let data = {
    month: "04",
    year: "2022",
  };
  console.log(data);
  const nicknames = new Map();
  nicknames.set(0, "Shasta");
  nicknames.set(1, "Ororville");
  nicknames.set(2, "Trinity Lake");
  nicknames.set(3, "New Melones");
  nicknames.set(4, "San Luis");
  nicknames.set(5, "Don Pedro");
  nicknames.set(6, "Berryessa");
  let maxCap = [4552000, 3537577, 2447650, 2400000, 1062000, 2030000, 1602000];
  let stickerObj = {
    label: "Max Capacity",
    data: [],
    backgroundColor: ["rgb(120, 199, 227)"],
  };
  let midIncObj = {
    label: "Current Value",
    data: [],
    backgroundColor: ["rgb(66, 145, 152)"],
  };
  let labels = [];
  sendPostRequest("query/PostData", data)
    .then(function (response) {
      console.log(response);
      for (let i = 0; i < 7; i++) {
        stickerObj.data.push(maxCap[i]);
        midIncObj.data.push(response[i].value);
        labels.push(nicknames.get(i));
      }
      console.log(midIncObj);
    })
    .catch(function (err) {
      console.log("POST Request error", err);
    });
    
    let userData = {}
    userData.labels = labels;
    // userData.datasets = [stickerObj, midIncObj];
    userData.datasets = [midIncObj, stickerObj];
    console.log(userData);
    let options = {
      plugins: {
          legend : {
              display : false
          }
      },
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
          stacked : true
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
    };
    return (
        <div id="chart-container">
          <Bar options={options} data={userData} />
        </div>
      );
}
//     })();
//   }
//   return <p></p>;
// }
export default ChartList;
