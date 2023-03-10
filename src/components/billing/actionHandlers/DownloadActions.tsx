import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import {
    useDispatch as useAppDispatch,
} from '../../../redux/store'
import useLocales from '../../../hooks/useLocales'
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CachedIcon from '@mui/icons-material/Cached';
import Download from '../../common/icons/download'
import Snakcbar from '../../common/snacks/Snackbar'
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { apiVrbls } from '../../../utils/constants'
export default function DownloadActions({
    item,
    downloadCDR,
    downloadPDF,
    inProgress,
    openSnack,
    SetOpenSnack,
    SnakData,
    setSnackData
}: any) {
    const { t } = useLocales()
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [downloadStarted, SetdownloadStarted] = React.useState(false);
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDownload = async ({ item }: any) => {
        SetOpenSnack(true);
        setSnackData({
            Icon: RotateRightIcon,
            snackTitel: `Invoice ${t<string>('isDownloading')}`,
            snackText: `${t<string>('theDownloadOf')} ${item[apiVrbls.BILLING.INVOICE_ID]} ${t<string>('isInProgress')}`
        })
        dispatch(downloadPDF(item, (status: any) => {
            SetOpenSnack(false);
            setTimeout(() => {
                if (status == true) {
                    // Handle error snack
                } else {
                    setSnackData({
                        Icon: CheckCircleIcon,
                        snackTitel: `${t<string>('successfullyDownloaded')} `,
                        snackText: `${t<string>('theFile')} ${item[apiVrbls.BILLING.INVOICE_ID]} ${t<string>('hasBeenDownloadedLink')} https://www.openfile.com/`
                    })
                    SetOpenSnack(true);
                }
            }, 10);
        }));
    }

    const handleDownloadCdr = async ({ item }: any) => {
        setSnackData({
            Icon: RotateRightIcon,
            snackTitel: `CDR File  ${t<string>('isDownloading')}`,
            snackText: `${t<string>('theDownloadOf')} ${item[apiVrbls.BILLING.INVOICE_ID]} ${t<string>('isInProgress')}`
        })
        SetOpenSnack(true);
        dispatch(downloadCDR(item, (status: any) => {
            SetOpenSnack(false);
            setTimeout(() => {
                if (status == true) {
                    // Handle error snack
                } else {
                    setSnackData({
                        Icon: CheckCircleIcon,
                        snackTitel: `${t<string>('successfullyDownloaded')} `,
                        snackText: `${t<string>('theFile')} ${item[apiVrbls.BILLING.INVOICE_ID]} ${t<string>('hasBeenDownloadedLink')} https://www.openfile.com/`
                    })
                    SetOpenSnack(true);
                }
            }, 10);
        }));

    }
    return (
        <React.Fragment>
            <Snakcbar snackData={SnakData} open={openSnack} close={SetOpenSnack} />
            <Tooltip title={t<string>('download')} className={downloadStarted ? 'downlaodIP' : ''}>
                <IconButton
                    className="download-cdr"
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    {downloadStarted ? <CachedIcon /> : item[apiVrbls.BILLING.INVOICE_ID] ? <CheckIcon /> : <Download />}
                </IconButton>
            </Tooltip>
            {/* </Box> */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => handleDownload(item)}>
                    {t<string>('invoice')}
                </MenuItem>
                <Divider />
                {/* <MenuItem className={`${inProgress ? 'downlaodIP' : ''}`} onClick={() => handleDownloadCdr(item)}> */}
                <MenuItem className={`${inProgress ? '' : ''}`} onClick={() => handleDownloadCdr(item)}>
                    {t<string>('cdr')}
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
