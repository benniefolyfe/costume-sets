import { useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { getUserData } from '../../services/user';
import { HabiticaUserContext } from "../../contexts/habitica-user-context";


export const AvatarFrame = () => {

    const { userData } = useContext(HabiticaUserContext)

    return (
        <Row style={{ marginBottom: '15px' }}>
            <Col className="text-center">
                <iframe
                    title="avatar"
                    src={`https://crookedneighbor.github.io/habitica-avatar/avatar.html#${userData.id}`}
                    scrolling="no"
                    style={{ width: "140px", height: "147px", overflowY: "hidden", border: "none" }}
                ></iframe>
                <h4>{userData.profile.name}</h4>
            </Col>
        </Row>
    )
}