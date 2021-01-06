import React, {useState }from "react";
import './styles.css';

import Paper from '@material-ui/core/Paper'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { TableHead, TablePagination, TableSortLabel,IconButton} from "@material-ui/core";
import Notification from "../../../components/Notification";
import CloseIcon from "@material-ui/icons/Close";

import {deleteUser} from '../../../action/userlist'
import {SearchTool} from "../../../components/Input";
import ConfirmDialog from "../../../components/ConfirmDialog";

const headCells=[
    {id:'username',label:'Username'},
    {id:'email',label:'Email Address'},
    {id:'actions', label:'Remove',disableSorting:true}
]

const pages=[5,10,25]

//class UserForm extends React.Component
export default function DataTable(props) {
        const pages = [5,10,25]
        const {users, queueComponent}=props;

        //queueComponent={this}
        //const [users, setUserList]=useState(props.users);
        const [page, setPage] = useState(0);
        const [rowPerPage, setRowPerPage]=useState(pages[page]);
        const [order, setOrder]=useState();
        const [orderBy, setOrderBy] =useState();
        const [filterFn, setfilterFn]=useState({fn: items=>{return items}});
        const [notify, setNotify] =useState({isOpen:false, message:'', type:''});
        const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle: ''})

        var search=""

        const handleChangePage =(event, newpage) =>{
            setPage(newpage)
        }

        const handleChangeRowsPerPage=(event)=>{
            setRowPerPage(parseInt(event.target.value,10))
            setPage(0)
        }

        function sort(array, comparator){
            const sortedItems=array.map((ele, index)=>[ele, index]);
            sortedItems.sort((a,b)=>{
                const order=comparator(a[0],b[0]);
                if(order!==0) return order;
                return a[1] - b[1];
            });
            return sortedItems.map(ele=>ele[0]);
        }

        function getComparator(order, orderBy){
            return order==='asc' 
                ? (a,b)=>-ascendingComparator(a,b,orderBy)
                : (a,b)=>ascendingComparator(a,b,orderBy)
        }

        function ascendingComparator(a,b,orderBy){
            if(a[orderBy]>b[orderBy] || (a[orderBy]==='' && b[orderBy]!=='')){
                return 1;
            } else if(a[orderBy]<b[orderBy] || (a[orderBy]!=='' && b[orderBy]==='')){
                return -1;
            }else{
                return 0;
            }
        }

        const recordsAfterPages=()=>{
            return sort(filterFn.fn(users), getComparator(order, orderBy)).slice(page*rowPerPage,(page+1)*rowPerPage)
        }

        const handleSortRequest=(headerId)=>{
            const isDes = orderBy===headerId && order==='asc'
            setOrder(isDes ? 'desc' :'asc')
            setOrderBy(headerId)
        }

        const handleSearch = e =>{
            setfilterFn({
                fn: items=>{
                    return items.filter(
                        function(item){
                            if(item.username.includes(e) || item.email.includes(e)) return true;
                            else return false;
                        }
                    )
                }
            })
        }

        const handleCancleSearch =()=>{
            setfilterFn({
                fn: items=>{
                    return items;
                }
            })
        }

        const onDelete= id =>{
            setConfirmDialog({
                ...confirmDialog,
                isOpen:false
            })
            deleteUser(queueComponent,id);
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error'
            })
        }

        return (
            <div style={{ height: 400, width: '100%' }}>
                <Notification 
                    notify={notify}
                    setNotify={setNotify}
                />
                <ConfirmDialog 
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
                <Paper className='usertable_paper'>
                    <SearchTool 
                        value={search}
                        onChange={handleSearch}
                        onCancelSearch={handleCancleSearch}
                    />
                    <Table className='userTable'>
                        <TableHead className='userTable_Head'>
                            <TableRow>
                                {
                                    headCells.map(headCell =>(
                                        <TableCell className='userTableCell-header' key={headCell.id}
                                                sortDirection={orderBy===headCell.id ? order :false}>
                                            {headCell.disableSorting ? headCell.label :
                                            <TableSortLabel
                                                 active={orderBy===headCell.id} 
                                                 direction={orderBy===headCell.id ? order : 'asc'}
                                                 onClick={()=>{handleSortRequest(headCell.id)}}>
                                                {headCell.label}
                                            </TableSortLabel>
                                            }
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recordsAfterPages().map(user => (
                                <TableRow className='userTableRow-body' key={user.id}>
                                    <TableCell className='userTableCell-body'>{user.username}</TableCell>
                                    <TableCell className='userTableCell-body'>{user.email}</TableCell>
                                    <TableCell>
                                        <IconButton 
                                            color="secondary"
                                            onClick={()=>{
                                                setConfirmDialog({
                                                    isOpen:true,
                                                    title: 'Are you sure to remove this user?',
                                                    subTitle: "You can't undo this operation.",
                                                    onConfirm:()=>{onDelete(user._id)},
                                                    onCancle:()=>{setConfirmDialog({...confirmDialog, isOpen:false})},
                                                })
                                                //onDelete(user.id)
                                            }}>
                                            <CloseIcon fontSize='smaill'/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination component='div' page={page} 
                                     rowsPerPageOptions={pages} rowsPerPage={rowPerPage} count={users.length}
                                     onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage}>
                    </TablePagination>
                  {/* <DataGrid rows={users} columns={columns} pageSize={5} rowCount={this.props.users.length} checkboxSelection /> */}
                </Paper>
            </div>
        );
    }

    //Reference: https://github.com/CodAffection/React-Material-UI-Table-Paging-Sorting-and-Filtering.

