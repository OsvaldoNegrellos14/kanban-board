/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import uuid from 'react-uuid'
import { Button, Card, Input, Spacer } from '@nextui-org/react'
import { CloseSquare } from 'react-iconly'

const FORMSTATE = {
  id: '',
  name: '',
  description: '',
  date: new Date().toLocaleString(),
  tag: 'casa',
  urgent: false
}

export const FormModal = (
  {
    show,
    onHide,
    // dataTable,
    setDataTable,
    // idStage,
    setTasks,
    indexStageTasks,
    stageTasks,
    dataTaskUpdate = FORMSTATE,
    update
  }
) => {
  const [formState, setFormState] = useState(dataTaskUpdate)
  const { id, name, description, date, tag } = formState
  const handleOnChange = ({ target }) => {
    setFormState({
      ...formState,
      date: new Date().toLocaleString(),
      [target.name]: target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (update) updateTask(id)
    else addNewTask()
  }

  const addNewTask = () => {
    stageTasks[indexStageTasks].unshift({
      ...formState,
      id: uuid()
    })
    setTasks(stageTasks)
    localStorage.setItem('tasks', JSON.stringify([...stageTasks]))
    setFormState({
      id: '',
      name: '',
      description: '',
      date: new Date().toLocaleString(),
      tag: 'casa'
    })
    onHide()
  }
  // const addNewTask = () => {
  //   setFormState({
  //     id: uuid(),
  //     ...formState,
  //     date: new Date().toLocaleString()
  //   })
  //   const newState = dataTable.map((stage) => {
  //     if (stage.id === idStage) {
  //       stage.datas.tasks.unshift(formState)
  //       return stage
  //     }
  //     return stage
  //   })
  //   setDataTable(newState)
  //   setFormState({
  //     id: uuid(),
  //     name: '',
  //     description: '',
  //     date: new Date().toLocaleString(),
  //     tag: 'casa'
  //   })
  //   onHide()
  // }

  const updateTask = (idTask) => {
    const newState = stageTasks[indexStageTasks].map((dataTask) => {
      if (dataTask.id === idTask) {
        // console.log('entro al if')
        return formState
      }
      return dataTask
    })
    stageTasks[indexStageTasks] = newState
    setTasks(stageTasks)
    setDataTable(prevData => [...prevData])
    localStorage.setItem('tasks', JSON.stringify([...stageTasks]))
    onHide()
  }
  // const updateTask = (idTask) => {
  //   const newState = dataTable.map((stage) => {
  //     if (stage.id === idStage) {
  //       const newTasks = stage.datas.tasks.map((prevTask) => {
  //         if (prevTask.id === idTask) {
  //           return formState
  //         }
  //         return prevTask
  //       })
  //       stage.datas.tasks = newTasks
  //       return stage
  //     }
  //     return stage
  //   })
  //   setDataTable(newState)
  //   // setFormState(dataTaskUpdate)
  //   onHide()
  // }

  let showModal
  if (show) showModal = 'flex'
  else showModal = 'none'
  return (
    <Modal style={{ display: showModal }}>
      <ModalContent shadow={true}>
        <ModalHeader>
          <h3 style={{ margin: '0px' }}>Nueva tarea</h3>
          <CloseSquare set="bold" primaryColor="red" onClick={onHide} />
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div>
              <Input
                clearable
                labelPlaceholder="Nombre de la tarea"
                name='name'
                value={name}
                onChange={handleOnChange} />
              <InputSelect name='tag' onChange={handleOnChange} value={tag}>
                <option value="casa">Casa</option>
                <option value="trabajo">Trabajo</option>
                <option value="escuela">Escuela</option>
                <option value="otros">Otros</option>
              </InputSelect>
            </div>
            <Spacer y={1.5} />
            <InputTextarea name='description' value={description} onChange={handleOnChange} />
          </ModalBody>
          <ModalFooter>
            <Button auto color='red' onClick={onHide} >Cancelar</Button>
            <Button type='submit' auto color='success' >Guardar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

const Modal = styled.div`
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
`

const ModalContent = styled(Card)`
  display: flex;
  height: 20rem;
  width: 40rem !important;
  div.content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
`

const ModalBody = styled.div`
  div {
    display: flex;
    justify-content: space-between;
  }
`

const InputTextarea = styled.textarea`
  background-color: #eaeaea;
  border: 0px;
  border-radius: 12px;
  height: 5rem;
  padding: 4px 10px;
  width: 100%;
`

const InputSelect = styled.select`
  background-color: #eaeaea;
  border: 0px;
  border-radius: 12px;
  padding: 4px 10px;
  
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  Button {
    margin: 6px;
  }
`

FormModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  // dataTable: PropTypes.array,
  setDataTable: PropTypes.func,
  // idStage: PropTypes.number,
  setTasks: PropTypes.func,
  indexStageTasks: PropTypes.number,
  stageTasks: PropTypes.array,
  dataTaskUpdate: PropTypes.object,
  update: PropTypes.bool
}
