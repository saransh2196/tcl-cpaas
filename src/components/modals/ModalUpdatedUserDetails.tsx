import { Dialog, IconButton, Link } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import EmailUpdated from '../../assets/images/svg/email-updated.svg'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useLocales from '../../hooks/useLocales'
import { apiVrbls } from '../../utils/constants';

function ModalUpdatedUserDetails({ open, setOpen, data }: any) {
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
                aria-labelledby="responsive-dialog-title"
            >
                <IconButton onClick={handleClose}><CloseRoundedIcon /></IconButton>
                {/* <IconButton><CloseRoundedIcon /></IconButton> */}
                <img src={EmailUpdated} alt="" />
                <DialogTitle id="responsive-dialog-title" textAlign='center'>
                    {t<string>('updated')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign='center'>
                        <p className='darker-text'>{t<string>('userDetailsUpdated')} <span className='bolder-text'>{data[apiVrbls.USER_MANAGMENT.EMAIL_ID]}</span>.</p>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ModalUpdatedUserDetails;
