interface Equipment {
  con: number,
  int: number,
  klass: string,
}

interface Attributes {
  con: number,
  int: number
}

interface IProps {
    setStatusText: React.Dispatch<React.SetStateAction<String>>
}

export type { Equipment, Attributes, IProps }