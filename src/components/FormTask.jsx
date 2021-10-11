import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { Search } from 'react-iconly'
import styled from 'styled-components'

const handleFormButton = () => {
  console.log('entro al click')
}

export const FormTask = () => {
  return (
    <FormContainer>
      <Input
        labelPlaceholder='Nombre de tarea'
        size='large'
        underlined
        color='default'
        clearable
      />
      <Button auto color='primary' size='small' ><Search set="bulk" primaryColor="white" onClick={handleFormButton} /></Button>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  align-items: center;
  display: inline-flex;
  flex-wrap: wrap;
  div {
    margin: 0rem 0.75rem 0rem 0.25rem
  }
  Button {
    margin: 0rem 0.25rem 0rem 0.75rem;
    display: flex !important;
    align-items: center;
    width: 80px !important;
    height: 40px !important
  }
  Button div {
    margin: 0px;
  }
`
