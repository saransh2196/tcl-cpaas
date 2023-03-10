import React from 'react'
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils'
import '../../i18n'
import { Provider } from 'react-redux'
import { store, persistor } from '../../redux/store'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import Login from '../../components/login-screen/Login'

describe('@Login screen testing..', () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Login />
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        )
    })

    it('rewriting the unit test cases......', async () => {
        const buttonElement = await screen.findByRole('button', { name: /Login/i })
        // expect(buttonElement).toBeDisabled();
    })

    it('should disable login button when email is not provided', async () => {
        const emailElement = await screen.getByTestId('email-element')
        const buttonElement = await screen.getByRole('button', { name: /Login/i })
        await userEvent.type(emailElement, 'test@gmail.c')
        waitFor(() => { expect(buttonElement).toBeDisabled() })
    })

    it('should enable login button when all credentials provided valid', async () => {
        const emailElement = await screen.getByTestId('email-element') as HTMLInputElement
        const passwordElement = await screen.getByTestId('password-element') as HTMLInputElement
        const buttonElement = await screen.getByTestId('button-element') as HTMLInputElement

        await userEvent.type(emailElement, 'test@gmail.com')
        await userEvent.type(passwordElement, 'password')
        await userEvent.click(buttonElement)
        fireEvent.click(buttonElement)
        expect(buttonElement).toBeEnabled()
        expect(buttonElement).toHaveTextContent('Login');
    })

});