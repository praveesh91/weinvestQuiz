import React from 'react'
import { Row, Col } from 'react-bootstrap';

export default function QuestionContainer(props) {
    return (
        <Row className="justify-content-md-center">
            <Col>
              <div className="ques_container">
                <h2>{props.questions} </h2>
              </div>
            </Col>
          </Row>
    )
}
