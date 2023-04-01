import React from 'react'

const Form = () => {
  return (
    <div className='form'>
         <input type= "number" placeholder = "enter a transaction amount"/>
        <input type= "text" placeholder = "enter a transaction details"/>
        <input type= "date"/>
        <button type= "submit">Submit</button>
        
    </div>
  )
}
export default Form
