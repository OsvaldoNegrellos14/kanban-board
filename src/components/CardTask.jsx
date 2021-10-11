import { Card, Grid, Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ChevronLeft, ChevronRight, Delete, EditSquare, TimeCircle } from 'react-iconly'
import { FormModal } from './FormModal'

export const CardTask = (
  {
    task,
    // dataTable,
    setDataTable,
    setTasks,
    indexStageTasks,
    stageTasks,
    idStage
  }
) => {
  const [modalShow, setModalShow] = useState(false)
  const { id, name, description, date, tag, urgent } = task
  let colorTag
  if (tag === 'casa') colorTag = '#1E90FF'
  else if (tag === 'trabajo') colorTag = '#228B22'
  else if (tag === 'escuela') colorTag = '#6A5ACD'
  else colorTag = '#FFA500'
  // console.log(idStage)
  const handleDeleteTask = () => {
    const newStageTaks = stageTasks[indexStageTasks].filter((dataTask) => dataTask.id !== id)
    stageTasks[indexStageTasks] = newStageTaks
    setTasks(stageTasks)
    setDataTable(prevData => [...prevData])
    localStorage.setItem('tasks', JSON.stringify([...stageTasks]))
  }
  // const handleDeleteTask = () => {
  //   const newState = dataTable.map((stage) => {
  //     if (stage.id === idStage) {
  //       const newTasks = stage.datas.tasks.filter((task) => task.id !== id)
  //       stage.datas.tasks = newTasks
  //     }
  //     return stage
  //   })
  //   setDataTable(newState)
  // }

  const handleMoveUpTask = () => {
    stageTasks[indexStageTasks + 1].unshift(task)
    const newStageTaks = stageTasks[indexStageTasks].filter((dataTask) => dataTask.id !== id)
    stageTasks[indexStageTasks] = newStageTaks
    setTasks(stageTasks)
    setDataTable(prevData => [...prevData])
    localStorage.setItem('tasks', JSON.stringify([...stageTasks]))
  }
  // const handleMoveUpTask = () => {
  //   const moveTask = dataTable.map((stage) => {
  //     if (stage.id === (idStage + 1)) {
  //       stage.datas.tasks.unshift(task)
  //       return stage
  //     }
  //     return stage
  //   })
  //   setDataTable(moveTask)
  //   const newState = dataTable.map((stage) => {
  //     if (stage.id === idStage) {
  //       const newTasks = stage.datas.tasks.filter((task) => task.id !== id)
  //       stage.datas.tasks = newTasks
  //     }
  //     return stage
  //   })
  //   setDataTable(newState)
  // }

  const handleMoveDownTask = () => {
    stageTasks[indexStageTasks - 1].unshift(task)
    const newStageTaks = stageTasks[indexStageTasks].filter((dataTask) => dataTask.id !== id)
    stageTasks[indexStageTasks] = newStageTaks
    setTasks(stageTasks)
    setDataTable(prevData => [...prevData])
    localStorage.setItem('tasks', JSON.stringify([...stageTasks]))
  }
  // const handleMoveDownTask = () => {
  //   const moveTask = dataTable.map((stage) => {
  //     if (stage.id === (idStage - 1)) {
  //       stage.datas.tasks.unshift(task)
  //       return stage
  //     }
  //     return stage
  //   })
  //   setDataTable(moveTask)
  //   const newState = dataTable.map((stage) => {
  //     if (stage.id === idStage) {
  //       const newTasks = stage.datas.tasks.filter((task) => task.id !== id)
  //       stage.datas.tasks = newTasks
  //     }
  //     return stage
  //   })
  //   setDataTable(newState)
  // }

  const handleAddUrgent = () => {
    const newState = stageTasks[indexStageTasks].map((dataTask) => {
      if (dataTask.id === id) {
        return {
          ...dataTask,
          urgent: !urgent
        }
      }
      return dataTask
    })
    // console.log(newState)
    stageTasks[indexStageTasks] = newState
    setTasks(stageTasks)
    setDataTable(prevData => [...prevData])
    localStorage.setItem('tasks', JSON.stringify([...stageTasks]))
    // console.log('entro al favorito')
  }

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  return (
    <>
      <FormModal
        show={modalShow}
        onHide={handleClose}
        // dataTable={dataTable}
        setDataTable={setDataTable}
        // idStage={idStage}
        setTasks={setTasks}
        indexStageTasks={indexStageTasks}
        stageTasks={stageTasks}
        dataTaskUpdate={task}
        update={true}
      />
      <CardContainer color='white' shadow={true} key={id}>
        <Grid.Container>
          <Grid md={1}>
            {
              (idStage >= 2)
                ? <ButtonContainer>
                  <ChevronLeft set="light" primaryColor="black" onClick={handleMoveDownTask} style={{ cursor: 'pointer' }} />
                </ButtonContainer>
                : <ButtonContainer>
                  <ChevronLeft set="light" primaryColor="gray" style={{ cursor: 'no-drop' }} />
                </ButtonContainer>
            }
          </Grid>
          <Grid md={10}>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title>{name}</Title>
                {
                  urgent
                    ? <Tooltip
                      text={'Borrar de urgentes'}
                      color="warning"
                      style={{ cursor: 'pointer' }}
                      onClick={handleAddUrgent}
                    >
                      <TimeCircle set="bold" primaryColor="orange" />
                    </Tooltip>
                    : <Tooltip
                      text={'Agregar a urgentes'}
                      color="warning"
                      style={{ cursor: 'pointer' }}
                      onClick={handleAddUrgent}
                    >
                      <TimeCircle set="light" primaryColor="orange" />
                    </Tooltip>
                  // favorite
                  //   ? <Bookmark set="bold" primaryColor="#0070f3D9" style={{ cursor: 'pointer' }} onClick={handleAddFavorites} />
                  //   : <Bookmark set="light" primaryColor="#0070f3D9" style={{ cursor: 'pointer' }} onClick={handleAddFavorites} />
                }
              </div>
              <SubTitle>{date}</SubTitle>
              <p>{description}</p>
              <ListTagButton>
                <Tag colorTag={colorTag}>#{tag}</Tag>
                <ActionsContainer>
                  <EditSquare set="light" primaryColor="green" onClick={handleShow} />
                  <Delete set="light" primaryColor="red" onClick={handleDeleteTask} />
                </ActionsContainer>
              </ListTagButton>
            </div>
          </Grid>
          <Grid md={1}>
            {
              (idStage <= 3)
                ? <ButtonContainer>
                  <ChevronRight set="light" primaryColor="black" onClick={handleMoveUpTask} style={{ cursor: 'pointer' }} />
                </ButtonContainer>
                : <ButtonContainer>
                  <ChevronRight set="light" primaryColor="gray" style={{ cursor: 'no-drop' }} />
                </ButtonContainer>
            }
          </Grid>
        </Grid.Container>
      </CardContainer>
    </>
  )
}

const CardContainer = styled(Card)`
  margin-bottom: 15px !important;
  margin-top: 15px !important;
  div.content {
    padding-right: 5px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 5px;
  }
`

const Title = styled.h5`
  font-size: 1.35rem;
  margin-bottom: 0px;
  text-transform: capitalize;
`

const SubTitle = styled.h6`
  font-size: 0.85rem;
  color: gray;
  margin: 0px;
`

const Tag = styled.a`
  border: 1px solid ${({ colorTag }) => colorTag || 'black'};
  border-radius: 10px;
  color: ${({ colorTag }) => colorTag || 'black'};
  font-size: 12px;
  padding: 5px 10px 5px 10px;
  text-decoration: none;
  text-transform: uppercase;
  cursor: context-menu;
  transition: 0.5s;
  :hover {
    border: 1px solid ${({ colorTag }) => colorTag || 'brown'};
    background-color: ${({ colorTag }) => colorTag || 'brown'};
    color: white;
    transition: 0.5s;
  }
`

const ListTagButton = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px;
  transition: 0.5s;
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin: 3px;
    cursor: pointer;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    display: flex;
    align-items: center;
    padding: 3px;
  }
`

CardTask.propTypes = {
  task: PropTypes.object,
  // dataTable: PropTypes.array,
  setDataTable: PropTypes.func,
  setTasks: PropTypes.func,
  indexStageTasks: PropTypes.number,
  stageTasks: PropTypes.array,
  idStage: PropTypes.number
}
