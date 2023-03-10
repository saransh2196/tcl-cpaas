import { useState, useEffect } from 'react';
import useLocales from '../../../hooks/useLocales';
import { useDispatch } from '../../../redux/store'

const Card = ({ cardData, data, className }: any) => {
    const { t } = useLocales()
    const dispatch = useDispatch();
    const [active, setActive] = useState(data.titel)
    const handleClick = (event: any) => {
        const i = document.getElementsByClassName('cardType__1 active');
        if (i.length > 0) {
            i[0].classList.remove('active')
        }
        document.getElementById(`cardType__1Buff${data.titel}`)?.classList.add('active')
        dispatch(data.action)
    };
    return <button
        id={`cardType__1Buff${data.titel}`}
        onClick={handleClick}
        defaultValue={10}
        className={`cardType__1 ${className} ${data.id} ${data.state}`}
        style={{
            cursor: 'pointer',
            backgroundColor: ((data.titel == t<string>('allInvoice')) ? 'rgb(26, 115, 232)' : ((data.titel == t<string>('overdue')) ? 'rgb(54, 63, 94)' : ((data.titel == t<string>('unpaidInvoices')) ? 'rgb(229, 68, 87)' : ((data.titel == t<string>('paidInvoices')) ? 'rgb(61, 184, 135)' : ''))))
        }}
    >
        <div id='cardType__inner' className={`cardType__inner `}>
            <div className="cardType__icon">
                {data.icon}
            </div>
            <div className="cardType__text">
                <p id='name' className="cardType__name">
                    {data.titel}
                </p>
                <h3 className="cardType__Number" data-testid='total-data-card'>
                    {data.value}
                </h3>
            </div>
        </div>
    </button>
}

export default Card
