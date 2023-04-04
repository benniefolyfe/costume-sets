import React, { useState } from 'react'
import { IHomeProps } from '../../pages/home/interfaces'
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

export const BossHealingForm: React.FC<IHomeProps> = ({setStatusText, buttonIsDisabled, setDisabledButton}) => {

    const [healingAmount, setHealingAmount] = useState<number>(0)
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHealingAmount(Number(e.target.value))
    }

    const calculateStrRequired = (healing: number): number => {
        // task damage formula (1 + x * 0.005) * 0.9747 ^ 0 = 100
        // equation formula to find strength required to heal for setted amount => x = (heal - 1) / 0.005
        return (healing - 1) / 0.005
    }

    const HealBoss = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(calculateStrRequired(healingAmount))
        alert("HellO!")

        // setDisabledButton(true)
        // setStatusText(statusMessages.inProgress)

        // const userAttributes = await calculateTotalAttributes(userData)
        // const requiredCon = calculateConRequired(damageAmount)
        // const currentUserAttributes = {
        //     "stats.mp": userData.stats.mp,
        //     "stats.buffs.con": userData.stats.buffs.con,
        //     "stats.buffs.int": userData.stats.buffs.int
        // }

        // const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        // await updateUser({
        //     "stats.mp": 25,
        //     "stats.buffs.con": (requiredCon + userAttributes.con) * -1,
        //     "stats.buffs.int": userAttributes.int * -1
        // })

        // await wait(3000)

        // await CastBlessingSkill({})

        // await wait(3000)

        // await updateUser(currentUserAttributes)
        // setStatusText(statusMessages.finished)

        // await wait(13000)
        // setDisabledButton(false)
        // setStatusText(statusMessages.default)
    }

    return (
        <Form onSubmit={HealBoss}>
            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label className="text-start">Heal value</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter a desired amount of healing"
                    onChange={handleChange}
                    name="healingAmount"
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