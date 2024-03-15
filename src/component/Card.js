import React from 'react'

function Card(props) {
  return (
    <div className='card-container'>
        <div>
            <img src={props.img}></img>
        </div>
        <div>
            <hr/>
            <h2 style={{fontWeight:"500"}}>{props.name}</h2>
            <p style={{fontWeight:"500"}}>{props.bodyPart}</p>
            <p style={{fontWeight:"500"}}>{props.target}</p>
        </div>
    </div>
  )
}

export default Card