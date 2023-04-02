import { useContext, useState } from "react"
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { findKey } from "../../utils";
import { Attributes, Equipment, IProps } from "./interfaces";
import { statusMessages } from "../../objects/status-messages";
import { HabiticaUserContext } from "../../contexts/habitica-user-context";
import { UserData } from "../../contexts/habitica-user-context/interfaces";
import { EquippedObject } from "../../contexts/habitica-user-context/interfaces";

export const ReverseBlessingButton: React.FC<IProps> = ({ setStatusText }) => {
    
    const [buttonIsDisabled, setDisabledButton] = useState<boolean>(false)
    const { 
        userData,
        updateUser,
        CastBlessingSkill,
        fetchGameContent
    } = useContext(HabiticaUserContext)

    function calculateTotalEquipped(
        equippedObject: EquippedObject,
        gearList: { [key: string]: string },
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

    async function DealFriendlyFire() {
        setDisabledButton(true)
        setStatusText(statusMessages.inProgress)

        const userAttributes = await calculateTotalAttributes(userData)
        const currentUserAttributes = {
            "stats.mp": userData.stats.mp,
            "stats.buffs.con": userData.stats.buffs.con,
            "stats.buffs.int": userData.stats.buffs.int
        }

        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        await updateUser({
            "stats.mp": 25,
            "stats.buffs.con": (630 + userAttributes.con) * -1,
            "stats.buffs.int": userAttributes.int * -1
        })

        await wait(3000)

        await CastBlessingSkill({})

        await wait(3000)

        console.log(currentUserAttributes)
        await updateUser(currentUserAttributes)
        setStatusText(statusMessages.finished)

        await wait(13000)
        setDisabledButton(false)
        setStatusText(statusMessages.default)
    }

    return (
        <Row className="text-center">
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