import React, {useEffect, useState} from 'react'
import {Pie} from 'react-chartjs-2'
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js'
import Cookies from 'js-cookie'

import './PieChartStyles.css'
Chart.register(ArcElement, Tooltip, Legend);



export default function PieChart({fetchTransactions, transactions}){
    const InitialValue = [
        { category: '', 
        category_sum: 1,
         } 
      ]
    const [dataSum, setDataSum] = useState(InitialValue)
   
    useEffect(()=>{ //when transactions changes, fetch new sum for chart
        fetchSum()
       
      },[transactions])
    
      //for summing category amounts 
      async function fetchSum(){
        const token = Cookies.get('token')
        const res = await fetch('https://expense-tracker-backend-30hw.onrender.com/transaction/category-sum',{
           headers:{
            Authorization: `Bearer ${token}`,
           }
    
        })//fetches data
        if (res.ok){
        
            const {data} = await res.json();
            setDataSum(data)
           
        }
        
      }
      
   
    const data = {
  
        labels: dataSum.map((data)=>data.category),
        datasets: [
        {
            
            label: 'Expenses by Category',
            data: dataSum.map((data)=>data.category_sum),
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
        ],
  };

  return (
    <>
     
    <h2>Expenses Breakdown</h2>
    <div className='pie-chart-container'>
     
         <Pie data = {data}/>
       
         
    </div>
    

    <div className='pie-chart'>
        {/* for category breakdown */}
     <h2>Totals per category: </h2>
    {dataSum.map(category => (
        <h4>
          {category.category}: ${category.category_sum}
        </h4>
      ))}
     </div>
    
    </>
  )
}

