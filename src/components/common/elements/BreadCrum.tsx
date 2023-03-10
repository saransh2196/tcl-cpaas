import React, { useState } from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Link from '@mui/material/Link'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import axios from "axios"
import useLocales from '../../../hooks/useLocales';

export const BreadCrums = ({ data }: { data: any }) => {
    const { t } = useLocales();

    return (
        <div className="content__breadcrum">
            <Stack spacing={2} className="breadcrum-stack">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" >
                    {[
                        data.path.map((ele: any) =>
                            ele.type == 'link' ? <Link underline="hover" key="1" color="inherit" id="breadcrumb-color" href={ele.linkURL}>
                                {t<string>(ele.transName)} </Link> :
                                <Typography key="3" color="text.primary">{t<string>(ele.transName)}  </Typography>
                        )
                    ]}
                </Breadcrumbs>
            </Stack>
            <h3 className="content_pageTitle">
                {t<string>(data.path[1].transName)}
            </h3>
        </div>
    )
}
