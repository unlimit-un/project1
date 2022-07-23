import React, { useEffect, useRef, useState } from 'react'
// import MaterialTable from "material-table";
import { forwardRef } from 'react';
import ReactDOM from "react-dom";
import MaterialTable, { MaterialTableProps } from "material-table";

import { TableCell, TablePagination, TablePaginationProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { 
    AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList,
    FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn
} from '@material-ui/icons';

export const TablesStriped = ({data}) => {
  return (
    <>
    
        <table className="table table-striped">
            <thead>
                <tr>
                    {
                        data.thead.map((item, i)=><th key={i}>{item}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.tbody.map((item, index)=>{
                        return(
                            <tr key={index}>
                                {item.map((subitem, i)=><td key={i}>{subitem}</td>)}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </>
  )
}

export const TablesStripedDataTable = ({data, id}) => {
    
    
    return (
        <>
            
        </>
    )

}



export const MuiTable = ({columns, data}) =>{
  
  const PatchedPagination = (props) =>{
    const {
      ActionsComponent,
      onChangePage,
      onChangeRowsPerPage,
      ...tablePaginationProps
    } = props;

    return(
      <TablePagination
        {...tablePaginationProps}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        ActionsComponent={(subprops) => {
          const { onPageChange, ...actionsComponentProps } = subprops;
          return (
            <ActionsComponent
              {...actionsComponentProps}
              onChangePage={onPageChange}
            />
          );
        }}
      />
    )
  }
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  
  return(
      <>
          <MaterialTable 
            data={data}
            columns={columns}
            icons={tableIcons}
            components={{
              Pagination: PatchedPagination,
              Cell: <TableCell align='center'/>
            }}
            style={{boxShadow:"none", textAlign: "center"}}
            title="ตารางวัสดุครุภัณฑ์"
          />
      </>
  )
}
