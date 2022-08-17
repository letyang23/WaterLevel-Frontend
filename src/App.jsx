import React,{useState,useEffect} from 'react';
import './App.css';
import MonthPicker from './MonthPicker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
);
const options = {
  plugins: {
   
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid:{
        display:false
      },
    },
    y: {
      stacked: true,
      grid:{
        display:false
      },
    },
  }
};

const labels = ['Shasta', 'Oroville', 'Trinity Lake', 'New Melones', 'San Luis', 'Don Pedro', 'Berryessa'];
const tations = ["SHA","ORO","CLE","NML","SNL","DNP","BER"];
const _data = {
  labels,
  datasets: [
    {
      data: labels.map(() => 0),
      backgroundColor: 'rgb(66,145,152)',
    },
    {
      data: labels.map(() => 0),
      backgroundColor: 'rgb(120,199,227)',
    }
  ],
};

function App() {
  const [date, setDate] = useState({month: 4, year: 2022 });
  const [data,setData] = useState(_data);

  const [lessShow, setLessShow] = useState(false);

  function yearChange(newYear) {
      let m = date.month;
      setDate({year: newYear, month: m });
    }

  function monthChange(newMonth){
      let y = date.year;
      setDate({month: newMonth, year: y});
      queryData(y,newMonth)
  }
  function queryData(year,month){
    fetch("/query?year="+year+"&month="+month).then((response) => {
      return response.json()
    }).then(json => {
      var dset = {};
      var hset = {};
      //H - D
      json.forEach(d=>{
        if(d.durCode == 'D'){
          !dset[d.stationId]?dset[d.stationId]={value:0,num:0}:null;
          dset[d.stationId].value +=d.value;
          dset[d.stationId].num ++;
        }
        if(d.durCode == 'H'){
          !hset[d.stationId]?hset[d.stationId]={value:0,num:0}:null;
          hset[d.stationId].value +=d.value;
          hset[d.stationId].num ++;
        }
      })
      setData( {
        labels,
        datasets: [
          {
            data: tations.map((d) => {
              if(hset[d]){
                return hset[d].value/hset[d].num;
              }else{
                return 0;
              }
            }),
            backgroundColor: 'rgb(66,145,152)',
          },
          {
            data: tations.map((d) => {
              if(dset[d]){
                return dset[d].value/dset[d].num;
              }else{
                return 0;
              }
            }),
            backgroundColor: 'rgb(120,199,227)',
          }
        ],
      });
    })
  }

  useEffect(() => {
    queryData(2022,4)
  }, []) 


  return (
    <main>
      <div className="header">
        <header>
          Water Storage in California reservoirs
        </header>
      </div>
      <div className="content">
        <div className="row">
          <div className="row1">
            <p>
            California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity.
            </p>
            <p className="row12">
              California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
            </p>
            <p>
              <button className="btn"
              onClick={()=>{
                setLessShow(!lessShow)
              }}
            >See {lessShow?"less":"more"}</button>
            </p>
          </div>
          <div className="row2">
            <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg"/>
            <span className="capture">Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.</span>
          </div>
        </div>
        {lessShow?<div className="row">
          <div className="fig">
          <Bar className="barfig" options={options} data={data} />
          </div>
          <div className="op">
            <p>
              Here's a quick look at some of the data on reservoirs from the 
              <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>,
              which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
            </p>
            <div className="row12">
              <span className="optitle">Change month:</span>
              <br/>
              <div className="datepicker">
              <MonthPicker  
                date = {date}
                yearFun = {yearChange}
                monthFun = {monthChange}
                />
              </div>
            </div>
          </div>
        </div>:null
      }
      </div>
    </main>
  );
}

export default App;