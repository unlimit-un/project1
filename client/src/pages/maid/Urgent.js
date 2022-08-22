import { faWarning,faPencil,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState,Suspense, useEffect} from 'react'
import { CardFillColorNonFooter } from '../../components/Cards';
import { MuiTable, TablesStriped } from '../../components/Tables';
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily';
import { EditDelete,Delete } from '../../components/EditDelete';
import { geturgentData, Updateurgent } from '../../controllers/maid/UngentControllers';
import { ModalCardConfirm } from '../../components/Modals';

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../components/Cards'))
const Urgent = () => {
  const [name,setName] = useState('');


  const [dataTableData ,setDataTableData] = useState ([]);
  const loadungentData = async () =>{
    const ungentDataTable = await geturgentData ()
    setDataTableData(ungentDataTable)
    console.log(ungentDataTable);
  }
  

  useEffect (()=>{
    loadungentData();
    
  },[])
  const dataTable = {
    data:[
      ...dataTableData.map(item => {
        return {
          
          description:item['type'],
          location:item['location_name'],
          date_time:item['date_time'],
          ED:<Delete DeleteFnc = {async()=>{
            const bool = await Updateurgent ({urgent_id:item['urgent_id']})
            if (bool) {
              loadungentData()
            }
          }}
          />
        }
      })
      
        
    ],
    columns:[
      
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
      <ModalCardConfirm 
        confrimCallback={async()=>{
          await loadungentData ()
        }}
      />
    </>
    

  )
    
    
}

export default Urgent