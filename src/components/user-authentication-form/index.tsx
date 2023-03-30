import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";

import { Form } from "react-bootstrap"
import { MainControllers } from "../../pages/main-controllers";

interface IProps {
  setCardContent: React.Dispatch<React.SetStateAction<JSX.Element>>
}

export const UserAuthenticationForm: React.FC<IProps> = ({ setCardContent }) : JSX.Element => {
  return (
    <Row>
      <Col className="text-center">
        <h3>Boss Healer & Reverse Blessing</h3>
        <p className="text-secondary mb-5">This tools allows you heal, increase boss life and deal damage to your party members.</p>
        <h5 className="mb-4">Enter your Habitica API details</h5>
        <Form>
          <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
            <Form.Label className="text-start">User ID</Form.Label>
            <Form.Control type="email" placeholder="Enter your user ID" />
          </Form.Group>

          <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
            <Form.Label>API Token</Form.Label>
            <Form.Control type="password" placeholder="Enter your API token" />
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit" onClick={() => setCardContent(<MainControllers />)}>
            Authenticate
          </Button>
        </Form>
      </Col>
    </Row>
  )
}