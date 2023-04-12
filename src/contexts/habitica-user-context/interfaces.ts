import { HabiticaUserAPI } from "../../api/interfaces";

interface Attributes {
    str: number;
    con: number;
    int: number;
    per: number;
}
interface Stats {
    lvl: number;
    buffs: Attributes;
    class: string;
    str: number;
    con: number;
    int: number;
    per: number;
    mp: number;
    exp: number;
    gp: number;
}

interface UserData {
    profile: { name: string };
    items: { gear: { equipped: EquippedObject } };
    stats: Stats;
    id: string;
    party: { quest: { progress: { up: number } } }
}

interface EquippedObject {
    [key: string]: string;
}

interface TaskData {
    _tmp: { quest: { progressDelta: number }}
}

interface UserContextType {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData | undefined>>
    updateUser: (payload: any) => Promise<UserData>;
    authenticateUserData: (apiUserDetails: HabiticaUserAPI) => Promise<string>;
    CastBlessingSkill: (payload: any) => Promise<void>;
    calculateTotalAttributes: (userData: UserData) => Promise<Attributes>;
    createTask: (payload: any) => Promise<string>;
    scoreTask: (payload: any, direction: string) => Promise<TaskData>;
    deleteTask: (payload: any) => Promise<void>;
}

export type {
    Stats,
    UserData,
    UserContextType,
    EquippedObject,
    Attributes,
    TaskData,
}