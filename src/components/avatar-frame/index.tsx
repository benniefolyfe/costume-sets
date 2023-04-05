import { useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { HabiticaUserContext } from "../../contexts/habitica-user-context";

export const AvatarFrame = () => {

    const { userData } = useContext(HabiticaUserContext)

    const renderPendingDamage = (pendingDamage: number) => {
        const roundedPendingDamage = Math.floor(pendingDamage * 10) / 10

        if (roundedPendingDamage > 0) {
            return (
                <div className="mt-2">
                    <small style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Pending damage:</small>
                    <p className="text-danger mb-1">{roundedPendingDamage}</p>
                    <small className="text-danger">You'll deal damage on your next cron.</small>
                </div>
            )
        }
        return (
            <div className="mt-2">
                <small style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Pending damage:</small>
                <p className="text-success mb-1">{roundedPendingDamage}</p>
                <small className="text-success">You'll heal the boss on your next cron.</small>
            </div>
        )
    }

    return (
        <Row className="mb-3">
            <Col>
                <iframe
                    title="avatar"
                    src={`https://crookedneighbor.github.io/habitica-avatar/avatar.html#${userData.id}`}
                    scrolling="no"
                    style={{ width: "140px", height: "147px", overflowY: "hidden", border: "none" }}
                ></iframe>
            </Col>
            <Col>
                <h6 style={{ marginBottom: '0' }}>{userData.profile.name}</h6>
                <small style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    <span className="text-capitalize bold">{userData.stats.class}</span> - Level {userData.stats.lvl}  
                </small>
                {renderPendingDamage(userData.party.quest.progress.up)}
            </Col>
        </Row>
    )
}