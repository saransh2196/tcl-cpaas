import { Dialog, IconButton, Link } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TicketRaised from '../../assets/images/svg/ticket-raised.svg'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useLocales from '../../hooks/useLocales'



function ModalMail({ open, setOpen, modalData }: any) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
                <img src={TicketRaised} alt="" />
                <DialogTitle id="responsive-dialog-title" textAlign='center'>
                    {t<string>('checkYourMail')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign='center'>
                        <p className='darker-text'>{t<string>('sentLinkToRegMail')} <span className='bolder-text'>{modalData.email}</span></p>
                        <p className='lighter-text'>{t<string>('didntReceiveLink')}? <Link style={{ cursor: 'pointer' }} onClick={modalData.action} color='error' underline='always'>{t<string>('resend')}</Link></p>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ModalMail;
