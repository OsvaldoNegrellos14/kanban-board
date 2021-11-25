/* eslint-disable no-unused-vars */
import { Container, Grid } from '@nextui-org/react'
import React, { useState } from 'react'
import { LinkOptions } from '../components/LinkOptions'
import { Header } from '../components/Header'
import uuid from 'react-uuid'
import { CardTaskView } from '../components/CardTaskView'
import styled from 'styled-components'

export const TasksGroup = () => {
  const INITIAL_TASKS = JSON.parse(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [[], [], [], []]
  const tagCasa = []
  const tagTrabajo = []
  const tagEscuela = []
  const tagOtros = []
  INITIAL_TASKS.forEach((stage) => {
    const tasksCasa = stage.filter((task) => task.tag === 'casa')
    if (tasksCasa.length > 0) {
      tasksCasa.forEach((task) => {
        tagCasa.push(task)
      })
    }
    const tasksTrabajo = stage.filter((task) => task.tag === 'trabajo')
    if (tasksTrabajo.length > 0) {
      tasksTrabajo.forEach((task) => {
        tagTrabajo.push(task)
      })
    }
    const tasksEscuela = stage.filter((task) => task.tag === 'escuela')
    if (tasksEscuela.length > 0) {
      tasksEscuela.forEach((task) => {
        tagEscuela.push(task)
      })
    }
    const tasksOtros = stage.filter((task) => task.tag === 'otros')
    if (tasksOtros.length > 0) {
      tasksOtros.forEach((task) => {
        tagOtros.push(task)
      })
    }
  })
  const dataGroupTag = [
    { nameTag: 'casa', datas: tagCasa },
    { nameTag: 'trabajo', datas: tagTrabajo },
    { nameTag: 'escuela', datas: tagEscuela },
    { nameTag: 'otros', datas: tagOtros }]
  return (
    <>
      <Container>
        <Grid.Container gap={2}>
          <Grid xs={12} md={6} lg={6}><Header namePage='Agrupados por tag' /></Grid>
          <Grid xs={12} md={6} lg={6} justify='center'><LinkOptions /></Grid>
        </Grid.Container>
        {
          dataGroupTag.map(({ nameTag, datas }) => {
            return (
              <CardContainer key={uuid()} gap={2} justify='center'>
                <Grid xs={12} md={12} lg={12} key={uuid()} justify='center'>
                  <TagName>#{nameTag}</TagName>
                </Grid>
                {
                  datas.length > 0
                    ? datas.map((task) => {
                      return (
                        <Grid xs={12} md={6} lg={3} key={uuid()} justify='center'>
                          <CardTaskView task={task} />
                        </Grid>
                      )
                    })
                    : <h3>No hay tareas disponibles</h3>
                }
              </CardContainer>
            )
          })
        }
      </Container>
    </>
  )
}

const CardContainer = styled(Grid.Container)`
  background-color: #F2F2F2;
  border: 0px;
  border-radius: 10px;
  margin-bottom: 40px !important;
`

const TagName = styled.h3`
  text-transform: uppercase;
`
