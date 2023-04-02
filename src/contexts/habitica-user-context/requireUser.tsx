import React, { useContext, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { HabiticaUserContext } from '.';

export const RequireUser: React.FC<PropsWithChildren<{}>> = ({ children }: PropsWithChildren<{}>) => {

    const { userData } = useContext(HabiticaUserContext)

    if (!userData.id) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>;
}