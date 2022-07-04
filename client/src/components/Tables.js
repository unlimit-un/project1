import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery';
import 'datatables.net';

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

export const TablesStripedDataTable = ({data}) => {
    const dataTable = new Promise((res, rej)=>{
        $('#tableStriped').dataTable().fnDestroy()
        res();
    }).then(()=>{
        return $('#tableStriped').dataTable({
            "dom": 'lrtip',
            "bDestroy": true
        })
    })
    
    return (
        <>
            <input type="search" className="form-control max-w-xs mb-2 ms-auto" placeholder="Search" autoComplete="off" id="serchDataTable" 
            onChange={({target:{value}})=>{ 
                dataTable.then(data=>data.fnFilter(value)) 
                }} 
            />
            <div className="overflow-auto">
                <table className="table table-striped text-center" id="tableStriped">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
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
                                        <td>{index+1}</td>
                                        {item.map((subitem, i)=><td key={i}>{subitem}</td>)}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )

}
