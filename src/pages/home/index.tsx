import { useContext, useState } from "react";
import { StatusText } from "../../components/status-text";
import { statusMessages } from "../../objects/status-messages";
import { ReverseBlessingForm } from "../../components/reverse-blessing-form";
import { AvatarFrame } from "../../components/avatar-frame";
import { Tab, Tabs } from "react-bootstrap";
import { BossHealingForm } from "../../components/boss-healing-form";
import { HabiticaUserContext } from "../../contexts/habitica-user-context";


export const Home = () => {

    const { userData } = useContext(HabiticaUserContext)

    const [statusText, setStatusText] = useState<String>(statusMessages.default)
    const [buttonIsDisabled, setDisabledButton] = useState<boolean>(false)

    return (
        <>
            <AvatarFrame />
            <div className="divider"></div>
            <StatusText content={statusText} />
            <div className="divider mb-3"></div>
            <Tabs
                defaultActiveKey="healing"
                id="fill-tab-example"
                className="mb-3"
                fill
            >
                <Tab eventKey="healing" title="Boss Healing">
                    <BossHealingForm {...{ setStatusText, buttonIsDisabled, setDisabledButton }} />
                </Tab>
                <Tab eventKey="damage" title="Reverse Blessing" disabled={userData.stats.class !== 'healer'}>                          
                    <ReverseBlessingForm {...{ setStatusText, buttonIsDisabled, setDisabledButton }} />
                </Tab>
            </Tabs>
        </>                 
    );
}