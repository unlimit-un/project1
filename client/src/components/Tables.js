import React from 'react'

export const TablesStriped = ({data}) => {
    
  return (
    <>
        <table className="table table-striped">
            <thead>
                <tr>
                    {
                        data.thead.map(item=><th>{item}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.tbody.map(item=>{
                        return(
                            <tr>
                                {item.map(subitem=><td>{subitem}</td>)}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </>
  )
}
