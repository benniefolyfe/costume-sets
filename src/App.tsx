import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";

import { UserAuthenticationForm } from "./components/user-authentication-form";
import { MainControllers } from "./pages/main-controllers";
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {

  const [cardContent, setCardContent] = useState<JSX.Element>(<></>);

  useEffect(() => {
    setCardContent(<UserAuthenticationForm {...{setCardContent}}/>)
  }, [])

  return (
    <Container>
      <Card style={{ backgroundColor: '#13121F', color: 'white', padding: '20px', maxWidth: '405px' }}>
        {cardContent}
      </Card>
    </Container>
  );
}

export default App;
