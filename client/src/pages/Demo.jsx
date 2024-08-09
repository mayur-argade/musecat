import React from 'react'
import parse from 'react-html-parser'
const Demo = () => {


  return (
    <div className='ml-4 '>
    {parse('<li>hi</li>')}
  </div>

//     <div className='ml-3'>
//     {ReactHtmlParser(
// 
// )}
//     </div>


  )
}

export default Demo