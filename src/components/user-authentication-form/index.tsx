import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";

import { Form } from "react-bootstrap"
import { MainControllers } from "../../pages/main-controllers";
import { updateGroupData } from "../../services/user";

export const UserAuthenticationForm = () => {
  
  const update = async () => {
    await updateGroupData("c2772c2d-bbc3-46d8-a632-438eb8368afd")
  }

  const groupId = 'c2772c2d-bbc3-46d8-a632-438eb8368afd'; // Substitua pelo ID do grupo que deseja atualizar
  const apiEndpoint = `https://habitica.com/api/v3/cron`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-user': '5bde0b79-bc72-42e8-a52b-281398b98de9',
      'x-api-key': 'd650f75c-efd3-4256-a607-8d19d77dfd4c'
    },
    body: JSON.stringify({
    })
  };

  fetch(apiEndpoint, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });


  return (
    <Row>
      <Col className="text-center">
        <h3>Boss Healer & Reverse Blessing</h3>
        <p className="text-secondary mb-5">This tool allows you heal, increase boss life and deal damage to your party members.</p>
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
          <Button className="w-100" variant="primary" type="submit" onClick={() => fetch(apiEndpoint, requestOptions)}>
            Authenticate
          </Button>
        </Form>
      </Col>
    </Row>
  )
}