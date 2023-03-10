import Button from '@mui/material/Button';
import { Dialog, IconButton, Link } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useLocales from '../../hooks/useLocales'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function ModalErrorSlider({ showError, setShowError, data = {} }: any) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClose = () => {
        setShowError(false);
    };
    const { t } = useLocales()
    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={showError}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className='modal-ticket-error'
            >
                <IconButton onClick={handleClose}><CloseRoundedIcon /></IconButton>
                <div className='ModalErroIcon'>
                    <ErrorOutlineIcon />
                </div>
                <DialogTitle id="responsive-dialog-title" textAlign='center'>
                    {t<string>('oops')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign='center'>
                        {data.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        {t<string>('retry')}
                    </Button>
                </DialogActions>
                <p className='lighter-text'>{t<string>('needMoreHelp')} <Link style={{ cursor: 'pointer' }} color='error' underline='always'>{t<string>('contactUs')}</Link></p>
            </Dialog>
        </div>
    );
}

export default ModalErrorSlider;
