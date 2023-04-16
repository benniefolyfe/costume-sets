import React, { PropsWithChildren, useContext } from 'react';
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HabiticaUserContext } from '../../contexts/habitica-user-context';
import styled from "styled-components"


export const MainContent: React.FC<PropsWithChildren<{}>> = ({ children }: PropsWithChildren<{}>) => {

    const navigate = useNavigate()
    const location = useLocation();
    const { userData, clearUserData } = useContext(HabiticaUserContext)

    const logout = () => {
        clearUserData()
        navigate('/home', { replace: true })
    }

    const creditsLinkRender = () => {
        const currentRoute = location.pathname

        if (currentRoute === '/credits') {
            return (
                <li>
                    <Link to="/home">Go back</Link>
                </li>
            )
        }

        return (
            <li>
                <Link to="/credits">Credits and Acknowledgments</Link>
            </li>
        )
    }

    const loginLinkRender = () => {   

        if(userData.id) {
            return (
                <li>
                    <Link to="/" onClick={() => logout()}>Logout</Link>
                </li>
                
            )
        }
    }

    return (
        <Container>
            <StyledCard>
                <StyledCard.Body>
                    {children}
                </StyledCard.Body>
                <StyledCardFooter>
                    <ul>
                        {creditsLinkRender()}
                        {loginLinkRender()}
                    </ul>
                </StyledCardFooter>
            </StyledCard>
        </Container>
    )
}

export const StyledCard = styled(Card)`
    background-color: #13121F;
    padding: 20px;
    max-width: 405px;
    height: 640px;
    overflow-y: auto;
`

export const StyledCardFooter = styled(Card.Footer)`
    text-align: center;

    ul, li {
        list-style: none;
        padding: 0;
        margin: 0;
    }
`