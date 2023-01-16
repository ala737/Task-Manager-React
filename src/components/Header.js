import React from 'react'
import Button from './Button'
const Header = ({title,onAdd,TextButton}) => {
    const onClick =()=>{
        console.log("hello world")
    }
  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color={TextButton ? 'red' : 'green'} text={TextButton ? 'Close' : 'Add'} onClick={onAdd}/>
        

    </header>
  ) 
}

const HeadingStyle={
  color: 'blue', backgroundColor: 'black'
}


export default Header