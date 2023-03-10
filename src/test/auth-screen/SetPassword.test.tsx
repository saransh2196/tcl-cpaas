import React from 'react'
import { render, screen } from '../../utils/test-utils'
import '../../i18n'
import { Provider } from 'react-redux'
import { store, persistor } from '../../redux/store'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import SetPassword from '../../components/set-password/SetPassword'

describe('@SetPassword screen testing..', () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <SetPassword />
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        )
    })

    it('initialy render SetPassword Form Component', async () => {
        const passwordElement = await screen.getByTestId('password-element') as HTMLInputElement
        const confirmPasswordElement = await screen.getByTestId('confirm-password-element') as HTMLInputElement
        const submitButton = screen.getByRole('button', { name: /Done/i, }) as HTMLInputElement
        expect(submitButton.type).toBe('submit')
        expect(passwordElement).toBeInTheDocument()
        expect(confirmPasswordElement).toBeInTheDocument()
        expect(submitButton).toBeInTheDocument()
    })

});