import React from 'react'
import {Row, Col} from 'react-bootstrap'

export default function OptionContainer(props) {
    return (

        <Row className="mt-5">
            {props.optionNames.map((option, key) => (
            <Col 
                xs={6}
                key={key}
                onClick={() => props.clickedOption(option)}
            >
                <div className={`options ${props.seletedOption === option ? "selected" : null}`}>
                    {option}
                </div>
            </Col>
            ))}
        </Row>

    )
}
