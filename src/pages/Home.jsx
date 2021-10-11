/* eslint-disable no-unused-vars */
import { Container, Grid } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { CardContainer } from '../components/CardContainer'
import { FormTask } from '../components/FormTask'
import { Header } from '../components/Header'
import { LinkOptions } from '../components/LinkOptions'
import { db } from '../database/db'

const STAGES = db
const INITIAL_TASKS = JSON.parse(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [[], [], [], []]

export const Home = () => {
  const [dataTable, setDataTable] = useState(STAGES)
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  // console.log(tasks)
  return (
    <>
      <Container>
        <Grid.Container gap={2}>
          <Grid xs={12} md={6} lg={6}><Header namePage='tablero' /></Grid>
          <Grid xs={12} md={6} lg={6} justify='center'><LinkOptions setDataTable={setDataTable} /></Grid>
          {
            dataTable.map((stage, index) => {
              return (
                <Grid xs={12} md={6} lg={3} key={stage.id}>
                  <CardContainer
                    stage={stage}
                    // dataTable={dataTable}
                    setDataTable={setDataTable}
                    tasks={tasks[index]}
                    setTasks={setTasks}
                    indexStageTasks={index}
                    stageTasks={tasks}
                  />
                </Grid>
              )
            })
          }
        </Grid.Container>
      </Container>
    </>
  )
}
