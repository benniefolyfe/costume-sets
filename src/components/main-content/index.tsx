import React, { PropsWithChildren } from 'react';
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import { Link } from 'react-router-dom';

export const MainContent: React.FC<PropsWithChildren<{}>> = ({ children }: PropsWithChildren<{}>) => {

    return (
        <Container>
            <Card style={{ backgroundColor: '#13121F', padding: '20px', maxWidth: '405px', maxHeight: '670px', overflowY: 'auto' }}>
                <Card.Body>
                    {children}
                </Card.Body>
                <div className="divider"></div>
                <Card.Footer className="text-center">
                    <Link to="/credits">Credits and Acknowledgments</Link>
                </Card.Footer>
            </Card>
        </Container>
    )
}