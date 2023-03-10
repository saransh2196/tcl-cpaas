import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import {
    ListItemIcon,
    Tooltip,
    Button,
    Box,
} from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import useLocales from '../../../hooks/useLocales'
import { useDispatch as useAppDispatch } from '../../../redux/store'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Menu as TbMenu, MenuItem as TbMenuItem, MenuButton, ControlledMenu } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { getoverFlow, getoverFlowwithWidth } from '../../../utils/helpers'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const DataTable = ({
    TableData,
    sortAction,
    clearFilterClm,
    filterAction,
    ClmSearch,
    clearAllfilter,
    filterValues,
}: any) => {
    const { t } = useLocales()
    const { data, columns, tableName } = TableData;
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => { setAnchorEl(null) }
    const result1: any[] = []
    const [columnsDropdown, setColumnsDropdown] = useState(result1);
    useEffect(() => {
        setColumnsDropdown(columns);
    }, [])

    const allowDrop = (ev: any) => {
        ev.preventDefault();
    }

    const drag = (ev: any, item: any, index: any) => {
        ev.dataTransfer.setData("columnData", JSON.stringify({ ...item, index }));
    }

    const drop = (ev: any) => {
        ev.preventDefault();
        const data = JSON.parse(ev.dataTransfer.getData("columnData"));
        if (ev.target.id) {
            const draggedPosition = ev.target.id.split('-');
            // let draggedPosition = ;      
            const col = [...columnsDropdown].filter((val, ind) => ind !== data['index']);
            delete data['index'];
            col.splice(parseInt(draggedPosition[1]), 0, data);
            setColumnsDropdown(col);
        }
    }

    const [drops, setdrops] = useState('');
    const [hiddenClms, SetHiddentClmns] = useState<any>([]);

    const changeActive = (item: any) => {
        const i = hiddenClms.indexOf(`${item}`);
        if (i == -1) {
            SetHiddentClmns((s: any) => [...s, item]);
        } else {
            const m = hiddenClms;
            m.splice(i, 1);
            SetHiddentClmns((s: any) => s.filter((f: any) => f != `${item}`));
        }
    }
    const getTdwidhth = () => {
        try {
            const m: any = document.getElementsByTagName('thead')[0];
            return m.offsetWidth - 600;
        } catch (e) {
            return 1000;
        }
    }
    return (
        <>
            <TableContainer component={Paper} className={`table__Container buildfix4 table-${tableName}`}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    {/* Table Body */}
                    <TableBody
                        data-testid="table-body-element"
                        className="TableBody"
                        id="table-body-element"
                    >

                        <TableRow id="table-head" className='manualTbthead'>
                            <StyledTableCell
                            >
                                <TbMenu
                                    menuButton={
                                        <MenuButton id="border-removing">
                                            <MoreVertIcon />
                                        </MenuButton>
                                    }
                                    transition
                                    onDragOver={allowDrop} onDrop={drop}
                                > <ControlledMenu
                                    state={'open'}
                                    key={"index"}
                                    className="list-item"
                                >
                                        {columnsDropdown.map((item: any, index: any) => {
                                            return (
                                                <>

                                                    <TbMenuItem
                                                        draggable={true}
                                                        onDragStart={(ev) => drag(ev, item, index)}
                                                        id={`${item.eleName}-${index}`}
                                                    >
                                                        <DragIndicatorIcon fontSize="small" />
                                                        {hiddenClms.includes(item.eleName) ? (<CheckBoxOutlineBlankIcon
                                                            onClick={(e) => {
                                                                changeActive(item.eleName)
                                                            }}
                                                            fontSize="small"
                                                        />) : (
                                                            <CheckBoxIcon
                                                                onClick={(e) => changeActive(item.eleName)}
                                                                fontSize="small"
                                                            />
                                                        )}
                                                        <Button
                                                            onClick={(e) => {
                                                                changeActive(item.eleName)
                                                            }}
                                                            style={{ 'color': 'black' }}
                                                        >
                                                            {item.headTrans}
                                                        </Button>
                                                    </TbMenuItem>

                                                </>
                                            )
                                        })}
                                    </ControlledMenu>


                                </TbMenu>
                            </StyledTableCell>
                            {/* Table Heads */}
                            {columnsDropdown.map((head: any, index: any) => (
                                !hiddenClms.includes(head.eleName) && <StyledTableCell
                                    key={`${head.headTrans}${index}`}
                                    align="right"
                                >
                                    <div className="th_wrapper">
                                        <button
                                            id="hiding"
                                            name={t<string>(`tables.${tableName}.${head.headTrans}`)}
                                            className="voidBtn"
                                            key={`clickkey-${head.headTrans}${index}`}
                                        >
                                            {t<string>(`tables.${tableName}.${head.headTrans}`)}
                                            {(head.sort || head.search || head.filter) && (
                                                <>
                                                    <div className='customer-le-menu'>
                                                        <Button
                                                            id="basic-button"
                                                            aria-controls={drops == head.headTrans ? 'basic-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={drops == head.headTrans ? 'true' : undefined}
                                                            onClick={(e) => {
                                                                handleClick(e);

                                                                if (drops == head.headTrans) {
                                                                    setdrops('')
                                                                } else {
                                                                    setdrops(head.headTrans);
                                                                    setTimeout(() => {
                                                                        if (head.search) {
                                                                            const m: any = document.getElementById(`${head.headTrans}${tableName}${head.eleName}`);
                                                                            const p = filterValues.filter((g: any) => g.element == head.eleName);
                                                                            if (p.length > 0) {
                                                                                if (p[0].values[0]) {
                                                                                    m.value = p[0].values[0]
                                                                                }
                                                                            }
                                                                        }

                                                                        if (head.filter) {
                                                                            const p = filterValues.filter((g: any) => g.element == head.filterData?.element);
                                                                            if (p.length > 0) {
                                                                                p[0].values.map((f: any) => {
                                                                                    const m: any = document.getElementById(`${head.eleName}${f}status-check-box`);
                                                                                    m.checked = true

                                                                                })
                                                                            }
                                                                        }
                                                                    }, 300);

                                                                }
                                                            }}
                                                            startIcon={<UnfoldMoreIcon />}
                                                        >
                                                        </Button>
                                                        <Menu
                                                            id={`basic-menu`}
                                                            anchorEl={anchorEl}
                                                            open={drops == head.headTrans}
                                                            onClose={() => {
                                                                handleClose();
                                                                if (drops == head.headTrans) {
                                                                    setdrops('')
                                                                } else {
                                                                    setdrops(head.headTrans);
                                                                }
                                                            }}
                                                            MenuListProps={{
                                                                'aria-labelledby': 'basic-button',
                                                            }}
                                                        >
                                                            {head.search ? <MenuItem>
                                                                <input
                                                                    id={`${head.headTrans}${tableName}${head.eleName}`}
                                                                    onInput={(e: any) => {
                                                                        dispatch(ClmSearch(head.eleName, e.target.value))
                                                                    }} type='search' placeholder='search' className='inside_search' />
                                                            </MenuItem> : null}
                                                            {head.filter &&
                                                                <div className='FilterItems'>
                                                                    {head.filterData?.values && head.filterData.values.map((w: any, i: any) => {
                                                                        return <MenuItem className='clkIgnr' key={`eleCheck-${w}-${i}`}>
                                                                            <input id={`${head.eleName}${w}status-check-box`} onChange={(e) => {
                                                                                dispatch(filterAction(head.filterData?.element, w, e.target.checked))
                                                                            }} className='clkIgnr check-Box status-check-box' type="checkbox" />
                                                                            <label htmlFor={`${head.eleName}${w}status-check-box`} className='clkIgnr span-label'>{w}</label>
                                                                        </MenuItem>
                                                                    })}
                                                                </div>
                                                            }
                                                            {head.sort ? <MenuItem onClick={() => { dispatch(sortAction(head, 1)) }} ><ArrowUpwardRoundedIcon />Sorting Ascending (A-Z)</MenuItem> : null}
                                                            {head.sort ? <MenuItem onClick={() => { dispatch(sortAction(head, -1)) }} ><ArrowDownwardRoundedIcon />Sorting Descending (Z-A)</MenuItem> : null}
                                                            <MenuItem onClick={() => {
                                                                dispatch(clearFilterClm(head.eleName))
                                                                if (head.search) {
                                                                    const m: any = document.getElementById(`${head.headTrans}${tableName}${head.eleName}`);
                                                                    m.value = ''
                                                                }
                                                                if (head.filter) {
                                                                    head.filterData.values.map((w: any, i: any) => {
                                                                        const m: any = document.getElementById(`${head.eleName}${w}status-check-box`);
                                                                        m.checked = false
                                                                    })
                                                                }
                                                            }}>CLEAR</MenuItem>
                                                        </Menu>
                                                    </div>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </StyledTableCell>
                            ))}
                            {(filterValues.length != 0 || `${filterValues.map((d: any) => d.values.length).filter((d: any) => d != 0).length}` != `0`) &&
                                <StyledTableCell align="right" >
                                    <Button onClick={() => { dispatch(clearAllfilter()) }} className="th_wrapper">
                                        <span className='clear-filters'>&nbsp; &nbsp; &nbsp;Clear all filters &nbsp; &nbsp; &nbsp;</span>
                                    </Button>
                                </StyledTableCell>
                            }
                        </TableRow>


                        {data &&
                            data.map((item: any, ip: any) => (
                                <TableRow
                                    id="table-data"
                                    key={`${item.id}-${ip}`}
                                >
                                    <TableCell component="th" scope="row" className={`onlySVG ${item.icon}`} style={{ width: '90px' }}>
                                        {item.iconEle &&
                                            <a href="#/">
                                                <span className={item.icon}>
                                                    <item.iconEle />
                                                </span>
                                            </a>
                                        }
                                    </TableCell>
                                    {columnsDropdown.map((clm: any, index: any) => (
                                        !hiddenClms.includes(clm.eleName) &&
                                        <>
                                            <Tooltip
                                                title={
                                                    getoverFlowwithWidth(item[clm.eleName], 70) ? item[clm.eleName] : ''
                                                }
                                                placement="bottom-start"
                                                followCursor
                                            >
                                                <TableCell
                                                    id={`tbl-clms${index}`}
                                                    className={`table-cell-tooltip ${item.icon}`}
                                                    key={`tbl-clm${index}-${ip}`}
                                                    style={{
                                                        width: 160,
                                                    }}
                                                    align="right"
                                                >
                                                    <span id={`tbl-clm${index}-${ip}`} className='tdContent' style={{ display: 'block' }}>{item[clm.eleName]}{' '} </span>
                                                </TableCell>
                                            </Tooltip>
                                        </>
                                    ))}
                                    {hiddenClms.map((c: any, i: any) => {
                                        return <TableCell key={`magickey${i}-${ip}`} align="right" className={`${item.icon}`}>
                                        </TableCell>
                                    })}
                                    <TableCell align="right" className={`${item.icon}`}>
                                        <ul className="actionButtons">
                                            {item.actionItems.map((c: any, ind: any) => {
                                                return <c.actionFragment key={`${ind}act-${ip}`} item={item} />
                                            })}
                                        </ul>
                                    </TableCell>



                                </TableRow>



                            ))}

                        <TableRow
                            id="table-data"
                            key={"No Records"}
                        >

                            {data && data.length == 0 && (< TableCell colSpan={columnsDropdown.length + 2} component="th" scope="row" className={`noRecords`}>
                                <div className='noRecords'>no record</div>
                            </TableCell>)
                            }


                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    )
}
export default DataTable
