import React from 'react'
import { Row, Col } from 'react-bootstrap';

export default function QuizIndex(props) {
    return (
        <Row className="justify-content-md-center">
            <Col md={12}>
                <p style={{padding:'10px 0px 10px 0px', color:'#eee'}}>{`Round ${props.currQuestion + 1}  / ${props.totQuestions} `}</p>            
            </Col>
        </Row>

    )
}
