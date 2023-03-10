import Button from '@mui/material/Button';
import { Dialog, IconButton, Link } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import useLocales from '../../hooks/useLocales'

function ModalLoginError({ setShowError, showError }: any) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { t } = useLocales()

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={showError}
                onClose={() => { setShowError(false) }}
                aria-labelledby="responsive-dialog-title"
                className='modal-login-error'
            >
                <IconButton onClick={() => { setShowError(false) }}><CloseRoundedIcon /></IconButton>
                {/* <img src={PasswordProtected} alt="" /> */}
                <div className='ModalErrorIcon'>
                    <WarningAmberIcon />
                </div>
                <DialogTitle id="responsive-dialog-title" textAlign='center'>
                {t<string>('oops')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign='center'>
                    {t<string>('unableToLogin')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className='buildfix2' onClick={() => { setShowError(false) }}>
                    {t<string>('retry')}
                    </Button>
                </DialogActions>
                <p className='lighter-text'>{t<string>('needMoreHelp')}? <Link style={{ cursor: 'pointer' }} color='error' underline='always'>{t<string>('contactUs')}</Link></p>
            </Dialog>
        </div>
    );
}

export default ModalLoginError;
