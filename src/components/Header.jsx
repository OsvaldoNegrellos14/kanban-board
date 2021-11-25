/* eslint-disable no-new */
import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button } from '@nextui-org/react'

const INITIAL_STATE = !!localStorage.getItem('permissionPushNotification')

export const Header = ({ namePage }) => {
  // console.log()
  const [notificationState, setNotificationState] = useState(INITIAL_STATE)

  const requestPermissionPushNotification = () => {
    Notification.requestPermission().then(result => {
      if (result === 'granted') {
        localStorage.setItem('permissionPushNotification', 'true')
        setNotificationState(true)
        pushNotification()
      }
    })
  }

  const pushNotification = () => {
    const title = 'Kanban board'
    const body = 'Revisa las ultimas actualizaciones del tablero'
    const image = '../assets/favicon-96x96.png'
    const options = {
      body: body,
      icon: image
    }
    new Notification(title, options)
  }
  return (
    <div>
      <Title>{namePage}</Title>
      <Subtitle>Hoy <br /> {new Date().toLocaleDateString()}</Subtitle>
      {
        notificationState
          ? <Button size='mini' color='secondary' onClick={pushNotification}>Notificar</Button>
          : <Button size='mini' color='success' onClick={requestPermissionPushNotification}>Permitir notificaciones</Button>
      }
    </div>
  )
}

const Title = styled.h1`
  text-transform: capitalize;
`

const Subtitle = styled.h5`
  font-size: 1rem;
  color: gray;
`

Header.propTypes = {
  namePage: PropTypes.string
}
