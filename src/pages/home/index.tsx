import { useState } from "react";
import { StatusText } from "../../components/status-text";
import { statusMessages } from "../../objects/status-messages";
import { ReverseBlessingButton } from "../../components/reverse-blessing-button";
import { AvatarFrame } from "../../components/avatar-frame";

export const Home = () => {

    const [statusText, setStatusText] = useState<String>(statusMessages.default)

    return (
        <>
            <AvatarFrame />
            <StatusText content={statusText} />
            <ReverseBlessingButton {...{ setStatusText }} />
        </>                 
    );
}