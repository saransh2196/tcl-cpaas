import { Box, Stack, Typography, Grid, StepContent, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Invoice from '../../common/icons/invoice'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import PaidInvoice from '../../common/icons/paidInvoice'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import useLocales from '../../../hooks/useLocales'
import AttachmentIcon from '@mui/icons-material/Attachment';
import { Divider } from '@mui/material';
import {
  useDispatch as useAppDispatch,
} from '../../../redux/store'
import { downloadAtachmentService } from '../../../redux/slices/serviceAssurenceSlice'
import { getoverFlowwithWidth } from '../../../utils/helpers'
import { apiVrbls, cardsValues } from '../../../utils/constants'
const TicketSummary = ({
  handleShow,
  showIt,
  CaseData = null,
  attachments = [],
}: any) => {
  const { t } = useLocales()
  const StepperSx = {
    '& .MuiStepConnector-root:first-child': {
      left: 'calc(-100% + 30px)',
      right: 'calc(0% + 30px)',
    },
    '& .MuiStepConnector-line': {
      marginTop: '40px',
    },
    '& .MuiStep-horizontal .MuiStepLabel-root': {
      alignItems: 'baseline',
    },
    '& .MuiStep-horizontal:last-child ': {
      textAlign: 'right',
    },
    '& .MuiStep-horizontal svg': {
      fill: '#1c73e9',
    },
    '& .MuiStep-horizontal:last-child .MuiStepLabel-root': {
      alignItems: 'end',
    },
    '& .MuiStep-root:first-child .stepperLabel': {
      position: 'relative',
      top: '-5px',
      left: '-10px',
      minHeight: '38px',
    },
    '& .MuiStep-root:nth-child(2) .stepperLabel': {
      textAlign: 'center',
    },
    '& .MuiStep-root:nth-child(2) .MuiStepLabel-root': {
      alignItems: 'center',
    },
    '& .MuiStep-root:last-child .stepperLabel': {
      position: 'relative',
      top: '-5px',
      left: '0px',
      minHeight: '38px',
    },
    '& .MuiStep-root .MuiStepConnector-line ': {
      borderColor: '#5898ea',
    },
  }
  const dispatch = useAppDispatch()

  const downlaodFile = (atachmentid: any) => {
    dispatch(downloadAtachmentService(CaseData[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.TICKET_ID], atachmentid))
  }
  return (
    <>
      {showIt && CaseData && (
        <Box
          sx={{
            bgcolor: '#fff',
            boxShadow: 24,
            height: 'calc(100vh - 90px)',
            position: 'fixed',
            top: '90px',
            right: 0,
            bottom: 0,
            width: '50%',
            // padding: '56px',
            zIndex: 1000,
            overflowY: 'auto',
            transition: 'transform 350ms 0ms ease-in',
            transform: `translateX(${showIt ? 0 : 100} %)`,
          }}
          className="ticket-summary--block"
        >
          <CloseIcon
            onClick={handleShow}
            sx={{
              position: 'absolute',
              top: '40px',
              right: '40px',
              fontSize: '30px',
              zIndex: '999',
              opacity: '0.5',
              transition: 'all 0.5s ease-in-out',
              '&:hover': {
                cursor: 'pointer',
                opacity: '1',
              },
            }}
          />
          <Stack>
            <Box sx={{ padding: '100px 60px 60px', position: 'relative' }}>
              <Typography className="headtext1">{t<string>('TicketSummary')}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box className="infoBox1">
                    <Box className="infoBoxicon">
                      <div>
                        <Invoice />
                      </div>
                    </Box>
                    <Box>
                      <div className="infoboxTitel">{t<string>('TicketNumber')}</div>
                      <div className="infobocValue">
                        {CaseData[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.TICKET_ID]}
                      </div>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="infoBox1">
                    <Box className="infoBoxicon paid">
                      <div>
                        <PaidInvoice />
                      </div>
                    </Box>
                    <Box>
                      <div className="infoboxTitel">{t<string>('Sevice')}</div>
                      <div className="infobocValue">
                        {CaseData[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.SERVICE_NAME]}
                      </div>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="infoBox1">
                    <Box className="infoBoxicon doller">
                      <div>
                        <MonetizationOnIcon />
                      </div>
                    </Box>
                    <Box>
                      <div className="infoboxTitel">{t<string>('assetid')}</div>
                      <div className="infobocValue"> {CaseData[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.ASSET_ID]}</div>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="infoBox1">
                    <Box className="infoBoxicon caution">
                      <div>
                        <ErrorOutlineIcon />
                      </div>
                    </Box>
                    <Box>
                      <div className="infoboxTitel">{t<string>('issuetype')}</div>
                      <div className="infobocValue">
                        {CaseData[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.ISSUE_TYPE]}
                      </div>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Box className="basicModule" sx={{ mt: '40px', mb: '0px' }}>
                <Typography className="headtext2">{t<string>('Description')} : </Typography>
              </Box>
              <Box className="infoBox1 discription">
                <Box>
                  <div className="infobocDesc">{CaseData[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.DESCRIPTION]}</div>
                </Box>
              </Box>

              <Box className="basicModule" sx={{ mt: '40px', mb: '0px' }}>
                <Typography className="headtext2">{t<string>('Attachments')} : </Typography>
              </Box>
              {/* <Stack direction="row" spacing={2}></Stack>

              <Box className="basicModule" sx={{ mt: '40px', mb: '0px' }}></Box> */}
              <Box
                sx={{
                  width: '100%',
                  position: 'relative',
                  zIndex: '999',
                  // bottom: '-30px',
                  left: '0px',
                  // padding: '0px 60px',
                }}
              >
                <Box className="basicModule" sx={{ mt: '0px', mb: '60px' }}>
                  <Grid container spacing={2} className="">
                    {attachments &&
                      attachments.map((s: any, i: any) => {
                        return (
                          <Grid
                            key={`filekey${i}`}
                            item
                            xs={3}
                            onClick={() => {
                              downlaodFile(s[apiVrbls.SERVICE_ASSURANCE.ATTACHMENTS.ATTACHMENT_ID])
                            }}
                          >
                            <Box component="span" className="attachmentBox">
                              <InsertDriveFileIcon />
                              <Tooltip
                                title={
                                  getoverFlowwithWidth(s.attachmentName, 85) ? s.attachmentName : ''
                                }
                                placement="bottom-start"
                                followCursor

                              >
                                <span className="fileName">
                                  {s.attachmentName}
                                </span>
                              </Tooltip>

                            </Box>
                          </Grid>
                        )
                      })}
                  </Grid>
                </Box>
              </Box>

              <Box className="basicModule" sx={{ mt: '30px', mb: '0px' }}></Box>
              <Box sx={{ width: "100%", position: 'absolute', zIndex: '999', bottom: '-30px', left: '0px', padding: '0px 60px' }}>
                <Stepper activeStep={1} alternativeLabel sx={StepperSx}>
                  <Step key={`label${'0'}`}>
                    <div className="stepperLabel">
                      <div>
                        <div className="darktext1">{t<string>('TicktedRaised')}</div>
                        <div className="lighttext1">
                          {CaseData[apiVrbls.SERVICE_ASSURANCE.CREATED_DATE]}
                        </div>
                      </div>
                    </div>
                    <StepLabel
                      StepIconComponent={CheckCircleIcon}
                      sx={{
                        '& .MuiStepLabel-iconContainer': {
                          border: '2px solid #1A73E8',
                          borderRadius: '50%',
                          background: 'white',
                          zIndex: '1',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '& .MuiSvgIcon-root': {
                            fontSize: '22px',
                          },
                        },
                      }}
                    >
                      {' '}
                    </StepLabel>
                  </Step>
                  <Step key={`label${'1'}`}>
                    <div className="stepperLabel">
                      <div>
                        <div className="darktext1">WIP</div>
                        <div className="lighttext1">
                          {CaseData[apiVrbls.SERVICE_ASSURANCE.LAST_UPDATED]}
                        </div>
                      </div>
                    </div>
                    <StepLabel StepIconComponent={FiberManualRecordIcon}
                      sx={{
                        '& .MuiStepLabel-iconContainer': {
                          border: '2px solid #1A73E8',
                          borderRadius: '50%',
                          background: 'white',
                          marginTop: '17px',
                          zIndex: '1',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '& .MuiSvgIcon-root': {
                            fontSize: '10px',
                            margin: '1px',
                          },
                        },
                      }}
                    > </StepLabel>
                  </Step>
                  <Step key={`label${'2'}`}>
                    <div className="stepperLabel">
                      <div>
                        <div className="darktext1">{t<string>('Closed')}</div>
                        <div className="lighttext1">
                          {CaseData[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.STATUS] == cardsValues.SERVICE_ASSURENCE.RESOLVED
                            ? CaseData.lastUpdatedOn
                            : ''}
                        </div>
                      </div>
                    </div>
                    <StepLabel
                      StepIconComponent={FiberManualRecordIcon}
                      sx={{
                        '& .MuiStepLabel-iconContainer': {
                          border: '2px solid #1A73E8',
                          borderRadius: '50%',
                          background: 'white',
                          zIndex: '1',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '& .MuiSvgIcon-root': {
                            fontSize: '10px',
                            margin: '1px',
                          },
                        },
                      }}
                    >
                      {' '}
                    </StepLabel>
                  </Step>
                </Stepper>
              </Box>
            </Box>
            <Box className="conversationBox">
              <Box sx={{ maxWidth: 600 }}>
                <Stepper activeStep={0} orientation="vertical">
                  <Step key={`stepLbl${'one'}`} className="userNotePost">
                    <StepLabel
                      StepIconComponent={AccountCircleIcon}
                      sx={{ padding: '0px' }}
                    >
                      {' '}
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <div className="postBox">
                            <div className="inputBox">
                              <input
                                type="text"
                                placeholder={t<string>('writeYourQueries')}
                              />
                            </div>
                            <div className="buttonBox">
                              <button className='post-attachment'><AttachmentIcon /></button>
                              <button>{t<string>('Post')}</button>
                            </div>
                          </div>
                        </div>
                      </Box>
                    </StepLabel>
                    <StepContent></StepContent>
                  </Step>
                  {CaseData.notes && CaseData.notes.length > 0 &&
                    CaseData.notes.map((note: any, index: any) => (
                      <Step key={`stepLbl${index}`} expanded={true}>
                        <StepLabel
                          StepIconComponent={AccountCircleIcon}
                          sx={{
                            padding: '0px',
                            '& .MuiStepLabel-labelContainer': {
                              paddingLeft: '35px',
                            },
                          }}
                        >
                          {note[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.NOTES.AUTHOR]}
                        </StepLabel>
                        <StepContent sx={{ paddingLeft: '55px' }}>
                          <Typography>{note[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.NOTES.TEXT]}</Typography>
                          <div className="lighttext2">{note[apiVrbls.SERVICE_ASSURANCE.TIKCET_DETAILS.NOTES.DATE]}</div>
                          <Divider sx={{ mt: '25px' }} />
                        </StepContent>
                      </Step>
                    ))}
                </Stepper>
              </Box>
            </Box>
          </Stack>
        </Box>
      )}
    </>
  )
}

export default TicketSummary
