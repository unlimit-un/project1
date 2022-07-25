import { faWarning,faPencil,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState,Suspense} from 'react'
import { CardFillColorNonFooter } from '../../components/Cards';
import { MuiTable, TablesStriped } from '../../components/Tables';
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily';
import EditDelete from '../../components/EditDelete';

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../components/Cards'))
const Urgent = () => {
  const [name,setName] = useState(''); 
  const dataTable = {
    data:[
      {id:"A01",description:"event",location:"c05",date_time:"18.00",ED:<EditDelete/>}
    ],
    columns:[
      {title:"รหัส",field:"id"},
      {title:"รายละเอียดงาน",field:"description"},
      {title:"สถานที่",field:"location"},
      {title:"เวลา",field:"date_time"},
      {title:"",field:"ED"},
    ]
  }
 
    const contentBody = (
      <>
          <div className="container-fluid">
              <h1 className="text-xl"><FontAwesomeIcon icon={faWarning}/> งานด่วน</h1>
              <hr />
              <Suspense fallback={<Skeleton/>}>
                <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<MuiTable data={dataTable.data} columns={dataTable.columns} title=""/> }/>
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