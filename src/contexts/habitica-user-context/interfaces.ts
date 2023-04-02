import { HabiticaUserAPI } from "../../api/interfaces";

interface Buffs {
    con: number;
    int: number;
}

interface Stats {
    lvl: number;
    buffs: Buffs;
    class: string;
    con: number;
    int: number;
    mp: number;
}

interface UserData {
    profile: { name: string };
    items: { gear: { equipped: EquippedObject } };
    stats: Stats;
    id: string;
}

interface EquippedObject {
  [key: string]: string;
}

interface GameData {
    data: { gear: EquippedObject }
}

interface UserContextType {
    userData: UserData,
    updateUser: (payload: any) => Promise<void>,
    syncUserData: (apiUserDetails: HabiticaUserAPI) => Promise<void>,
    CastBlessingSkill: (payload: any) => Promise<void>,
    fetchGameContent: () => Promise<GameData>
}

export type { Buffs, Stats, UserData, GameData, UserContextType, EquippedObject }