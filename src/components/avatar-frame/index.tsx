import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { getUserData } from '../../services/user';


export const AvatarFrame = () => {

    const [userName, setUserName] = useState<String>("")

    useEffect(() => {
        async function fetchData() {
            const userData = await getUserData()
            setUserName(userData.data.profile.name)
        }
        fetchData()
    }, [])

    return (
        <Row style={{ marginBottom: '15px' }}>
            <Col className="text-center">
                <iframe
                    title="avatar"
                    src="https://crookedneighbor.github.io/habitica-avatar/avatar.html#5bde0b79-bc72-42e8-a52b-281398b98de9"
                    scrolling="no"
                    style={{ width: "140px", height: "147px", overflowY: "hidden", border: "none" }}
                ></iframe>
                <h4>{userName}</h4>
            </Col>
        </Row>
    )
}