import * as React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    borderRadius: '20px',
    paddingBottom: '80px',
    backgroundColor: '#3A4548',
    width: '650px',
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2, bgcolor: '#3A4548' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
            '& svg': {
              fontSize: '2rem',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          borderRadius: '20px',
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          .
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            bgcolor: '#3A4548',
            borderTop: 0,
            borderBottom: 0,
          }}
        >
          <Typography
            variant="h4"
            color="common.white"
            textAlign="center"
            gutterBottom
          >
            Welcome to CPass!
          </Typography>
          <Typography
            variant="h5"
            color="common.white"
            textAlign="center"
            gutterBottom
          >
            Perfect! You have successfully activated your account.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: '#3A4548',
          }}
        >
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              mx: 'auto',
              background:
                'transparent linear-gradient(297deg, #D63548 0%, #D63548 100%) 0% 0% no-repeat padding-box',
              borderRadius: '35px',
              width: '477px',
              height: '70px',
            }}
          >
            Jump to Dashboard
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
