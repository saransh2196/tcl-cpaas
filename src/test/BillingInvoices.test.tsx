import React from 'react'
import { getByText, queryByDisplayValue, render,act, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import Billing from '../components/billing/Billing'
import { Provider } from 'react-redux'
import { store, persistor } from '../redux/store'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { billing } from '../services/api'
import { handlers } from '../mocks/handers'


describe('App', () => {
  // beforeEach(() => {
  //   render(
  //     <BrowserRouter>
  //       <Provider store={store}>
  //         <Billing />
  //       </Provider>
  //     </BrowserRouter>
  //   )
  // })
  const toggleTheme = false
  const textInput = ['pending', 'completed']

  // test('inputs should exist', () => {
  //   render(
  //     <BrowserRouter>
  //       <Provider store={store}>
  //         <Billing toggleTheme={toggleTheme}/>
  //       </Provider>
  //     </BrowserRouter>
  //   )
  //   const searchElement = screen.getByTestId(
  //     'search-element'
  //   ) as HTMLInputElement
  //   const searchButtonElement = screen.getByTestId(
  //     'search-button-element'
  //   ) as HTMLElement
  //   const tableBodyElement = screen.getByTestId(
  //     'table-body-element'
  //   ) as HTMLInputElement
  //   expect(searchButtonElement).toBeInTheDocument()
  //   expect(tableBodyElement).toBeInTheDocument()
  // })

  // test('should be able to type in it for searching', () => {
  //   render(
  //     <BrowserRouter>
  //       <Provider store={store}>
  //         <Billing toggleTheme={toggleTheme}/>
  //       </Provider>
  //     </BrowserRouter>
  //   )
  //   const searchElement = screen.getByTestId(
  //       'search-element'
  //     ) as HTMLInputElement
  //     userEvent.type(searchElement, textInput[0])
  //   expect(searchElement.value).toBe('pending')
  // })


// test('billing page makes a api call with proper params', async  () => {
//   render(
//     <BrowserRouter>
//       <Provider store={store}>
//         <Billing toggleTheme={toggleTheme}/>
//       </Provider>
//     </BrowserRouter>
//   )
//   await waitFor(()=>{
//     expect(screen.queryByText(/Dummy b Tata Entity/i)).toBeTruthy()
//   })
// })


  // test('Search funtionality testing : when the user type in input (as pending) and click on search button then it should display the searched text input only not the alternative (as completed)', async () => {
  //   render(
  //     <BrowserRouter>
  //       <Provider store={store}>
  //         <Billing toggleTheme={toggleTheme}/>
  //       </Provider>
  //     </BrowserRouter>
  //   )
  //   //   const flushPromises = () => new Promise(process.nextTick);
  //   const searchElement = screen.getByTestId(
  //       'search-element'
  //     ) as HTMLInputElement
  //     const ButtonElement = screen.getByTestId(
  //       'search-button-element'
  //       )
  //       userEvent.type(searchElement, textInput[0])
  //       userEvent.click(ButtonElement)
  //       expect(screen.queryByText(/pending/i)).toBeTruthy()
  //       expect(screen.queryByText(/completed/i)).toBeFalsy()
  // })

  // test("Test select option", () => {
  //    render(
  //     <BrowserRouter>
  //       <Provider store={store}>
  //         <Billing toggleTheme={toggleTheme}/>
  //       </Provider>
  //     </BrowserRouter>
  //   )
  //   const buttonEl = screen.getByText(/showing 10/i);
  //   userEvent.click(buttonEl)
  //   const buttonE2 = screen.getByText(/showing 15/i);
  //   const buttonE3 = screen.getByText(/showing 25/i);
      
  //   // userEvent.
  //   expect(buttonEl).toBeInTheDocument()
  //   expect(buttonE2).toBeInTheDocument()
  //   expect(buttonE3).toBeInTheDocument()
  //   expect(buttonEl).toHaveAttribute('value','10')
  //   expect(buttonE2).toHaveAttribute('value','15')
  //   expect(buttonE3).toHaveAttribute('value','25')
  // });


  test("Test total invoices cards", () => {
     render(
      <BrowserRouter>
        <Provider store={store}>
          <Billing toggleTheme={toggleTheme}/>
        </Provider>
      </BrowserRouter>
    )
    const h3element = screen.getAllByTestId('total-data-card');
    expect(h3element[0]).toContainHTML('2') //as we have taken 2 mock invoices 
    expect(h3element[1]).toContainHTML('0') // as we did not taken payment status as overdue in our invoices mock data
    expect(h3element[2]).toContainHTML('1') // as we have 1 unpaid pending invoice data
    expect(h3element[3]).toContainHTML('1') // as we have 1 paid completed invoice data
  });
  
  // test("Test Export to csv button", () => {
  //   render(
  //     <BrowserRouter>
  //       <Provider store={store}>
  //         <Billing toggleTheme={toggleTheme}/>
  //       </Provider>
  //     </BrowserRouter>
  //   )
  //   const buttonEl = screen.getByText(/export to csv/i);
  //   userEvent.click(buttonEl);
  //   expect(buttonEl).toBeInTheDocument()
  //   expect(buttonEl).toHaveTextContent(/EXPORT TO CSV/i);
  //   expect(buttonEl).toHaveAttribute('download','InvoicesData.csv')
  // });
  
})



