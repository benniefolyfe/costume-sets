import { useContext, useState } from "react"
import Button from "react-bootstrap/esm/Button";
import { findKey } from "../../utils";
import { Attributes, Equipment, IProps } from "./interfaces";
import { statusMessages } from "../../objects/status-messages";
import { HabiticaUserContext } from "../../contexts/habitica-user-context";
import { UserData } from "../../contexts/habitica-user-context/interfaces";
import { EquippedObject } from "../../contexts/habitica-user-context/interfaces";
import Form from "react-bootstrap/esm/Form";

export const ReverseBlessingForm: React.FC<IProps> = ({ setStatusText }) => {

    const [damageAmount, setDamageAmount] = useState<number>(0)
    const [buttonIsDisabled, setDisabledButton] = useState<boolean>(false)
    const {
        userData,
        updateUser,
        CastBlessingSkill,
        fetchGameContent
    } = useContext(HabiticaUserContext)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDamageAmount(Number(e.target.value))
    }

    const calculateTotalEquipped = (
        equippedObject: EquippedObject,
        gearList: { [key: string]: string },
        userClass: string
    ): Attributes => {
        let totalAttributes = {
            con: 0,
            int: 0
        }

        for (const key in equippedObject) {
            const equipment = findKey(gearList, equippedObject[key])
            const equipmentAttributes = {
                con: equipment.con,
                int: equipment.int
            }
            const classAttributesBonus = {
                con: equipment.klass === userClass ? equipmentAttributes.con / 2 : 0,
                int: equipment.klass === userClass ? equipmentAttributes.int / 2 : 0
            }

            totalAttributes = {
                con: totalAttributes.con + (equipmentAttributes.con + classAttributesBonus.con),
                int: totalAttributes.int + (equipmentAttributes.int + classAttributesBonus.int)
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
        const gameData = await fetchGameContent()

        const totalLevel = levelStatsHandler(userData.stats.lvl)

        const totalDistributed = {
            con: userData?.stats.con || 0,
            int: userData?.stats.int || 0
        }
        const totalEquipped = calculateTotalEquipped(
            userData.items.gear.equipped,
            gameData.data.gear,
            userData.stats.class
        );

        return {
            con: Math.floor(totalLevel + totalDistributed.con + totalEquipped.con),
            int: Math.floor(totalLevel + totalDistributed.int + totalEquipped.int),
        }
    }

    const calculateConRequired = (damage: number): number => {
        return (damage / 0.04 - 5) + 10
    }

    const DealPartyDamage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setDisabledButton(true)
        setStatusText(statusMessages.inProgress)

        const userAttributes = await calculateTotalAttributes(userData)
        const requiredCon = calculateConRequired(damageAmount)
        const currentUserAttributes = {
            "stats.mp": userData.stats.mp,
            "stats.buffs.con": userData.stats.buffs.con,
            "stats.buffs.int": userData.stats.buffs.int
        }

        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        await updateUser({
            "stats.mp": 25,
            "stats.buffs.con": (requiredCon + userAttributes.con) * -1,
            "stats.buffs.int": userAttributes.int * -1
        })

        await wait(3000)

        await CastBlessingSkill({})

        await wait(3000)

        await updateUser(currentUserAttributes)
        setStatusText(statusMessages.finished)

        await wait(13000)
        setDisabledButton(false)
        setStatusText(statusMessages.default)
    }
    
    return (
        <Form onSubmit={DealPartyDamage}>
            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label className="text-start">Damage value</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter a desired amount of damage"
                    onChange={handleChange}
                    name="damageAmount"
                />
            </Form.Group>

            <Button
                className="w-100"
                variant="danger"
                size="lg"
                disabled={buttonIsDisabled}
                type="submit"
            >
                Apply
            </Button>
        </Form>
    )
}