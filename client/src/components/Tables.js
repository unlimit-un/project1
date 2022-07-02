import React from 'react'

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
