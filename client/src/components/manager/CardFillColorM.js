import React, { useState } from 'react'

const CardFillColorM = ({title, subTitle, caption, color}) => {

    const [classColor,setClassColor] = useState({
        body: `card-body bg-${color}-400`,
        footer: `card-footer !bg-${color}-600 text-center`,
    })
    return (
        <>
            <div className="card text-white">
                <div className={classColor.body}>
                    <p className="m-0 text-3xl">{title}</p>
                    <p className="m-0 text-md">{subTitle}</p>
                </div>
                <div className={classColor.footer}>
                    <p className="m-0 ">{caption}</p>
                </div>
            </div>
        </>
    )
}

export default CardFillColorM