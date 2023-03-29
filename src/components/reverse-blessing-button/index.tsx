import { useState } from "react"
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { findKey } from "../../utils";
import { Attributes, Equipment, EquippedObject, IProps, UserData } from "./interfaces";
import { getGameData } from "../../services/content";
import { getUserData, updateUserData, useUserBlessing } from "../../services/user";
import { statusMessages } from "../../objects/status-messages";

export const ReverseBlessingButton: React.FC<IProps> = ({ setStatusText }) => {
    const [buttonIsDisabled, setDisabledButton] = useState<boolean>(false)

    function calculateTotalEquipped(
        equippedObject: EquippedObject,
        gearList: { [key: string]: Equipment },
        userClass: string
    ): Attributes {
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

    function levelStatsHandler(level: number): number {
        const actualLevelStat = level / 2

        if (actualLevelStat <= 50) return actualLevelStat
        return 50
    }

    async function calculateTotalAttributes(userData: UserData) {
        const gameData = await getGameData()
        console.log(userData)

        const totalLevel = levelStatsHandler(userData.stats.lvl)
        const totalBuffs = {
            con: userData.stats.buffs.con,
            int: userData.stats.buffs.int
        }
        const totalDistributed = {
            con: userData.stats.con,
            int: userData.stats.int
        }
        const totalEquipped = calculateTotalEquipped(
            userData.items.gear.equipped,
            gameData.data.gear,
            userData.stats.class
        )

        return {
            con: Math.floor(totalLevel + totalBuffs.con + totalDistributed.con + totalEquipped.con),
            int: Math.floor(totalLevel + totalBuffs.int + totalDistributed.int + totalEquipped.int),
        }
    }

    async function DealFriendlyFire() {
        setDisabledButton(true)
        setStatusText(statusMessages.inProgress)

        const userData = await getUserData()
        const userAttributes = await calculateTotalAttributes(userData.data)
        const currentUserAttributes = {
            "stats.mp": userData.data.stats.mp,
            "stats.buffs.con": userData.data.stats.buffs.con,
            "stats.buffs.int": userData.data.stats.buffs.int
        }
        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        await updateUserData({
            "stats.mp": 25,
            "stats.buffs.con": (630 + userAttributes.con) * -1,
            "stats.buffs.int": userAttributes.int * -1
        })

        await wait(3000)

        await useUserBlessing({})

        await wait(3000)

        await updateUserData(currentUserAttributes)
        setStatusText(statusMessages.finished)

        await wait(13000)
        setDisabledButton(false)
        setStatusText(statusMessages.default)
    }

    return (
        <Row>
            <Col>
                <Button
                    className="dangerous-button"
                    variant="danger"
                    size="lg"
                    onClick={() => DealFriendlyFire()}
                    disabled={buttonIsDisabled}
                >
                    <img src="/images/white-skull.png" alt="skull" width="128px" />
                </Button>
            </Col>
        </Row>
    )
}