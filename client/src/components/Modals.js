import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export const ModalCard = ({modalHead, modalBody, modalShow, setModalShow}) => {
  return (
    <>
        <Modal
            show={modalShow}
            onHide={()=>setModalShow(false)}
            size="lg"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title>
                {modalHead}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {modalBody}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={()=>setModalShow(false)}>Close</Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export const ModalCardConfirm = ({modalHead, modalBody, modalShow, setModalShow, confrimCallback, cancleCallback}) => {
  return (
    <>
        <Modal
            show={modalShow}
            onHide={()=>setModalShow(false)}
            size="lg"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title>
                {modalHead}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {modalBody}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={async ()=>{await cancleCallback(); await setModalShow(false);}}>Close</Button>
            <Button variant="primary" onClick={async ()=>{await confrimCallback(); await setModalShow(false);}}>OK</Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export const ModalButton = ({setModalShow, icon, text ,classBtn}) =>{
    if (!classBtn) {
        classBtn = 'btn btn-outline-primary !text-sm w-1/2'
    }
    return (
        <>
            {
                icon?<button className={classBtn} onClick={()=>setModalShow(true)}><FontAwesomeIcon icon={icon}/>{text}</button>:
                <button className={classBtn} onClick={()=>setModalShow(true)}>{text}</button>
            
            }
        </>
    )
}
