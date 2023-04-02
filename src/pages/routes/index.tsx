import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainContent } from '../../components/main-content'
import { UserAuthenticationForm } from '../../components/user-authentication-form'
import { MainControllers } from '../main-controllers'
import { RequireUser } from '../../contexts/habitica-user-context/requireUser'

export const AppRoutes = () => {

    return (
        <BrowserRouter>
            <MainContent>
                <Routes>
                    <Route path='/' element={<UserAuthenticationForm />} />
                    <Route path='/main' element={
                        <RequireUser>
                            <MainControllers />
                        </RequireUser>                   
                    } />
                </Routes>
            </MainContent>
        </BrowserRouter>
    )
}