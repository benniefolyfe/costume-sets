import React from 'react'
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

interface IProps {
    content: String
}

export const StatusText: React.FC<IProps> = ({ content }) => {
  return (
      <Row className="mt-2" style={{ height: '48px' }}>
          <Col style={{ textAlign: 'center' }}>
              <p>{content}</p>
          </Col>
      </Row>
  )
}