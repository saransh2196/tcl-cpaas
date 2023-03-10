import { Link, Typography } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import { typeVar } from '../../../utils/constants'
import { useDispatch as useAppDispatch } from '../../../redux/store'
import useLocales from '../../../hooks/useLocales'
import { useState } from 'react'

export const PageSearch = ({ searchFn, searchPlaceholder }: { searchFn: any, searchPlaceholder: string }) => {
    const dispatch = useAppDispatch()
    const { t } = useLocales()
    const [searchValue, setSearchValue] = useState('')
    const handleSearch = async (e: any) => {
        e.preventDefault()
        dispatch(searchFn(searchValue))
    }
    const chnageEvent = async (e: any) => {
        setSearchValue(e)
        if (e == '' || e == null || e == undefined) {
            dispatch(searchFn(''))
        }
    }

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            {t<string>('dashboard')}
        </Link>,
        <Typography key="3" color="text.primary">
            {t<string>('billingInvoices')}
        </Typography>,
    ]

    return (
        <div className="">
            <div className="right__elementsItem search__group">
                <Paper
                    id="searchproducts-input"
                    component="form"
                    className="search__form"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: 350,
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        onFocus={(e) => {
                            e.target.placeholder = '';
                        }}
                        onBlur={(e) => {
                            e.target.placeholder = `${t<string>('searchInvoiceNoEntity')}`
                        }}
                        placeholder={t<string>(searchPlaceholder)}
                        inputProps={{
                            'aria-label': 'Search Products, Orders and Clients',
                            'data-testid': 'search-element',
                        }}
                        type="search"
                        value={searchValue}
                        onChange={(e) => chnageEvent(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleSearch(e)
                                // write your functionality here
                            }
                        }}
                    />
                    <IconButton
                        data-testid="search-button-element"
                        onClick={handleSearch}
                        type="button"
                        sx={{ p: '10px' }}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
        </div>
    )
}
