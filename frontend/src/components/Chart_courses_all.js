import React from "react"
import {Chart as ChartJS, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import AxiosInstance from "./Axios"
import { useState,useEffect } from 'react';
import { json } from "react-router-dom";




function remove_duplicates_safe(arr) {
  var seen = {};
  var ret_arr = [];
  for (var i = 0; i < arr.length; i++) {
      if (!(arr[i] in seen)) {
          ret_arr.push(arr[i]);
          seen[arr[i]] = true;
      }
  }
  return ret_arr;

}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  )
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



const BarChart_all =() => {
  const[course, setCourse]=useState()
  const[person, setPerson]=useState()
  const[person_course, setPersonCourse]=useState()
  const[loading,setLoading] = useState(true)
  const[type,setType]=useState("All")


  useEffect(() => { 

    AxiosInstance
    .get(`course/`)
      .then((res) => {

      // console.log(res.data)
      setCourse(res.data) 
        
     setLoading(false)

    });

    AxiosInstance
    .get(`person/`)
      .then((res) => {

      // console.log(res.data)
      setPerson(res.data) 

     setLoading(false)

    });

    AxiosInstance
    .get(`person_course/`)
      .then((res) => {

      // console.log(res.data)
      setPersonCourse(res.data) 

     setLoading(false)

    });

 
  },[])



    var color=[]
          color.push("#9ad0f5","#3d85c6","#ffb0c1","#e06666","#f7be85","#ffe6aa","#a4dfdf","#ccb2ff","#6a7e69","#825acf","#f1c232")


if (Array.isArray(course)&&Array.isArray(person)&&Array.isArray(person_course)){
console.log('course',course)
console.log('person',person)
console.log('person_course',person_course)


var course_indecol = course.filter(x => x.type != 'MS').filter(x => x.type != 'FP')
var course_indecol_id = course_indecol.map(x => x.id)
console.log('course  all',course_indecol)


var array =[]
var lecturer = person_course.map(x => x.person)

let unique_lecturer = lecturer.filter(function(value, index, array) {
  return array.indexOf(value) === index;
});

var unique_lecturer_name = []
for (let a = 0;a<unique_lecturer.length;a++){
    unique_lecturer_name.push(person.filter(x=>x.id === unique_lecturer[a]).map(x=> x.first_name + ' '+ x.last_name))
}
 
const unique_lecturer_group = []
for (let a = 0;a<unique_lecturer.length;a++){
    unique_lecturer_group.push(person.filter(x=>x.id === unique_lecturer[a]).map(x=> x.groupe))
}

const unique_lecturer_group2=remove_duplicates_safe(unique_lecturer_group)
console.log(2,unique_lecturer_group2)


let text = "["
let text2 = "]"
var array_new=[]
var array_new_total =[]
var p=0

for (let a=0; a<person_course.length;a++){
  if (course_indecol_id.includes(person_course[a].course)){
    array.push({Teaching : person_course[a].course,Lecturer : person_course[a].person,Amount : person_course[a].amount})
  
  }
}
 console.log('array',array.map(x=>x.Teaching))
console.log('unique lecturer',unique_lecturer.length)
console.log('course ind',course_indecol_id.length,course_indecol_id[7])
for (let k =0;k<unique_lecturer.length;k++){
 for (let i=0;i<course_indecol_id.length;i++){
  for (let j=0;j<array.map(x=>x.Teaching).length;j++){
      // console.log('test', k,i,j)
      // console.log(unique_lecturer[k],array[j].Lecturer)

      if (((unique_lecturer[k] != array[j].Lecturer) && (course_indecol_id[i] != array[j].Teaching)) || ((unique_lecturer[k] == array[j].Lecturer) && (course_indecol_id[i] != array[j].Teaching)) || ((unique_lecturer[k] != array[j].Lecturer) && (course_indecol_id[i] == array[j].Teaching))) {
        p=0
      }
      if ((unique_lecturer[k] == array[j].Lecturer) && (course_indecol_id[i] == array[j].Teaching)){
        p=array[j].Amount
        j=array.length
      }
    }
    array_new.push(p)
  }
  array_new_total.push(text.concat([array_new]).concat(text2))
  array_new=[]
}

console.log('array_new_total',array_new_total)

var lineChartData_indecol = {
  labels: course.filter(x => x.type != 'MS').filter(x => x.type != 'FP'),

    datasets: []
}


array_new_total.forEach(function (a, i) {
  console.log(a,i)
  if (JSON.parse(a).every(item => item === 0))
      {//console.log(a,i)
        // console.log('console')
        //data.splice(i, 1);labels.splice(i, 1);i--;
      }
      else{
        lineChartData_indecol.datasets.push({
          label:   unique_lecturer_name[i],
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke:
              'rgba(220,220,220,1)',
          data: JSON.parse(a)
          
       })
      };

  }
);




var data_set=[] 

for (let a=0; a<lineChartData_indecol.datasets.map(x=>x.label).length;a++){
    if (unique_lecturer_group[a][0]==unique_lecturer_group2[0][0]){
      var couleur = color[0]
      console.log('oui',unique_lecturer_group[a][0],unique_lecturer_group2[0][0])
    }
    if  (unique_lecturer_group[a][0]==unique_lecturer_group2[1][0]){
      var couleur = color[4]
    }
    if  (unique_lecturer_group[a][0]==unique_lecturer_group2[2][0]){
      var couleur = color[8]
    }
    if  (unique_lecturer_group[a][0]==unique_lecturer_group2[3][0]){
      var couleur = color[3]
    }
    data_set.push({label : lineChartData_indecol.datasets.map(x=>x.label)[a],data : lineChartData_indecol.datasets.map(x=>x.data)[a],backgroundColor : couleur})
  console.log('test',a,unique_lecturer_name[a][0],unique_lecturer_group[a][0],unique_lecturer_group2[0][0])
// ,console.log('group',unique_lecturer_group[0].toString())

  }

console.log('data_Set',data_set)

var data ={
       labels: lineChartData_indecol.labels.map(x=>x.course_id + ' ' + x.name),
        datasets:data_set

      }
      // console.log('data',data.datasets[0].label)


if (type !== 'All'){

  var course_indecol = course.filter(x => x.type === type).filter(x => x.type != 'MS').filter(x => x.type != 'FP')
  var course_indecol_id = course_indecol.map(x => x.id)
  console.log('course  o1',course_indecol)
  
  var array =[]
  var lecturer = person_course.map(x => x.person)
  console.log(lecturer)
  let unique_lecturer = lecturer.filter(function(value, index, array) {
    return array.indexOf(value) === index;
  }); 
  var unique_lecturer_name = []
  for (let a = 0;a<unique_lecturer.length;a++){
      unique_lecturer_name.push(person.filter(x=>x.id === unique_lecturer[a]).map(x=> x.first_name + ' '+ x.last_name))
  }

  let text = "["
  let text2 = "]"
  var array_new=[]
  var array_new_total =[]
  var p=0
  
  for (let a=0; a<person_course.length;a++){
    if (course_indecol_id.includes(person_course[a].course)){
      array.push({Teaching : person_course[a].course,Lecturer : person_course[a].person,Amount : person_course[a].amount})
    
    }
  }
   console.log('array',array.map(x=>x.Teaching))
  console.log('unique lecturer',unique_lecturer.length)

  console.log('course ind',course_indecol_id.length,course_indecol_id[7])
  for (let k =0;k<unique_lecturer.length;k++){
   for (let i=0;i<course_indecol_id.length;i++){
    for (let j=0;j<array.map(x=>x.Teaching).length;j++){
        // console.log('test', k,i,j)
        // console.log(unique_lecturer[k],array[j].Lecturer)
  
        if (((unique_lecturer[k] != array[j].Lecturer) && (course_indecol_id[i] != array[j].Teaching)) || ((unique_lecturer[k] == array[j].Lecturer) && (course_indecol_id[i] != array[j].Teaching)) || ((unique_lecturer[k] != array[j].Lecturer) && (course_indecol_id[i] == array[j].Teaching))) {
          p=0
        }
        if ((unique_lecturer[k] == array[j].Lecturer) && (course_indecol_id[i] == array[j].Teaching)){
          p=array[j].Amount
          j=array.length
        }
      }
      array_new.push(p)
    }
    array_new_total.push(text.concat([array_new]).concat(text2))
    array_new=[]
  }
  
  console.log('array_new_total',array_new_total)
  
  var lineChartData_indecol = {
    labels: course.filter(x => x.type === type).filter(x => x.type != 'MS').filter(x => x.type != 'FP'),
  
      datasets: []
  }
  
  
  array_new_total.forEach(function (a, i) {
    console.log(a,i)
    if (JSON.parse(a).every(item => item === 0))
        {//console.log(a,i)
          // console.log('console')
          //data.splice(i, 1);labels.splice(i, 1);i--;
        }
        else{
          lineChartData_indecol.datasets.push({
            label:   unique_lecturer_name[i],
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke:
                'rgba(220,220,220,1)',
            data: JSON.parse(a)
            
         })
        };
  
    }
  );
  
  
  
  
  var data_set=[]
  
  for (let a=0; a<lineChartData_indecol.datasets.map(x=>x.label).length;a++){
    if (unique_lecturer_group[a][0]==unique_lecturer_group2[0][0]){
      var couleur = color[0]
      console.log('oui',unique_lecturer_group[a][0],unique_lecturer_group2[0][0])
    }
    if  (unique_lecturer_group[a][0]==unique_lecturer_group2[1][0]){
      var couleur = color[4]
    }
    if  (unique_lecturer_group[a][0]==unique_lecturer_group2[2][0]){
      var couleur = color[8]
    }
    if  (unique_lecturer_group[a][0]==unique_lecturer_group2[3][0]){
      var couleur = color[3]
    }
    data_set.push({label : lineChartData_indecol.datasets.map(x=>x.label)[a],data : lineChartData_indecol.datasets.map(x=>x.data)[a],backgroundColor : couleur})
  console.log('test',a,unique_lecturer_name[a][0],unique_lecturer_group[a][0],unique_lecturer_group2[0][0])
// ,console.log('group',unique_lecturer_group[0].toString())

  }
  
  console.log('data_Set',data_set)
  
  var data ={
         labels: lineChartData_indecol.labels.map(x=>x.course_id + ' ' + x.name),
          datasets:data_set
  
        }
        // console.log('data',data.datasets[0].label)
      }

else if (type == 'All'){
var data ={
       labels: lineChartData_indecol.labels.map(x=>x.course_id + ' ' + x.name),
        datasets:data_set

      }
      }
    var options = {
      tooltips: {
        mode: 'index'
      },
      legend: {
        display: true,
     },

      indexAxis: 'y',
      responsive: false,

      maintainAspectRatio:false,
      scales: {
        x: {title: {
          display: true,
          text: 'Covered %',
          color: '#000',
          font: {
            family: 'Comic Sans MS',
            size: 20,
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
            text: 'Course ID',
            color: '#000',
            font: {
              family: 'Comic Sans MS',
              size: 20,
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
    <div className="selectBox"><a >Choose a course type</a>
  <select id="typeselect" onChange={(e)=>setType(e.target.value)} >
    <option value = "All" >All</option>

    <option value = "O1">O1</option>
    <option value = "O2">O2</option>
    <option value = "FE">FE</option>
    {/* <option value = "FP">FP</option>
    <option value = "MS">MS</option> */}
    <option value = "PH">PH</option>

  </select>
</div>

<br></br>
<br></br>
{/* <script src= 
"https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"> 
    </script> 
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script> */}

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js"></script>
    <center>
            <Bar
            
            data = {data}
            options={options}
            height ={900}
            width ={1500}

            />
    </center>
             
        </div>

)
    
}

}
export default BarChart_all