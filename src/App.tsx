import { Container,  } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import "./style.css"
import { useEffect, useState } from "react"
import { getUserData, updateUserData, useUserBlessing } from "./services/user";

import { StatusText } from "./components/status-text";
import { statusMessages } from "./objects/status-messages";
import { ReverseBlessingButton } from "./components/reverse-blessing-button";



function App() {


  const [userName, setUserName] = useState<String>("")

  const [statusText, setStatusText] = useState<String>(statusMessages.default)

  useEffect(() => {
    async function fetchData() {
      const userData = await getUserData()
      setUserName(userData.data.profile.name)
    }
    fetchData()
  }, [])

  return (
    <Container>
      <Card style={{ backgroundColor: '#13121F', color: 'white', padding: '20px', maxWidth: '405px' }}>
        <Card.Body style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
          <Row style={{ marginBottom: '15px' }}>
            <Col style={{ textAlign: 'center' }}>
              <iframe
                title="avatar"
                src="https://crookedneighbor.github.io/habitica-avatar/avatar.html#5bde0b79-bc72-42e8-a52b-281398b98de9"
                scrolling="no"
                style={{ width: "140px", height: "147px", overflowY: "hidden", border: "none" }}
              ></iframe>
              <h4>{userName}</h4>         
            </Col>
          </Row>
          <StatusText content={ statusText } />
          <ReverseBlessingButton {...{ setStatusText }}/>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
