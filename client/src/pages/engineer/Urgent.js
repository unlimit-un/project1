import { faWarning,faPencil,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState,Suspense, useEffect} from 'react'
import { CardFillColorNonFooter } from '../../components/Cards';
import { MuiTable, TablesStriped } from '../../components/Tables';
import { Skeleton } from '../../components/Loading'
import { lazily } from 'react-lazily';
import { Delete, EditDelete } from '../../components/EditDelete';
import { geturgentData, updateurgentById } from '../../controllers/engineer/UrgentControllers';

const { CardFillColorNonFooterShadow } =lazily(()=>import('../../components/Cards'))
const Urgent = () => {
  const [name,setName] = useState(''); 

  const [DataTableData,setDataTableData] = useState ([]);
  const loadurgentData = async () =>{
    const urgentDataTable = await geturgentData ()
    setDataTableData(urgentDataTable)
    console.log(urgentDataTable);
  }

  useEffect (()=>{
    loadurgentData();
  },[])

  const dataTable = {

    data:[
     ...DataTableData.map(item => {
        return {
          description:item['type'],
          location:item['location_name'],
          date_time:item['date_time'],
          ED:<Delete
          DeleteFnc={async()=>{
            const bool = await updateurgentById({
              urgent_id: item['urgent_id']})
              if (bool) await loadurgentData()
            }}
            
          />,
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
    </>
    

  )
    
    
}

export default Urgent