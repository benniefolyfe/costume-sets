import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import { Form } from "react-bootstrap"
import { useContext, useState } from "react";
import { HabiticaUserContext } from "../../contexts/habitica-user-context";
import { HabiticaUserAPI } from '../../api/interfaces';
import { useNavigate } from "react-router-dom";

export const UserAuthenticationForm = () => {

  const { authenticateUserData } = useContext(HabiticaUserContext)
  const navigate = useNavigate()

  const [habiticaUserAPI, setHabiticaUserAPI] = useState<HabiticaUserAPI>({
    userId: '',
    apiToken: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHabiticaUserAPI({
      ...habiticaUserAPI,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await authenticateUserData(habiticaUserAPI)

    if (response === "Success") {
      navigate('/home', { replace: true });
      return
    }
    return alert(response)
  }

  return (
    <Row>
      <Col className="text-center">
        <h3>Boss Healing & Reverse Blessing</h3>
        <p className="text-secondary">This tool allows you heal boss health and reverse effects of your Blessing skill to deal damage to your party members.</p>
        
        <div className="divider mb-4 mt-4"></div>

        <h5 className="mb-4">Enter your Habitica API details</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
            <Form.Label className="text-start">User ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your user ID"
              onChange={handleChange}
              name="userId"
            />
          </Form.Group>

          <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
            <Form.Label>API Token</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your API token"
              onChange={handleChange}
              name="apiToken"
            />
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit">
            Authenticate
          </Button>
        </Form>
      </Col>
    </Row>
  )
}