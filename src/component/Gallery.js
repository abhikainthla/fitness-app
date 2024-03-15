import React from 'react'

function Gallery(props) {
  return (
    <div className='img-container'>
        <img className='img' src={props.src}>
        </img>
    </div>
  )
}

export default Gallery