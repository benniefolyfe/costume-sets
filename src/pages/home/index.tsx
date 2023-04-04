import { useState } from "react";
import { StatusText } from "../../components/status-text";
import { statusMessages } from "../../objects/status-messages";
import { ReverseBlessingForm } from "../../components/reverse-blessing-form";
import { AvatarFrame } from "../../components/avatar-frame";
import { Tab, Tabs } from "react-bootstrap";
import { BossHealingForm } from "../../components/boss-healing-form";


export const Home = () => {

    const [statusText, setStatusText] = useState<String>(statusMessages.default)
    const [buttonIsDisabled, setDisabledButton] = useState<boolean>(false)

    return (
        <>
            <AvatarFrame />
            <StatusText content={statusText} />
            <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="mb-3"
                fill
            >
                <Tab eventKey="home" title="Reverse Blessing">                          
                    <ReverseBlessingForm {...{ setStatusText }} />
                </Tab>
                <Tab eventKey="profile" title="Boss Healing">
                    <BossHealingForm {...{ setStatusText, buttonIsDisabled, setDisabledButton }} />
                </Tab>
            </Tabs>
        </>                 
    );
}