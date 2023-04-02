import React, { PropsWithChildren } from 'react';
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";

export const MainContent: React.FC<PropsWithChildren<{}>> = ({ children }: PropsWithChildren<{}>) => {

    return (
        <Container>
            <Card style={{ backgroundColor: '#13121F', color: 'white', padding: '20px', maxWidth: '405px' }}>
                {children}
            </Card>
        </Container>
    )
}