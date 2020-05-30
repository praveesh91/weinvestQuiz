import React, { Component } from 'react'

export default function Timer(props) {
    return (
        <div style={{color: 'white'}}>
            { props.seconds === 0
                ? <h1>Time Over!</h1>
                : <h1>{props.seconds < 10 ? `0:0${props.seconds}` : props.seconds}</h1>
            }
        </div>
    )
}
