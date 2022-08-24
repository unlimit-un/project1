import { faScrewdriverWrench,faPencil,faTrash, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { lazily } from 'react-lazily'
import { Skeleton } from '../../components/Loading'
import { EditDelete } from '../../components/EditDelete'
import { CardFillColorNonFooter } from '../../components/Cards'
import { deleteMaterial, getMaterialByManagerId, insertMaterial } from '../../controllers/manager/MaterialController'
import { InputGroupWithLabel } from '../../components/FormElements'
import { ModalCardConfirm } from '../../components/Modals'
// import { FilterTable } from '../../components/Tables'
const { MuiTable } = lazily(()=>import('../../components/Tables'))
const Material = () => {

  const [dataTableMaterial, setDataTableMaterial] = useState([])
  const [importDate, setImportDate] = useState('');
  const refCode = useRef(null);
  const refName = useRef(null);
  const refCount = useRef(null);

  const refCodeModal = useRef(null);
  const refNameModal = useRef(null);
  const refCountModal = useRef(null);
  const refUsingModal = useRef(null);
  const refMaidModal = useRef(null);
  const refEnModal = useRef(null);
  const [importDateModal, setImportDateModal] = useState('');

  const [modalShow, setModalShow] = useState(false)

  const loadData = async () =>{
    const dataTable = await getMaterialByManagerId();

    setDataTableMaterial(dataTable)
  }

  useEffect(()=>{
    loadData()
  },[])

  const reState = () =>{
    setImportDate('')
    refCode.current.value = ''
    refName.current.value = ''
    refCount.current.value = ''
    loadData()
  }
  // code, name, quantity, using, import, maid, en
  const modal = {
    mHead: <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faPencil}/> แก้ไขข้อมูลวัสดุครุภัณฑ์</h1>,
    mBody: (
      <>
        <div className="row" >
          <div className="col-md-4 col-12">
            <InputGroupWithLabel ref={refCodeModal} label="รหัสวัสดุครุภัณฑ์" placeholder="รหัสวัสดุครุภัณฑ์" id="material_code"/>
          </div>
          <div className="col-md-4 col-12">
            <InputGroupWithLabel ref={refNameModal} label="ชื่อวัสดุครุภัณฑ์" placeholder="ชื่อวัสดุครุภัณฑ์" id="material_code"/>
          </div>
          <div className="col-md-4 col-12">
            <InputGroupWithLabel ref={refCountModal} label="จำนวน" placeholder="จำนวน" id="material_code"/>
          </div>
          <div className="col-md-4 col-12">
            <InputGroupWithLabel label="วันที่นำเข้า" placeholder="วันที่นำเข้า" id="material_code" type="date" callback={({target:{value}})=>{setImportDateModal(value)}}/>
          </div>
          <div className="col-md-4 col-12">
            <InputGroupWithLabel ref={refUsingModal} label="จำที่ถูกใช้" placeholder="จำที่ถูกใช้" id="material_code"/>
          </div>
          {/* end of today */}
          <div className="col-md-4 col-12">
            <InputGroupWithLabel ref={refMaidModal} label="รหัสวัสดุครุภัณฑ์" placeholder="รหัสวัสดุครุภัณฑ์" id="material_code"/>
          </div>
          <div className="col-md-4 col-12">
            <InputGroupWithLabel ref={refEnModal} label="รหัสวัสดุครุภัณฑ์" placeholder="รหัสวัสดุครุภัณฑ์" id="material_code"/>
          </div>
        </div>
      </>
    ),
  }

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
          ED:<EditDelete 
            EditFnc={()=>{}}
            DeleteFnc={async ()=>{
              if(await deleteMaterial({material_id: item['material_id']})) await reState();
            }}
            setModalShow={setModalShow}
            /> 
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
            <form>
              <div className="flex flex-column justify-center">
                <h3>เพิ่มรายการวัสดุครุภัณฑ์</h3>
                  <div className="row" >
                    <div className="col-md-4">
                      <InputGroupWithLabel ref={refCode} label="รหัสวัสดุครุภัณฑ์" placeholder="รหัสวัสดุครุภัณฑ์" id="material_code"/>
                    </div>
                    <div className="col-md-4">
                      <InputGroupWithLabel ref={refName} label="ชื่อวัสดุครุภัณฑ์" placeholder="ชื่อวัสดุครุภัณฑ์" id="material_name"/>
                    </div>
                    <div className="col-md-4">
                      <InputGroupWithLabel ref={refCount} label="จำนวน" placeholder="จำนวน" id="material_quantity"/>
                    </div>
                    <div className="col-md-4">
                      <InputGroupWithLabel label="รหัสวัสดุครุภัณฑ์" placeholder="รหัสวัสดุครุภัณฑ์" id="material_code" type="date" callback={({target:{value}})=>{setImportDate(value)}}/>
                    </div>
                  </div>
              </div>
              <div className="flex justify-end mt-4">
                <button className="btn btn-success w-25" onClick={async (e)=>{
                  e.preventDefault();
                  const formData = {
                    material_code: refCode.current.value, 
                    material_name: refName.current.value, 
                    material_quantity: refCount.current.value,
                    import_date : importDate
                  }
                  if(await insertMaterial(formData)) await reState();
                }}><FontAwesomeIcon icon={faSave}/> บันทึก</button>
              </div>
            </form>
          </div>
          <div className="mt-3">
            <Suspense fallback= {<Skeleton/>}> 
              <CardFillColorNonFooter contentBody={<MuiTable data={muiData.data} columns={muiData.columns} title="ตารางวัสดุครุภัณฑ์"/>}/>
            </Suspense> 
            <ModalCardConfirm hideCallback={reState} cancleCallback={reState} confrimCallback={()=>{}} modalBody={modal.mBody} modalHead={modal.mHead} modalShow={modalShow} setModalShow={setModalShow}/>
          </div>
        </div>
    </>
  )
}

export default Material