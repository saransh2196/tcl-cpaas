import { Dialog, IconButton, Link } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import InviteSent from '../../assets/images/svg/invite-sent.svg'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useLocales from '../../hooks/useLocales'

function ModalInviteSent({ inviteSent, setinviteSent, email }: any) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useLocales()
    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={inviteSent}
                aria-labelledby="responsive-dialog-title"
            >
                <IconButton onClick={() => { setinviteSent(false) }}><CloseRoundedIcon /></IconButton>
                <img src={InviteSent} alt="" />
                <DialogTitle id="responsive-dialog-title" textAlign='center'>
                    {t<string>('inviteSent')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign='center'>
                        <p className='darker-text'>{t<string>('requestAccess')} <span className='bolder-text'>{email}</span> {t<string>('toTheUser')}.</p>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ModalInviteSent;
