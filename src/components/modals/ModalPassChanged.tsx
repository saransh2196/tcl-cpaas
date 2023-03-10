import * as React from 'react';
import Button from '@mui/material/Button';
import { Dialog, IconButton, Link } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import PasswordProtected from '../../assets/images/svg/password-protected.svg'
import TicketRaised from '../../assets/images/svg/ticket-raised.svg'
import PasswordChanged from '../../assets/images/svg/password-changed.svg'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ForgotPassword from '../forgot-password/ForgotPassword';
import useLocales from '../../hooks/useLocales'

function ModalPassChanged({ open, setOpen }: any) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { t } = useLocales()

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <IconButton onClick={handleClose}><CloseRoundedIcon /></IconButton>
                <img src={PasswordChanged} alt="" />
                <DialogTitle id="responsive-dialog-title" textAlign='center'>
                {t<string>('passChanged')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign='center'>
                        <p className='darker-text'>{t<string>('passChangedSuccessfully')}</p>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ModalPassChanged;
