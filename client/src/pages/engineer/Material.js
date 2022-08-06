import { faBox, faCopy, faEye, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense, useEffect, useState } from 'react'
import { Bandage } from '../../components/Bandage'
import { CardFillColorNonFooterShadow } from '../../components/Cards'
import { Delete } from '../../components/EditDelete'
import { InputGroupWithLabel, Radio, RadioInline, SelectOptionWithLabel } from '../../components/FormElements'
import { ModalButton, ModalCard, ModalCardConfirm } from '../../components/Modals'
import { lazily } from "react-lazily";
import { Skeleton } from '../../components/Loading'
import { deleteOrderMaterial, getMaterialeData, getMaterialOfUser, insertOrderMaterial } from '../../controllers/engineer/Materialcontrollers'
import { Modal } from 'react-bootstrap'

const { MuiTable } = lazily(()=>import('../../components/Tables'))

const Material = () => {
    const [modalShow, setModalShow] = useState(false)
    const [modalConfirmShow, setModalConfirmShow] = useState(false)
    const [modal, setModal] = useState({mHead: (<></>),mBody: (<></>)})
    const [muiDataTable, setMuiDataTable] = useState([]);
    const [typeInsert, setTypeInsert] = useState('');
    const [materialInsert, setMaterialInsert] = useState('');
    const [countInsert, setCountInsert] = useState('');
    const [unitPriceInsert, setUnitPriceInsert] = useState('');
    
    const loadMaterialTable = async () =>{
        const materialData = await getMaterialeData();
        setMuiDataTable(materialData)
    }

    useEffect(()=>{
        loadMaterialTable();
    },[])
  
    const MuiTableData = {
        data: [
            ...muiDataTable.map(item=>{
            return{
                order_id: item['material_code'], 
                import_date: item['order_date'], 
                list_item: item['material_name'], 
                count: item['quantity'],
                unit_price: item['unit_price'],
                total_price: item['total_price'],
                status: item['note'], 
                ED:<Delete DeleteFnc={async()=>{
                    const bool = await deleteOrderMaterial({order_material_id: item['order_id']});
                    if(bool) await loadMaterialTable();
                }}/>,
                view:<ModalButton callback={()=>handleView(setModal)} classBtn="btn btn-outline-primary" setModalShow={setModalShow} icon={faEye}/> 
            }
        })],
        columns: [
            {title: "",field: "ED"},
            {title: "รหัส",field: "order_id", },
            {title: "รายการ",field: "list_item",},
            {title: "จำนวน",field: "count", type: "numeric"},
            {title: "ราคาต่อหน่วย",field: "unit_price", type: "numeric"},
            {title: "ราคารวม",field: "total_price", type: "numeric"},
            {title: "วันที่นำเข้า",field: "import_date", },
            {title: "สถานะ",field: "status", 
                lookup:{
                    waiting: "รออนุมัติ", 
                    accept:"อนุมัติ", 
                    deny:"ไม่อนุมัติ",
                }
            },
            {title: "",field: "view"},
        ]
    }
  
    const tableMaterial = (
        <>
        <Suspense fallback={<Skeleton/>}>
            <MuiTable data={MuiTableData.data} columns={MuiTableData.columns} title="ตารางคำสั่งซื้อครุภัณฑ์"/>
        </Suspense>
        </>
    )

    const resetState = () =>{
        setCountInsert('');
        setMaterialInsert('');
        setTypeInsert('');
        setUnitPriceInsert('');
    }

    const handleShowAdd = async () =>{
        const materialOfUser = await getMaterialOfUser();
        const arr_opt_material = [
            {value: '', text:'กรุณาเลือกข้อมูล'},
            ...materialOfUser.map(item=>{
                return {value: item['material_id'], text: `${item['material_code']}-${item['material_name']}`}
            })
        ]
        
        const formStockFunc = () =>{
            setModal({
                mHead: (
                    <>
                        <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faBox}/> ยื่นเรื่องสั่งซื้อ</h1>
                    </>
                ),
                mBody:(
                    <>
                        <div className="flex gap-2">
                            <RadioInline 
                                callback={({target:{value}})=>{
                                        formStockFunc();  
                                        setTypeInsert(value)
                                    }
                                }  
                                id="fromStock" label="รายการที่มีในคลัง" name="typeInsert" value="1"
                            />
                            <RadioInline 
                                callback={({target:{value}})=>{
                                        noStockFunc();  
                                        setTypeInsert(value)
                                    }
                                } 
                                id="noStock" label="รายการใหม่" name="typeInsert" value="0"
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-12">
                                <SelectOptionWithLabel options_arr_obj={arr_opt_material} label="รายการวัสดุครุภัณฑ์" callback={({target:{value}})=>{setMaterialInsert(value)}}/>
                            </div>
                            <div className="col-md-4 col-12">
                                <InputGroupWithLabel id="input_count" placeholder="จำนวน" label="จำนวน" callback={({target:{value}})=>{setCountInsert(value)}}/>
                            </div>
                            <div className="col-md-4 col-12">
                                <InputGroupWithLabel id="input_unit_price" placeholder="ราคาต่อหน่วย" label="ราคาต่อหน่วย" callback={({target:{value}})=>{setUnitPriceInsert(value)}}/>
                            </div>
                        </div>
                    </>
                )}
            )
        }

        const noStockFunc = () =>{
            setModal({ 
                mHead: (
                    <>
                        <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faBox}/> ยื่นเรื่องสั่งซื้อ</h1>
                    </>
                ),
                mBody:(
                    <>
                        <div className="flex gap-2">
                            <RadioInline 
                                callback={({target:{value}})=>{
                                        formStockFunc();  
                                        setTypeInsert(value)
                                    }
                                }   
                                id="fromStock" label="รายการที่มีในคลัง" name="typeInsert" value="1" 
                            />
                            <RadioInline 
                                callback={({target:{value}})=>{
                                        noStockFunc();  
                                        setTypeInsert(value)
                                    }
                                } 
                                id="noStock" label="รายการใหม่" name="typeInsert" value="0"
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-12">
                                <InputGroupWithLabel id="input_material" placeholder="วัสดุครุภัณฑ์ที่ต้องการสั่ง" label="ชื่อวัสดุครุภัณ์" callback={({target:{value}})=>{setMaterialInsert(value)}}/>
                            </div>
                            <div className="col-md-4 col-12">
                                <InputGroupWithLabel id="input_count" placeholder="จำนวน" label="จำนวน" callback={({target:{value}})=>{setCountInsert(value)}}/>
                            </div>
                            <div className="col-md-4 col-12">
                                <InputGroupWithLabel id="input_unit_price" placeholder="ราคาต่อหน่วย" label="ราคาต่อหน่วย" callback={({target:{value}})=>{setUnitPriceInsert(value)}}/>
                            </div>
                        </div>
                    </>
                )
            })
        }

        setModal({
            mHead: (
                <>
                    <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faBox}/> ยื่นเรื่องสั่งซื้อ</h1>
                </>
            ),
            mBody:(
                <>
                    <div className="flex gap-2">
                        <RadioInline 
                            callback={({target:{value}})=>{
                                    formStockFunc();  
                                    setTypeInsert(value);
                                }
                            } 
                            id="fromStock" label="รายการที่มีในคลัง" name="typeInsert" value="1"
                        />
                        <RadioInline 
                            callback={({target:{value}})=>{
                                    noStockFunc()
                                    setTypeInsert(value)
                                }
                            } 
                            id="noStock" label="รายการใหม่" name="typeInsert" value="0"
                        />
                    </div>
                </>
            )}
        )
        
    }

    const formData = {typeInsert, materialInsert, countInsert, unitPriceInsert}
    console.log(formData);
    return (
        <>
            <h1 className="text-2xl"><FontAwesomeIcon icon={faBox}/> สั่งซื้อครุภัณฑ์</h1>
            <div className="flex justify-end">
                <ModalButton icon={faPlus} text="ยื่นเรื่องสั่งซื้อ" classBtn="btn btn-outline-primary" callback={()=>handleShowAdd()} setModalShow={setModalConfirmShow}/>
            </div>
            <div className="mt-3">
                <CardFillColorNonFooterShadow contentBody={tableMaterial}/>
            </div>

            {/* modal */}
            <ModalCard modalShow={modalShow} setModalShow={setModalShow} modalHead={modal.mHead} modalBody={modal.mBody} btnOkText="บันทึก" />
            <ModalCardConfirm hideCallback={resetState} cancleCallback={resetState} confrimCallback={()=>{insertOrderMaterial(formData); resetState(); loadMaterialTable();}} modalShow={modalConfirmShow} setModalShow={setModalConfirmShow} modalHead={modal.mHead} modalBody={modal.mBody} btnOkText="บันทึก" />
        </>
    )
}


const handleView = (setModal) =>{
  setModal({
      mHead: (
          <>
              <h1 className="m-0 text-2xl"><FontAwesomeIcon icon={faCopy}/> รายละเอียดคำสั่งซื้อ</h1>
          </>
      ),
      mBody: (
          <>
              <div className="row">
                  <div className="col-lg-3 col-md-4 col-12">
                      <ul>
                          <li>ปัญหา</li>
                          <li>ผู้แจ้ง</li>
                          <li>วันที่แจ้ง</li>
                          <li>สถานที่</li>
                          <li>ห้อง</li>
                          <li>สถานะ</li>
                      </ul>
                  </div>
                  <div className="col-lg-9 col-md-8 col-12">
                      <ul className="gap-2">
                          <li>อ่างล้างหน้าพัง</li>
                          <li>unlimit unarn</li>
                          <li>2022-02-21</li>
                          <li>ตึก A</li>
                          <li>A202</li>
                          <li>"กำลังดำเนินการ"</li>
                      </ul>
                  </div>
              </div>
          </>
      )
  })
}

export default Material