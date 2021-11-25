/* eslint-disable no-unused-vars */
import { Container, Grid } from '@nextui-org/react'
import React, { useState } from 'react'
import uuid from 'react-uuid'
import styled from 'styled-components'
import { CardTaskView } from '../components/CardTaskView'
import { Header } from '../components/Header'
import { LinkOptions } from '../components/LinkOptions'

export const TasksToday = () => {
  const INITIAL_TASKS = JSON.parse(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [[], [], [], []]
  const datas = []
  INITIAL_TASKS.forEach(stage => {
    const tasks = stage.filter((task) => task.urgent)
    if (tasks.length > 0) {
      tasks.forEach((task) => {
        datas.push(task)
      })
    }
  })
  // console.log(datas)
  // console.log(datas)
  return (
    <>
      <Container>
        <Grid.Container gap={2}>
          <Grid xs={12} md={6} lg={6}><Header namePage='urgentes' /></Grid>
          <Grid xs={12} md={6} lg={6} justify='center'><LinkOptions /></Grid>
        </Grid.Container>
        <CardContainer gap={2} justify='center'>
          {
            datas.length > 0
              ? datas.map((task) => {
                return (
                  <Grid xs={12} md={6} lg={3} key={uuid()} justify='center'>
                    <CardTaskView task={task} />
                  </Grid>
                )
              })
              : <h3>No hay tareas urgentes</h3>
          }
        </CardContainer>
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
