import { rest } from 'msw'
import routes from '../services/api/routes'

export const handlers = [
   rest.get(`${routes.BASE_URL}${routes.GET_INVOICES}`, (req,res, ctx)=>{
      const data = [
             {
               "id": 1,
               "invoiceNumber": 134,
               "customerLe": "a",
               "tataEntity": "vaibhav",
               "poNumber": 1050,
               "paymentStatus": "pending",
               "invoiceAmount": 1000.87,
               "currency": "Rupees",
               "invoiceDate": "2000-06-23",
               "dueDate": "2000-09-23",
               "paymentDateTime": "2000-07-23",
               "timeZone": "IST"
             },
             {
               "id": 2,
               "invoiceNumber": 134,
               "customerLe": "xyz",
               "tataEntity": "Dummy b Tata Entity",
               "poNumber": 110,
               "paymentStatus": "completed",
               "invoiceAmount": 2000.87,
               "currency": "Rupees",
               "invoiceDate": "2000-06-23",
               "dueDate": "2000-09-23",
               "paymentDateTime": "2000-07-23",
               "timeZone": "IST"
             }
           ]
      return res(
         ctx.status(200),
         ctx.json(data)
      )
   })
]