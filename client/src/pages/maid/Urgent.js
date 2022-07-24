import { faWarning,faPencil,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState,Suspense} from 'react'
import { CardFillColorNonFooter } from '../../components/Cards';
import { TablesStriped } from '../../components/Tables';
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily';

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../components/Cards'))
const Urgent = () => {
  const [name,setName] = useState(''); 
  const dataTable = {
    thead:['รหัส','รายละเอียดงาน','สถานที่','เวลา'],
    tbody:[
      ['A','B','C','11.00',
      <div className="flex justify-center gap-2">
        <button className="text-warning"><FontAwesomeIcon icon={faPencil}/></button>
        <button className="text-danger"><FontAwesomeIcon icon={faTrash}/></button>
    </div>
    ]
    ]
  }
 
    const contentBody = (
      <>
          <div className="container-fluid">
              <h1 className="text-xl"><FontAwesomeIcon icon={faWarning}/> งานด่วน</h1>
              <hr />
              <Suspense fallback={<Skeleton/>}>
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<TablesStriped data={dataTable} id="_table1"/>}/>
              </Suspense>
          </div>
      </>
  )
  return (
    <>
      <CardFillColorNonFooter contentBody={contentBody}/>
    </>
    

  )
    
    
}

export default Urgent