interface Buffs {
  con: number,
  int: number
}

interface Stats {
  lvl: number;
  buffs: Buffs,
  class: string,
  con: number,
  int: number,
  mp: number
}

interface Equipment {
  con: number,
  int: number,
  klass: string,
}

interface EquippedObject {
  [key: string]: string;
}

interface UserData {
  items: { gear: { equipped: { }}},
  stats: Stats
}

interface Attributes {
  con: number,
  int: number
}

interface IProps {
    setStatusText: React.Dispatch<React.SetStateAction<String>>
}

export type { Stats, Equipment, EquippedObject, UserData, Attributes, IProps }