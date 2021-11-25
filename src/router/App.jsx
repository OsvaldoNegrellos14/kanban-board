import React, { useEffect } from 'react'
// import { preguntarPermisos } from '../services/firebase'
import OneSignal from 'react-onesignal'
import { Routing } from './Routing'

export const App = () => {
  useEffect(() => {
    // console.log('entro al metodo del useeffect')
    OneSignal.init({
      appId: '3ab73d37-0d57-4127-acd6-ed87540c38b2'
    })
  }, [])
  // useEffect(() => {
  //   preguntarPermisos()
  // }, [])
  return (
    <Routing />
  )
}
