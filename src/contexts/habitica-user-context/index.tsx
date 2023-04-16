import React, { createContext, useState, PropsWithChildren, SetStateAction } from 'react';
import { HabiticaUserAPI } from '../../api/interfaces';
import { getGameData } from '../../services/content';
import { getUserData, updateUserData, useUserBlessing } from '../../services/user';
import { UserData, UserContextType, EquippedObject, Attributes, TaskData } from './interfaces';
import { findKey } from '../../utils';
import { createTaskForUser, scoreTaskForUser, deleteTaskForUser } from '../../services/task';

const userModelObject = (): UserData => ({
    profile: { name: "" },
    items: { gear: { equipped: {} } },
    stats: {
        lvl: 1,
        buffs: { str: 0, con: 0, int: 0, per: 0 },
        class: "",
        str: 0,
        con: 0,
        int: 0,
        per: 0,
        mp: 0,
        exp: 0,
        gp: 0,
    },
    id: "",
    party: { quest: { progress: { up: 0 } } }
});

const attributesModelObject = (): Attributes => ({
    str: 0,
    con: 0,
    int: 0,
    per: 0,
})

const taskDataModelObject = (): TaskData => ({
    _tmp: { quest: { progressDelta: 0 } }
})

export const HabiticaUserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [habiticaUserAPI, setHabiticaUserAPI] = useState<HabiticaUserAPI>({
        userId: '',
        apiToken: ''
    });
    const [userData, setUserData] = useState<UserData>();
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false)

    const authenticateUserData = async (apiUserDetails: HabiticaUserAPI): Promise<string> => {
        setIsAuthenticating(true)
        
        try {
            const userData = await getUserData(apiUserDetails)
            setHabiticaUserAPI(apiUserDetails)
            setUserData(userData.data)
            setIsAuthenticating(false)
            return "Success"
        } catch {
            return "User ID or API Token is invalid!"
        }
    };

    const clearUserData = () => {    
        setUserData(userModelObject)

        localStorage.setItem('canSave', 'false')
        localStorage.setItem('userId', '')
        localStorage.setItem('apiToken', '')
    }

    const updateUser = async (payload: any):Promise<UserData> => {
        const userData = await updateUserData(habiticaUserAPI, payload)
        return userData.data
    };

    const CastBlessingSkill = async (payload: any) => {
        await useUserBlessing(habiticaUserAPI, payload)
    };

    const calculateTotalEquipped = (
        equippedObject: EquippedObject,
        gearList: { [key: string]: string },
        userClass: string
    ): Attributes => {
        let totalAttributes = {
            str: 0,
            con: 0,
            int: 0,
            per: 0,
        }

        for (const key in equippedObject) {
            const equipment = findKey(gearList, equippedObject[key])
            const equipmentAttributes = {
                str: equipment.str,
                con: equipment.con,
                int: equipment.int,
                per: equipment.per
            }
            const classAttributesBonus = {
                str: equipment.klass === userClass ? equipmentAttributes.str / 2 : 0,
                con: equipment.klass === userClass ? equipmentAttributes.con / 2 : 0,
                int: equipment.klass === userClass ? equipmentAttributes.int / 2 : 0,
                per: equipment.klass === userClass ? equipmentAttributes.per / 2 : 0
            }

            totalAttributes = {
                str: totalAttributes.str + (equipmentAttributes.str + classAttributesBonus.str),
                con: totalAttributes.con + (equipmentAttributes.con + classAttributesBonus.con),
                int: totalAttributes.int + (equipmentAttributes.int + classAttributesBonus.int),
                per: totalAttributes.per + (equipmentAttributes.per + classAttributesBonus.per)
            }
        }

        return totalAttributes
    }

    const levelStatsHandler = (level: number): number => {
        const actualLevelStat = level / 2

        if (actualLevelStat <= 50) return actualLevelStat
        return 50
    }

    const calculateTotalAttributes = async (userData: UserData) => {
        const gameData = await getGameData(habiticaUserAPI)

        const totalLevel = levelStatsHandler(userData.stats.lvl)

        const totalDistributed = {
            str: userData?.stats.str || 0,
            con: userData?.stats.con || 0,
            int: userData?.stats.int || 0,
            per: userData?.stats.per || 0
        }
        const totalEquipped = calculateTotalEquipped(
            userData.items.gear.equipped,
            gameData.data.gear,
            userData.stats.class
        );

        return {
            str: Math.floor(totalLevel + totalDistributed.str + totalEquipped.str),
            con: Math.floor(totalLevel + totalDistributed.con + totalEquipped.con),
            int: Math.floor(totalLevel + totalDistributed.int + totalEquipped.int),
            per: Math.floor(totalLevel + totalDistributed.per + totalEquipped.per)
        }
    }

    const createTask = async (payload: any): Promise<string> => {
        const taskData = await createTaskForUser(habiticaUserAPI, payload)
        return taskData.data.id
    }

    const scoreTask = async (taskId: string, direction: string) => {
        const taskData = await scoreTaskForUser(habiticaUserAPI, taskId, direction)
        return taskData.data
    }

    const deleteTask = async (taskId: string) => {
        await deleteTaskForUser(habiticaUserAPI, taskId)
    }

    return (
        <HabiticaUserContext.Provider
            value={{
                userData: userData || userModelObject(),
                setUserData: setUserData,
                updateUser,
                authenticateUserData,
                CastBlessingSkill,
                calculateTotalAttributes,
                createTask,
                scoreTask,
                deleteTask,
                clearUserData,
                isAuthenticating
            }}
        >
            {children}
        </HabiticaUserContext.Provider>
    );
};

export const HabiticaUserContext = createContext<UserContextType>({
    userData: userModelObject(),
    setUserData: (value: SetStateAction<UserData | undefined>) => { },
    updateUser: async () => { return await userModelObject() },
    authenticateUserData: async () => { return await "" },
    CastBlessingSkill: async () => {},
    calculateTotalAttributes: async () => {
        return await attributesModelObject()
    },
    createTask: async () => { return await "" },
    scoreTask: async () => { return await taskDataModelObject() },
    deleteTask: async () => {},
    clearUserData: () => {},
    isAuthenticating: false
})
