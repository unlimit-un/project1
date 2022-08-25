import { faScrewdriverWrench,faPencil,faTrash, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { lazily } from 'react-lazily'
import { Skeleton } from '../../components/Loading'
import { EditDelete } from '../../components/EditDelete'
import { CardFillColorNonFooter } from '../../components/Cards'
import { deleteMaterial, getMaterialByManagerId, insertMaterial, updateMaterial } from '../../controllers/manager/MaterialController'
import { InputGroupWithLabel, SelectOptionWithLabel } from '../../components/FormElements'
import { ModalCardConfirm } from '../../components/Modals'
import { getMaidByManagerId, getMaterialById } from '../../controllers/manager/MaidDutyController'
import { getEngineerByManagerId } from '../../controllers/manager/ManageEmpController'
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
  const refImportDateModal = useRef(null);

  const [maidIdModal, setMaidIdModal] = useState('');
  const [engineerIdModal, setEngineerModal] = useState('');
  const [materialDefault, setMaterialDefault] = useState({
    material_code:'',
    material_name:'',
    material_quantity:'',
    material_using:'',
    import_date:'',
    material_id:''
  });

  const [options, setOptions] = useState({
    maid:[],
    engineer: []
  });

  const [modalShow, setModalShow] = useState(false)

  const loadData = async () =>{
    const dataTable = await getMaterialByManagerId();

    setDataTableMaterial(dataTable)
  }

  useEffect(()=>{
    loadData()
  },[])

  const showEditModal = async material_id =>{
    const [materialData] = await getMaterialById(material_id);
    const maidList = await getMaidByManagerId();
    const engineerList = await getEngineerByManagerId();

    setOptions({
      maid:[{text:'เลือกแม่บ้าน', value: ''}, ...maidList.map(item=>({value:item['maid_id'], text:`${item['maid_code']}-${item['maid_name']}`}))],
      engineer: [{text:'เลือกช่างซ่อม', value: ''}, ...engineerList.map(item=>({value:item['engineer_id'], text:`${item['engineer_code']}-${item['engineer_name']}`}))],
    })

    setMaterialDefault({
      import_date: materialData['import_date'],
      material_code: materialData['material_code'],
      material_name: materialData['material_name'],
      material_quantity: materialData['material_quantity'],
      material_using: materialData['material_using'],
      material_id: material_id
    })
    
    setEngineerModal(materialData['engineer_import_id']);
    setMaidIdModal(materialData['maid_import_id']);
  }

  const reState = () =>{
    setImportDate('')
    setMaterialDefault({
      material_code:'',
      material_name:'',
      material_quantity:'',
      material_using:'',
      import_date:'',
      material_id:''
    })
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
            <InputGroupWithLabel ref={refCodeModal} key={materialDefault.material_code} defaultValue={materialDefault.material_code} label="รหัสวัสดุครุภัณฑ์" placeholder="รหัสวัสดุครุภัณฑ์" id="material_code"/>
          </div>
          <div className="col-md-4 col-12">
            <InputGroupWithLabel ref={refNameModal} key={materialDefault.material_name} defaultValue={materialDefault.material_name} label="ชื่อวัสดุครุภัณฑ์" placeholder="ชื่อวัสดุครุภัณฑ์" id="material_code"/>
          </div>
          <div className="col-md-4 col-12">
            <InputGroupWithLabel ref={refCountModal} key={materialDefault.material_quantity} defaultValue={materialDefault.material_quantity} label="จำนวน" placeholder="จำนวน" id="material_code"/>
          </div>
          <div className="col-md-4 col-12">
            <InputGroupWithLabel ref={refUsingModal} key={materialDefault.material_using} defaultValue={materialDefault.material_using} label="จำที่ถูกใช้" placeholder="จำที่ถูกใช้" id="material_code"/>
          </div>
          <div className="col-md-4 col-12">
            <InputGroupWithLabel ref={refImportDateModal} key={materialDefault.import_date} defaultValue={materialDefault.import_date} label="วันที่นำเข้า" placeholder="วันที่นำเข้า" id="material_code" type="date"/>
          </div>
          {/*end of today */}
          <div className="col-md-4 col-12">
            <SelectOptionWithLabel required="" callback={({target:{value}}) =>{setEngineerModal(value); setMaidIdModal('')}}  disabled={maidIdModal?"disabled":""} options_arr_obj={options.engineer} label="รหัสช่างซ่อมที่นำเข้า" defaultValue={engineerIdModal} key={engineerIdModal}/>
          </div>
          <div className="col-md-4 col-12">
            <SelectOptionWithLabel required="" callback={({target:{value}}) =>{setMaidIdModal(value); setEngineerModal('')}}  disabled={engineerIdModal?"disabled":""} options_arr_obj={options.maid} label="รหัสแม่บ้านที่นำเข้า" defaultValue={maidIdModal} key={maidIdModal}/>
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
              EditFnc={()=>{
                showEditModal(item['material_id']);
              }}
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
            <ModalCardConfirm confrimCallback={async()=>{
              const formData = {
                import_date: refImportDateModal.current.value,
                material_code: refCodeModal.current.value,
                material_name: refNameModal.current.value,
                material_quantity: refCountModal.current.value,
                material_using: refUsingModal.current.value,
                material_id: materialDefault.material_id,
              }
              if (maidIdModal) {
                if(await updateMaterial({...formData, type:"maid", maid_import_id: maidIdModal,})) await reState();
              }else if(engineerIdModal){
                if(await updateMaterial({...formData, type:"engineer", engineer_import_id: engineerIdModal})) await reState();
              }else{
                if(await updateMaterial({...formData, type:"manager"})) await reState();
              }
            }} hideCallback={reState} cancleCallback={reState} modalBody={modal.mBody} modalHead={modal.mHead} modalShow={modalShow} setModalShow={setModalShow}/>
          </div>
        </div>
    </>
  )
}

export default Material