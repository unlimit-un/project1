import { faScrewdriverWrench,faPencil,faTrash, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense, useEffect, useState } from 'react'
import { lazily } from 'react-lazily'
import { Skeleton } from '../../components/Loading'
import { EditDelete } from '../../components/EditDelete'
import { CardFillColorNonFooter } from '../../components/Cards'
import { getMaterialByManagerId } from '../../controllers/manager/MaterialController'
// import { FilterTable } from '../../components/Tables'
const { MuiTable } = lazily(()=>import('../../components/Tables'))
const Material = () => {

  const [dataTableMaterial, setDataTableMaterial] = useState([])

  const loadData = async () =>{
    const dataTable = await getMaterialByManagerId();

    setDataTableMaterial(dataTable)
  }

  useEffect(()=>{
    loadData()
  },[])

  const muiData = {
    data:[
      ...dataTableMaterial.map(item=>{
        return { 
          id: item['material_code'], 
          list_name: item['material_name'], 
          count: item['material_quantity'], 
          using: item['material_using'],
          import_date: item['import_date'], 
          import_person: item['importer_name'], 
          status_person: item['importer_role'], 
          ED:<EditDelete/> 
        }
      })
    ],
    columns:[
      {title: "รหัสครุภัณฑ์",field: "id"},
      {title: "รายการ",field: "list_name"},
      {title: "จำนวนทั้งหมด",field: "count" , type:"numeric"},
      {title: "จำนวนที่ถูกใช้",field: "using", type:"numeric"},
      {title: "วันที่นำเข้า",field: "import_date"},
      {title: "คนที่สั่ง",field: "import_person"},
      {title: "สถานะบุคคล",field: "status_person"},
      {title: "",field: "ED"},
    ]
  }

  return (
    <>
        <h1 className="text-2xl"><FontAwesomeIcon icon={faScrewdriverWrench}/> วัสดุครุภัณฑ์</h1>
        <div className="container-fluid">
          <div className="card card-body">
            <div className="flex flex-column justify-center">
              <h3>เพิ่มรายการวัสดุครุภัณฑ์</h3>
              <form>
                  <div className="row" >
                    <div className="col-sm-4">
                      <label htmlFor="validationCustom01" className="from-label">รหัส </label>
                      <input  className="form-control" id="input_id"  placeholder="" type="text" />
                    </div>
                    <div className="col-sm-4">
                      <label htmlFor="validationCustom02" className="from-label">ชื่อรายการ </label>
                      <input  className="form-control" id="input_name"  placeholder="" type="text" />
                    </div>
                    <div className="col-sm-4">
                      <label htmlFor="validationCustom03" className="from-label">จำนวน </label>
                      <input  className="form-control" id="input_quantity"  placeholder="" type="text" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                        <label htmlFor="validationCustom04" className="form-label">วันที่เพิ่มเข้าระบบ</label>
                        <input  className="form-control" placeholder="" type="date" /> 
                    </div>
                    <div className="col-sm-4">
                        <label htmlFor="validationCustom05" className="form-label ">วันที่ส่ง</label>
                        <input  className="form-control" placeholder="" type="date"/> 
                    </div>
                  </div>
              </form>
            </div>
            <div className="flex justify-end mt-4">
              <button className="btn btn-success w-25"><FontAwesomeIcon icon={faSave}/> เพิ่ม</button>
            </div>
          </div>
          <div className="mt-3">
            <Suspense fallback= {<Skeleton/>}> 
              <CardFillColorNonFooter contentBody={<MuiTable data={muiData.data} columns={muiData.columns} title="ตารางวัสดุครุภัณฑ์"/>}/>
            </Suspense>  
          </div>
        </div>
    </>
  )
}

export default Material