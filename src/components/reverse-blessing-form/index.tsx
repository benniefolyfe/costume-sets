import { useContext, useState } from "react"
import Button from "react-bootstrap/esm/Button";
import { IHomeProps } from '../../pages/home/interfaces';
import { statusMessages } from "../../objects/status-messages";
import { HabiticaUserContext } from "../../contexts/habitica-user-context";
import Form from "react-bootstrap/esm/Form";

export const ReverseBlessingForm: React.FC<IHomeProps> = ({ setStatusText, buttonIsDisabled, setDisabledButton }) => {

    const {
        userData,
        updateUser,
        CastBlessingSkill,
        calculateTotalAttributes,
    } = useContext(HabiticaUserContext)

    const [damageAmount, setDamageAmount] = useState<number>(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDamageAmount(Number(e.target.value))
    }

    const calculateConRequired = (damage: number): number => {
        return (damage / 0.04 - 5) + 10
    }

    const DealPartyDamage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setDisabledButton(true)
        setStatusText("Reversing your blessing, please wait.")

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
            <p style={{ fontSize: '0.9rem' }}>
                If you are in a party, let them know that you are doing this.
            </p>
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