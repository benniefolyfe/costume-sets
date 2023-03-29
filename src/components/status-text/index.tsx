import React from 'react'
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

interface IProps {
    content: String
}

export const StatusText: React.FC<IProps> = ({ content }) => {
  return (
      <Row>
          <Col style={{ textAlign: 'center' }}>
              <p>{content}</p>
          </Col>
      </Row>
  )
}