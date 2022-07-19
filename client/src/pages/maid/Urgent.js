import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState} from 'react'
import { CardFillColorNonFooter, CardFillColorNonFooterShadow } from '../../components/Cards';
import { TablesStripedDataTable } from '../../components/Tables';

const Urgent = () => {
  const [name,setName] = useState(''); 
  const dataTable = {
    thead:['รหัส','รายละเอียดงาน','สถานที่','เวลา'],
    tbody:[
      ['A','B','C','11.00']
    ]
  }
 
    const contentBody = (
      <>
          <div className="container-fluid">
              <h1 className="text-xl"><FontAwesomeIcon icon={faWarning}/> งานด่วน</h1>
              <hr />
             
              <CardFillColorNonFooterShadow classCard="mt-4" contentBody={<TablesStripedDataTable data={dataTable} id="_table1"/>}/>
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