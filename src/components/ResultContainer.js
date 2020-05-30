import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function ResultContainer(props) {
  return (
        <Row>
          <Col>
            <div className="result">
              <h3>Game Over your Final score is {props.finalScore} out of 10 </h3>
            </div>
          </Col>
        </Row>

    )
}
