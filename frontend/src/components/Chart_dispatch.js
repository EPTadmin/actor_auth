import React from "react"
import {Chart as ChartJS, Legend,Title, BarElement, CategoryScale, LinearScale, LineElement} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import AxiosInstance from "./Axios"
import { useState,useEffect } from 'react';
import { json } from "react-router-dom";






function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

// function onlyUnique(value, index, array_PH) {
//   return array_PH.indexOf(value) === index;
// }

// function onlyUnique(value, index, array_O2) {
//   return array_O2.indexOf(value) === index;
// }

// function onlyUnique(value, index, array_FE) {
//   return array_FE.indexOf(value) === index;
// }


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Title,
  )
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



const BarChart_load =() => {
  const[course, setCourse]=useState([])
  const[person, setPerson]=useState([])
  const[person_course, setPersonCourse]=useState([])
  const[person_activity, setPersonActivity]=useState([])
  const[loading,setLoading] = useState(true)
  const[position_activity,setActivity]=useState([])


  useEffect(() => { 

    AxiosInstance
    .get(`course/`)
      .then((res) => {

      setCourse(res.data) 
        
     setLoading(false)

    });

    AxiosInstance
    .get(`person/`)
      .then((res) => {

      setPerson(res.data) 

     setLoading(false)

    });

    AxiosInstance
    .get(`person_course/`)
      .then((res) => {

      setPersonCourse(res.data) 

     setLoading(false)

    });

    AxiosInstance
    .get(`person_activity/`)
      .then((res) => {

      setPersonActivity(res.data) 

     setLoading(false)

    });

    AxiosInstance
    .get(`position_activity/`)
      .then((res) => {

      setActivity(res.data) 

     setLoading(false)

    });


  },[])



    var color=[]
          color.push("#9ad0f5","#3d85c6","#ffb0c1","#e06666","#f7be85","#ffe6aa","#a4dfdf","#ccb2ff","#6a7e69","#825acf","#f1c232")


if (Array.isArray(course)&&Array.isArray(person)&&Array.isArray(person_course)){



var course_o1 = course.filter(x => x.type ==="O1")
var course_o1_id = course_o1.map(x => x.id)

var course_ph = course.filter(x => x.type ==="PH")
var course_ph_id = course_ph.map(x => x.id)

var course_fe = course.filter(x => x.type ==="FE")
var course_fe_id = course_fe.map(x => x.id)

var course_o2 = course.filter(x => x.type ==="O2")
var course_o2_id = course_o2.map(x => x.id)


var array_O1 =[]
var array_FE =[]
var array_PH =[]
var array_O2 =[]

// console.log('position_activity',position_activity)
// console.log('perspm_activity',person_activity)

var courses = person_course.map(x => x.course)

let unique_course = courses.filter(function(value, index, array_O1) {
  return array_O1.indexOf(value) === index;
}); 



var unique_course_name = []
for (let a = 0;a<unique_course.length;a++){
    unique_course_name.push(person.filter(x=>x.id === unique_course[a]).map(x=> x.name))
}


var lineChartData_O1 = {
  labels: course.filter(x=>x.type === 'O1'),

    datasets: []
}
var lineChartData_FE = {
  labels: course.filter(x=>x.type === 'FE'),

    datasets: []
}

var lineChartData_O2 = {
  labels: course.filter(x=>x.type === 'O2'),

    datasets: []
}

var lineChartData_PH = {
  labels: course.filter(x=>x.type === 'PH'),

    datasets: []
}



let text = "["
let text2 = "]"
var array_O1_new_indecol=[]
var array_O1_new_sustain=[]
var array_O1_new_process=[]
var array_O1_new_thermo=[]


var array_O1_new_total =[]
var p=0

var array_FE_new_indecol=[]
var array_FE_new_sustain=[]
var array_FE_new_process=[]
var array_FE_new_thermo=[]


var array_FE_new_total =[]

var array_PH_new_indecol=[]
var array_PH_new_sustain=[]
var array_PH_new_process=[]
var array_PH_new_thermo=[]


var array_PH_new_total =[]

var array_O2_new_indecol=[]
var array_O2_new_sustain=[]
var array_O2_new_process=[]
var array_O2_new_thermo=[]


var array_O2_new_total =[]





var groupe_person =person.map((x)=>x.groupe).filter(onlyUnique)


for (let a=0; a<person_course.length;a++){
  if (lineChartData_O1.labels.map(x=>x.id).includes(person_course[a].person)){
    array_O1.push({Teaching : person_course[a].course,Lecturer : person_course[a].person,Amount : person_course[a].amount})
  }
}

for (let a=0; a<person_course.length;a++){
  if (lineChartData_FE.labels.map(x=>x.id).includes(person_course[a].person)){
    array_FE.push({Teaching : person_course[a].course,Lecturer : person_course[a].person,Amount : person_course[a].amount})
  }
}

for (let a=0; a<person_course.length;a++){
  if (lineChartData_PH.labels.map(x=>x.id).includes(person_course[a].person)){
    array_PH.push({Teaching : person_course[a].course,Lecturer : person_course[a].person,Amount : person_course[a].amount})
  }
}

for (let a=0; a<person_course.length;a++){
  if (lineChartData_O2.labels.map(x=>x.id).includes(person_course[a].person)){
    array_O2.push({Teaching : person_course[a].course,Lecturer : person_course[a].person,Amount : person_course[a].amount})
  }
}
console.log('o1',array_O1)
console.log('o2',array_O2)
console.log('fe',array_FE)
console.log('ph',array_PH)

var Teaching  = person_course.map((x)=>x.person).filter(onlyUnique)
var Teaching_i  = person.filter((x) => (x.groupe === 'i' )).map(x=>x.id).filter(onlyUnique)
var Teaching_s  = course.filter((x) => (x.groupe === 's' )).map(x=>x.id).filter(onlyUnique)
var Teaching_p  = course.filter((x) => (x.groupe === 'p' )).map(x=>x.id).filter(onlyUnique)
var Teaching_t  = course.filter((x) => (x.groupe === 't' )).map(x=>x.id).filter(onlyUnique)


var lecturer_O1 = course.filter(x => x.type === 'O1').map(x=> x.id)
var lecturer_O1_name = course.filter(x => x.type === 'O1').map(x=> x.name)
var lecturer_O2 = course.filter(x => x.type === 'O2').map(x=> x.id)
var lecturer_O2_name = course.filter(x => x.type === 'O2').map(x=> x.name)

var lecturer_FE = course.filter(x => x.type === 'PE').map(x=> x.id)
var lecturer_FE_name = course.filter(x => x.type === 'PE').map(x=> x.name)

var lecturer_PH = course.filter(x => x.type === 'PH').map(x=> x.id)
var lecturer_PH_name = course.filter(x => x.type === 'PH').map(x=> x.name)

for (let k =0;k<lecturer_O1.length;k++){
  var amount_i = 0
  var amount_s = 0
  var amount_p = 0
  var amount_t = 0

  var amount =0
 for (let i=0;i<Teaching.length;i++){
  for (let j=0;j<array_O1.map(x=>x.Teaching).length;j++){
      if (((lecturer_O1[k] != array_O1[j].Lecturer) && (Teaching[i] != array_O1[j].Teaching)) || ((lecturer_O1[k] === array_O1[j].Lecturer) && (Teaching[i] != array_O1[j].Teaching)) || ((lecturer_O1[k] != array_O1[j].Lecturer) && (Teaching[i] === array_O1[j].Teaching))) {
        p=0
      }
      if ((lecturer_O1[k] === array_O1[j].Lecturer) && (Teaching[i] === array_O1[j].Teaching)){
        if (Teaching_i.includes( Teaching[i])){
          p = array_O1[j].Amount
          amount_i = amount_i +  p

        }
        else if (Teaching_s.includes( Teaching[i])){
          p = array_O1[j].Amount
          amount_s = amount_s +  p 
        }
        else if (Teaching_p.includes( Teaching[i])){
          p=array_O1[j].Amount 
          amount_p = amount_p + p
        }



        else if (Teaching_t.includes( Teaching[i])){
          p=array_O1[j].Amount 
          amount_t = amount_t + p
          
        }


      }
  }
 }





array_O1_new_indecol.push(amount_i) 
array_O1_new_sustain.push(amount_s) 
array_O1_new_process.push(amount_p) 
array_O1_new_thermo.push(amount_t) 


}

array_O1_new_total.push(text.concat([array_O1_new_indecol]).concat(text2)) 
array_O1_new_total.push(text.concat([array_O1_new_sustain]).concat(text2)) 
array_O1_new_total.push(text.concat([array_O1_new_process]).concat(text2)) 
array_O1_new_total.push(text.concat([array_O1_new_thermo]).concat(text2)) 




var lineChartData_O1 = {
  labels: lecturer_O1_name,

    datasets: []
}
array_O1_new_total.forEach(function (a, i) {
        lineChartData_O1.datasets.push({
          label:   lecturer_O1_name[i],
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke:
              'rgba(220,220,220,1)',
          data: JSON.parse(a)
          
       });
      

  }
);

var data_set_indecol=[]
for (let a=0; a<lineChartData_O1.datasets.map(x=>x.label).length;a++){
    data_set_indecol.push({label : groupe_person[a],data : lineChartData_O1.datasets.map(x=>x.data)[a],backgroundColor : color[a]})
  }










































































  for (let k =0;k<lecturer_PH.length;k++){
    var amount_i = 0
    var amount_s = 0
    var amount_p = 0
    var amount_t = 0

   for (let i=0;i<Teaching.length;i++){
    for (let j=0;j<array_PH.map(x=>x.Teaching).length;j++){
        if (((lecturer_PH[k] != array_PH[j].Lecturer) && (Teaching[i] != array_PH[j].Teaching)) || ((lecturer_PH[k] === array_PH[j].Lecturer) && (Teaching[i] != array_PH[j].Teaching)) || ((lecturer_PH[k] != array_PH[j].Lecturer) && (Teaching[i] === array_PH[j].Teaching))) {
          p=0
        }
        if ((lecturer_PH[k] === array_PH[j].Lecturer) && (Teaching[i] === array_PH[j].Teaching)){
  
          if (Teaching_i.includes( Teaching[i])){
            p = array_PH[j].Amount
            amount_i = amount_i +  p
  
          }
          else if (Teaching_s.includes( Teaching[i])){
            p = array_PH[j].Amount
            amount_s = amount_s +  (array_PH[j].Amount)/100*252 
          }
          else if (Teaching_p.includes( Teaching[i])){
            p=array_PH[j].Amount 
            
            var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
            poeng = poeng.toString().replace(',','.') 
            amount_p = amount_p + ((array_PH[j].Amount*poeng)/(100*3.75)*125)
          }


  
          else if (Teaching_t.includes( Teaching[i])){
            var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
            if  (poeng){
              amount_t += 250
            }
          }
  
  
        }
    }
   }
  
   if ((person_activity.map((x)=>x.person)).includes(lecturer_PH[k]) ){
    // console.log(lecturer_PH_name[k],person_activity.filter(x=>x.person === lecturer_PH[k]).map(x=>x.activity).length,person_activity.filter(x=>x.person === lecturer_PH[k]).map(x=>x.activity))
    for(let a = 0;a<person_activity.filter(x=>x.person === lecturer_PH[k]).map(x=>x.activity).length;a++){
      var activity_num = person_activity.filter(x=>x.person === lecturer_PH[k]).map(x=>x.activity)[a]
  
      if (position_activity.map(x=>x.emne)[activity_num-1] === 'L'){
  
        // console.log(lecturer_PH_name[k],person_activity.filter(x=>x.person === lecturer_PH[k]).map(x=>x.activity)[a])
        poeng= (position_activity.map(x=>x.arsverk)[person_activity.filter(x=>x.person === lecturer_PH[k]).map(x=>x.activity)[a]-1])
        // console.log('poeng',poeng)
        var amount = person_activity.filter(x=>x.person === lecturer_PH[k]).filter(x=>x.activity===activity_num).map(x=>x.amount)
        // console.log(amount_position)
        var amount_position = amount_position + 1750*poeng*amount/100
    }
    if (position_activity.map(x=>x.emne)[activity_num-1] === 'P'){
      console.log('prject')
      console.log(lecturer_PH_name[k],person_activity.filter(x=>x.person === lecturer_PH[k]).map(x=>x.activity)[a])
      poeng= (position_activity.map(x=>x.antall_time)[person_activity.filter(x=>x.person === lecturer_PH[k]).map(x=>x.activity)[a]-1])
      console.log('P','poeng',poeng)
      var amount = person_activity.filter(x=>x.person === lecturer_PH[k]).filter(x=>x.activity===activity_num).map(x=>x.amount)
      // console.log(amount_position)
      var amount_project = amount_project + poeng*amount
  }
    }
  
   }
  
  
  
  array_PH_new_indecol.push(amount_i) 
  array_PH_new_sustain.push(amount_s) 
  array_PH_new_process.push(amount_p) 
  array_PH_new_thermo.push(amount_t) 

  
  
  }
  
  
  array_PH_new_total.push(text.concat([array_PH_new_indecol]).concat(text2)) 
  array_PH_new_total.push(text.concat([array_PH_new_sustain]).concat(text2)) 
  array_PH_new_total.push(text.concat([array_PH_new_process]).concat(text2)) 
  array_PH_new_total.push(text.concat([array_PH_new_thermo]).concat(text2)) 
  
  
  
  
  var lineChartData_PH = {
    labels: lecturer_PH_name,
  
      datasets: []
  }
  array_PH_new_total.forEach(function (a, i) {
          lineChartData_PH.datasets.push({
            label:   lecturer_PH_name[i],
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke:
                'rgba(220,220,220,1)',
            data: JSON.parse(a)
            
         });
        
  
    }
  );
  
  var data_set_thermo=[]
  for (let a=0; a<lineChartData_PH.datasets.map(x=>x.label).length;a++){
      data_set_thermo.push({label : groupe_person[a],data : lineChartData_PH.datasets.map(x=>x.data)[a],backgroundColor : color[a]})
    }
  
  



















































    for (let k =0;k<lecturer_O2.length;k++){
      var amount_i = 0
      var amount_s = 0
      var amount_p = 0
      var amount_t = 0

     for (let i=0;i<Teaching.length;i++){
      for (let j=0;j<array_O2.map(x=>x.Teaching).length;j++){
          if (((lecturer_O2[k] != array_O2[j].Lecturer) && (Teaching[i] != array_O2[j].Teaching)) || ((lecturer_O2[k] === array_O2[j].Lecturer) && (Teaching[i] != array_O2[j].Teaching)) || ((lecturer_O2[k] != array_O2[j].Lecturer) && (Teaching[i] === array_O2[j].Teaching))) {
            p=0
          }
          if ((lecturer_O2[k] === array_O2[j].Lecturer) && (Teaching[i] === array_O2[j].Teaching)){
    
            if (Teaching_i.includes( Teaching[i])){
              p = array_O2[j].Amount
              amount_i = amount_i +  p
    
            }
            else if (Teaching_s.includes( Teaching[i])){
              p = array_O2[j].Amount
              amount_s = amount_s +  p
            }
            else if (Teaching_p.includes( Teaching[i])){
              p=array_O2[j].Amount 
              amount_p = amount_p +p
            }


    
            else if (Teaching_t.includes( Teaching[i])){
              var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
              if  (poeng){
                amount_t += 250
              }
            }
    
    
          }
      }
     }
    

    
    
    
    array_O2_new_indecol.push(amount_i) 
    array_O2_new_sustain.push(amount_s) 
    array_O2_new_process.push(amount_p) 
    array_O2_new_thermo.push(amount_t) 
    
    
    }
    
    
    array_O2_new_total.push(text.concat([array_O2_new_indecol]).concat(text2)) 
    array_O2_new_total.push(text.concat([array_O2_new_sustain]).concat(text2)) 
    array_O2_new_total.push(text.concat([array_O2_new_process]).concat(text2)) 
    array_O2_new_total.push(text.concat([array_O2_new_thermo]).concat(text2)) 

    
    
    
    
    var lineChartData_O2 = {
      labels: lecturer_O2_name,
    
        datasets: []
    }
    array_O2_new_total.forEach(function (a, i) {
      lineChartData_O2.datasets.push({
              label:   lecturer_O2_name[i],
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke:
                  'rgba(220,220,220,1)',
              data: JSON.parse(a)
              
           });
          
    
      }
    );
    
    var data_set_sustain=[]
    for (let a=0; a<lineChartData_O2.datasets.map(x=>x.label).length;a++){
        data_set_sustain.push({label : groupe_person[a],data : lineChartData_O2.datasets.map(x=>x.data)[a],backgroundColor : color[a]})
      }


































    for (let k =0;k<lecturer_FE.length;k++){
      var amount_i = 0
      var amount_s = 0
      var amount_p = 0
      var amount_MS = 0
      var amount_t = 0
      var amount_FP = 0

     for (let i=0;i<Teaching.length;i++){
      for (let j=0;j<array_FE.map(x=>x.Teaching).length;j++){
          if (((lecturer_FE[k] != array_FE[j].Lecturer) && (Teaching[i] != array_FE[j].Teaching)) || ((lecturer_FE[k] === array_FE[j].Lecturer) && (Teaching[i] != array_FE[j].Teaching)) || ((lecturer_FE[k] != array_FE[j].Lecturer) && (Teaching[i] === array_FE[j].Teaching))) {
            p=0
          }
          if ((lecturer_FE[k] === array_FE[j].Lecturer) && (Teaching[i] === array_FE[j].Teaching)){
    
            if (Teaching_i.includes( Teaching[i])){
              p = array_FE[j].Amount
              amount_i = amount_i +  (array_FE[j].Amount)/100*280 
    
            }
            else if (Teaching_s.includes( Teaching[i])){
              p = array_FE[j].Amount
              amount_s = amount_s +  (array_FE[j].Amount)/100*252 
            }
            else if (Teaching_p.includes( Teaching[i])){
              p=array_FE[j].Amount 
              
              var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
              poeng = poeng.toString().replace(',','.') 
              amount_p = amount_p + ((array_FE[j].Amount*poeng)/(100*3.75)*125)
            }

    
            else if (Teaching_t.includes( Teaching[i])){
              var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
              if  (poeng){
                amount_t += 250
              }
            }
    
    
          }
      }
     }
    
     if ((person_activity.map((x)=>x.person)).includes(lecturer_FE[k]) ){
      // console.log(lecturer_FE_name[k],person_activity.filter(x=>x.person === lecturer_FE[k]).map(x=>x.activity).length,person_activity.filter(x=>x.person === lecturer_FE[k]).map(x=>x.activity))
      for(let a = 0;a<person_activity.filter(x=>x.person === lecturer_FE[k]).map(x=>x.activity).length;a++){
        var activity_num = person_activity.filter(x=>x.person === lecturer_FE[k]).map(x=>x.activity)[a]
    
        if (position_activity.map(x=>x.emne)[activity_num-1] === 'L'){
    
          // console.log(lecturer_FE_name[k],person_activity.filter(x=>x.person === lecturer_FE[k]).map(x=>x.activity)[a])
          poeng= (position_activity.map(x=>x.arsverk)[person_activity.filter(x=>x.person === lecturer_FE[k]).map(x=>x.activity)[a]-1])
          // console.log('poeng',poeng)
          var amount = person_activity.filter(x=>x.person === lecturer_FE[k]).filter(x=>x.activity===activity_num).map(x=>x.amount)
          // console.log(amount_position)
          var amount_position = amount_position + 1750*poeng*amount/100
      }
      if (position_activity.map(x=>x.emne)[activity_num-1] === 'P'){
        console.log('prject')
        console.log(lecturer_FE_name[k],person_activity.filter(x=>x.person === lecturer_FE[k]).map(x=>x.activity)[a])
        poeng= (position_activity.map(x=>x.antall_time)[person_activity.filter(x=>x.person === lecturer_FE[k]).map(x=>x.activity)[a]-1])
        console.log('P','poeng',poeng)
        var amount = person_activity.filter(x=>x.person === lecturer_FE[k]).filter(x=>x.activity===activity_num).map(x=>x.amount)
        // console.log(amount_position)
        var amount_project = amount_project + poeng*amount
    }
      }
    
     }
    
    
    
    array_FE_new_indecol.push(amount_i) 
    array_FE_new_sustain.push(amount_s) 
    array_FE_new_process.push(amount_p) 
    array_FE_new_thermo.push(amount_t) 
    
    
    }
    
    
    array_FE_new_total.push(text.concat([array_FE_new_indecol]).concat(text2)) 
    array_FE_new_total.push(text.concat([array_FE_new_sustain]).concat(text2)) 
    array_FE_new_total.push(text.concat([array_FE_new_process]).concat(text2)) 
    array_FE_new_total.push(text.concat([array_FE_new_thermo]).concat(text2)) 
    
    
    
    
    var lineChartData_FE = {
      labels: lecturer_FE_name,
    
        datasets: []
    }
    array_FE_new_total.forEach(function (a, i) {
      lineChartData_FE.datasets.push({
              label:   lecturer_FE_name[i],
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke:
                  'rgba(220,220,220,1)',
              data: JSON.parse(a)
              
           });
          
    
      }
    );
    
    var data_set_process=[]
    for (let a=0; a<lineChartData_FE.datasets.map(x=>x.label).length;a++){
        data_set_process.push({label : groupe_person[a],data : lineChartData_FE.datasets.map(x=>x.data)[a],backgroundColor : color[a]})
      }
  
      





























































    
var data_indecol ={
      //  labels: lineChartData_PH.labels.map(x=>x.course_id + ' ' + x.name),
       labels: lecturer_O1_name,

        datasets:data_set_indecol

      }
      // }
    var options = {
      tooltips: {
        mode: 'index'
      },
      legend: {
        display: true,
     },

      // indexAxis: 'y',
      responsive: false,

      maintainAspectRatio:false,
      scales: {
        x: {title: {
          display: true,
          text: 'Person',
          color: '#000',
          font: {
            family: 'Comic Sans MS',
            size: 15,
            weight: 'bold',
            lineHeight: 1.2,
          },
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        },
            stacked: true
        },
        y: {
          title: {
            display: true,
            text: 'Hours',
            color: '#000',
            font: {
              family: 'Comic Sans MS',
              size: 15,
              weight: 'bold',
              lineHeight: 1.2,
            },
            padding: {top: 20, left: 0, right: 0, bottom: 0}
          },
            stacked: true
        }
    } 
  }

  var data_thermo ={
    //  labels: lineChartData_PH.labels.map(x=>x.course_id + ' ' + x.name),
     labels: lecturer_PH_name,

      datasets:data_set_thermo

    }
    // }
  var options = {
    tooltips: {
      mode: 'index'
    },
    legend: {
      display: true,
   },

    // indexAxis: 'y',
    responsive: false,

    maintainAspectRatio:false,
    scales: {
      x: {title: {
        display: true,
        text: 'Person',
        color: '#000',
        font: {
          family: 'Comic Sans MS',
          size: 15,
          weight: 'bold',
          lineHeight: 1.2,
        },
        padding: {top: 20, left: 0, right: 0, bottom: 0}
      },
          stacked: true
      },
      y: {
        title: {
          display: true,
          text: 'Hours',
          color: '#000',
          font: {
            family: 'Comic Sans MS',
            size: 15,
            weight: 'bold',
            lineHeight: 1.2,
          },
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        },
          stacked: true
      }
  } 
}



var data_process ={
  //  labels: lineChartData_PH.labels.map(x=>x.course_id + ' ' + x.name),
   labels: lecturer_FE_name,

    datasets:data_set_process

  }
  // }
var options = {
  tooltips: {
    mode: 'index'
  },
  legend: {
    display: true,
 },

  // indexAxis: 'y',
  responsive: false,

  maintainAspectRatio:false,
  scales: {
    x: {title: {
      display: true,
      text: 'Person',
      color: '#000',
      font: {
        family: 'Comic Sans MS',
        size: 15,
        weight: 'bold',
        lineHeight: 1.2,
      },
      padding: {top: 20, left: 0, right: 0, bottom: 0}
    },
        stacked: true
    },
    y: {
      title: {
        display: true,
        text: 'Hours',
        color: '#000',
        font: {
          family: 'Comic Sans MS',
          size: 15,
          weight: 'bold',
          lineHeight: 1.2,
        },
        padding: {top: 20, left: 0, right: 0, bottom: 0}
      },
        stacked: true
    }
} 
}


var data_sustain ={
  //  labels: lineChartData_PH.labels.map(x=>x.course_id + ' ' + x.name),
   labels: lecturer_O2_name,

    datasets:data_set_sustain

  }
  // }
var options = {
  pluggins:{
    title: {
      display: true,
      text: 'Custom Chart Title'
    }
  },
  tooltips: {
    mode: 'index'
  },
  legend: {
    display: true,
 },

  // indexAxis: 'y',
  responsive: false,

  maintainAspectRatio:false,
  scales: {
    x: {title: {
      display: true,
      text: 'Person',
      color: '#000',
      font: {
        family: 'Comic Sans MS',
        size: 15,
        weight: 'bold',
        lineHeight: 1.2,
      },
      padding: {top: 20, left: 0, right: 0, bottom: 0}
    },
        stacked: true
    },
    y: {
      max: 250,
      title: {
        display: true,
        text: 'Hours',
        color: '#000',
        font: {
          family: 'Comic Sans MS',
          size: 15,
          weight: 'bold',
          lineHeight: 1.2,
        },
        padding: {top: 20, left: 0, right: 0, bottom: 0}
      },
        stacked: true
    }
} 
}










  
    return(

      <div>

{/* <script src= 
"https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"> 
    </script> 
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script> */}

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js"></script>
    
    <center>
      
      <div id="Graphs" style={{float:'left',width :"50%" }} >
            <p><b>Indecol Teaching load</b></p>
            <Bar 
            
            data = {data_indecol}
            options={options}
            // display={flex}
            height ={600}
            width ={800}

            />
      </div>     
      <div id="Graphs" style={{float:'right',width :"50%"}} >

            <p><b>Thermo-Fluid Teaching load</b></p>

            <Bar
            
            data = {data_thermo}
            options={options}
            height ={600}
            width ={800}


            />
        </div>
        <div id="Graphs" style={{float:'left',width :"50%"}} >       
        <p><b>Process and Power Teaching load</b></p>

            <Bar 
            
            data = {data_process}
            options={options}
            height ={600}
            width ={800}

            />
          </div>
          <div id="Graphs" style={{float:'right',width :"50%"}} >
            <p><b>Sustainable Energy Systems Teaching load</b></p>

          <Bar
            
            data = {data_sustain}
            options={options}
            height ={600}
            width ={800}


            />


            </div>
    </center>


             
        </div>

)
    
}

}

export default BarChart_load
