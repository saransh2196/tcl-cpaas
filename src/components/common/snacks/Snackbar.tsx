import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { SnackbarContent } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import useLocales from '../../../hooks/useLocales';



export default function Snakcbar({ open, snackData, close }: any) {
    const { Icon, snackTitel, snackText } = snackData;
    const [state, setState] = React.useState<any>({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, } = state;

    const handleClick = (newState: SnackbarOrigin) => () => {
        setState({ ...newState });
        close(false);
    };


    const buttons = (
        <React.Fragment>
            <Button
                onClick={() => {
                    handleClick({
                        vertical: 'top',
                        horizontal: 'right',
                    })
                }}
            >

            </Button>
        </React.Fragment>
    );

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => { close(false) }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const { t } = useLocales()


    return (
        <Stack spacing={2} style={{ position: 'fixed', top: 100, right: 0, zIndex: 1000, maxWidth: '300px' }} className='cdr-downloaded'>
            {buttons}
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={7500}
                action={action}
                onClose={() => { close(false) }}
                message={<div className='snackbar-content--container'>
                    <IconButton aria-label="done">
                        <Icon />
                    </IconButton>
                    <div className='snackbar-content'>
                        <p>{snackTitel}</p>
                        <p>{snackText}</p>
                        {/* <p>{t<string>('theFile')} {"InvoiceId"} {t<string>('hasBeenDownloadedLink')} https://www.openfile.com/</p> */}
                    </div>
                </div>}
                key={vertical + horizontal}
            />
        </Stack>
    );
}
