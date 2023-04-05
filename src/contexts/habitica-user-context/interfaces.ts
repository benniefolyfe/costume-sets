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

interface UserContextType {
    userData: UserData;
    updateUser: (payload: any) => Promise<void>;
    authenticateUserData: (apiUserDetails: HabiticaUserAPI) => Promise<string>;
    CastBlessingSkill: (payload: any) => Promise<void>;
    calculateTotalAttributes: (userData: UserData) => Promise<Attributes>;
    createTask: (payload: any) => Promise<string>;
    scoreTask: (payload: any) => Promise<void>;
    deleteTask: (payload: any) => Promise<void>;
}

export type {
    Stats,
    UserData,
    UserContextType,
    EquippedObject,
    Attributes
}