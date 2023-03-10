import * as React from 'react';
import { Dialog, IconButton } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TicketRaised from '../../assets/images/svg/ticket-raised.svg'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useLocales from '../../hooks/useLocales'


function ModalTicket() {
    const [open, setOpen] = React.useState(true);
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
                <img src={TicketRaised} alt="" />
                <DialogTitle id="responsive-dialog-title" textAlign='center'>
                {t<string>('ticketRaised')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign='center'>
                    <p className='darker-text'>{t<string>('ticketRaisedDetail')} <span className='ticket-number'>AM2398756710</span> {t<string>('willGetBack')}</p>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ModalTicket;
