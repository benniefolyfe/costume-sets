import React, { useContext, useState } from 'react';
import Button from "react-bootstrap/esm/Button";
import { IHomeProps } from '../../pages/home/interfaces';
import { HabiticaUserContext } from "../../contexts/habitica-user-context";
import Form from "react-bootstrap/esm/Form";
import { statusMessages } from '../../objects/status-messages';

interface Healing {
    healingAmount: number,
    isResetingPendingDamage: boolean
}

export const BossHealingForm: React.FC<IHomeProps> = ({ setStatusText, buttonIsDisabled, setDisabledButton }) => {

    const {
        userData,
        setUserData,
        updateUser,
        createTask,
        scoreTask,
        deleteTask,
        calculateTotalAttributes
    } = useContext(HabiticaUserContext)

    const [healSettings, setHealSettings] = useState<Healing>({
        healingAmount: 0,
        isResetingPendingDamage: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHealSettings({
            ...healSettings,
            [e.target.name]: e.target.value
        })
    }

    const calculateStrRequired = (healing: number): number => {     
        return ((healing - 1) / 0.005) + 400
    }

    const HealBoss = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setDisabledButton(true)
        setStatusText("Preparing the healing potion, please wait...")

        const userAttributes = await calculateTotalAttributes(userData)
        let requiredStr = calculateStrRequired(healSettings.healingAmount)
        const currentUserAttributes = {
            "stats.mp": userData.stats.mp,
            "stats.gp": userData.stats.gp,
            "stats.exp": userData.stats.exp,
            "stats.buffs.str": userData.stats.buffs.str,
            "stats.buffs.per": userData.stats.buffs.per,
        }

        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        const newTask = {
            "text": "heal target",
            "type": "daily",
        }

        await updateUser({
            "stats.buffs.str": -(requiredStr + userAttributes.str),
            "stats.buffs.per": -1000
        })

        await wait(3000)

        const taskId = await createTask(newTask)
        await wait(1500)

        const taskResult = await scoreTask(taskId, 'up')
        await wait(1500)

        const taskDamageUp = taskResult._tmp.quest.progressDelta
        
        if (Math.abs(taskDamageUp) !== Math.abs(healSettings.healingAmount)) {
            const correctHealingAmount = Number(taskDamageUp) + Number(healSettings.healingAmount)
            const newRequiredStr = calculateStrRequired(correctHealingAmount)

            await updateUser({
                "stats.buffs.str": -(newRequiredStr + userAttributes.str),
            })
            await wait(3000)
            await scoreTask(taskId, 'down')
            await wait(1500)
            await scoreTask(taskId, 'up')
            await wait(1500)
        }

        await deleteTask(taskId)
        await wait(3000)

        const updatedUserData = await updateUser(currentUserAttributes)
        console.log(updatedUserData)
        setUserData(updatedUserData)
        setStatusText(statusMessages.finished)

        await wait(10000)
        setDisabledButton(false)
        setStatusText(statusMessages.default)
    }

    return (
        <Form onSubmit={HealBoss} name="heal">
            <p style={{ fontSize: '0.9rem' }}>
                You can increase a boss's health above its maximum, 
                but be aware that the health can go back to its max HP 
                when the rage bar is unleashed.
            </p>
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