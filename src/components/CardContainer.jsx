/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@nextui-org/react'
import styled from 'styled-components'
import { ChevronDown, ChevronUp, Plus } from 'react-iconly'
import toDo from './../assets/idea.svg'
import progress from './../assets/sandglass.svg'
import review from './../assets/work-in-progress.svg'
import done from './../assets/star.svg'
import { CardTask } from './CardTask'
import { FormModal } from './FormModal'
import uuid from 'react-uuid'

const INITIAL_LIST_TASKS = { isOpened: true, heightList: 'max-content', overflowList: 'visible' }

export const CardContainer = (
  {
    stage,
    // dataTable,
    setDataTable,
    tasks,
    setTasks,
    indexStageTasks,
    stageTasks
  }
) => {
  const [listOpened, setListOpened] = useState(INITIAL_LIST_TASKS)
  const [modalShow, setModalShow] = useState(false)
  const { isOpened, heightList, overflowList } = listOpened
  const { id, datas } = stage
  const { name, icon } = datas
  let iconStage
  if (icon === 'toDo') iconStage = toDo
  else if (icon === 'progress') iconStage = progress
  else if (icon === 'review') iconStage = review
  else if (icon === 'done') iconStage = done
  const handleIsOpened = () => {
    isOpened
      ? setListOpened({
        isOpened: false,
        heightList: 'min-content',
        overflowList: 'hidden'
      })
      : setListOpened({
        isOpened: true,
        heightList: 'max-content',
        overflowList: 'visible'
      })
  }

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  return (
    <>
      <FormModal
        show={modalShow}
        onHide={handleClose}
        setTasks={setTasks}
        indexStageTasks={indexStageTasks}
        stageTasks={stageTasks}
      // dataTable={dataTable}
      // setDataTable={setDataTable}
      // idStage={id}
      />
      <ContainerModule style={{ height: heightList }}>
        <HeaderModule>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={iconStage} alt="icon-stage" style={{ height: '40px', width: '40px', marginRight: '10px' }} />
            <div>
              <Title>{name}</Title>
              <SubTitle>{tasks.length} tareas disponibles</SubTitle>
            </div>
          </div>
          {
            isOpened
              ? <ChevronUp set="light" primaryColor="gray" style={{ cursor: 'pointer' }} onClick={handleIsOpened} />
              : <ChevronDown set="light" primaryColor="gray" style={{ cursor: 'pointer' }} onClick={handleIsOpened} />
          }
        </HeaderModule>
        <Button style={{ width: '100%', marginBottom: '10px' }} onClick={handleShow}><Plus set="bulk" primaryColor="white" /> Nueva tarea</Button>
        <hr style={{ border: '1px solid gray', backgroundColor: 'gray' }} />
        <div style={{ height: heightList, overflow: overflowList }}>
          {
            isOpened && tasks.map(task => {
              return (
                <CardTask
                  key={uuid()}
                  task={task}
                  // dataTable={dataTable}
                  setDataTable={setDataTable}
                  setTasks={setTasks}
                  indexStageTasks={indexStageTasks}
                  stageTasks={stageTasks}
                  idStage={id}
                />
              )
            })
          }
        </div>
      </ContainerModule>
    </>
  )
}

const ContainerModule = styled.section`
  background-color: #F2F2F2;
  border: 0px;
  border-radius: 10px;
  padding: .75rem;
  width: 100%;
`

const HeaderModule = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

const Title = styled.h3`
  margin: 0px;
  font-weight: 700;
`

const SubTitle = styled.h5`
  color: gray;
`

CardContainer.propTypes = {
  stage: PropTypes.object,
  setDataTable: PropTypes.func,
  // dataTable: PropTypes.array,
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
  indexStageTasks: PropTypes.number,
  stageTasks: PropTypes.array
}
