import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainContent } from '../../components/main-content'
import { UserAuthenticationForm } from '../../components/user-authentication-form'
import { Home } from '../home'
import { RequireUser } from '../../contexts/habitica-user-context/requireUser'

export const AppRoutes = () => {

    return (
        <BrowserRouter>
            <MainContent>
                <Routes>
                    <Route path='/' element={<UserAuthenticationForm />} />
                    <Route path='/home' element={
                        <RequireUser>
                            <Home />
                        </RequireUser>                   
                    } />
                </Routes>
            </MainContent>
        </BrowserRouter>
    )
}