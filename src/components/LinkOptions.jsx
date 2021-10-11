import React from 'react'
import { useHistory } from 'react-router-dom'
import { Calendar, Filter2, TimeCircle } from 'react-iconly'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const LinkOptions = ({ setDataTable }) => {
  const history = useHistory()
  // console.log(history)

  const handleChangePage = (page) => {
    history.push(page)
  }
  return (
    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <ContainerButtons>
        <ButtonLink side={'left'} onClick={() => handleChangePage('/')}>
          Tablero
          <Calendar set="light" />
        </ButtonLink>
        <ButtonLink side={'center'} onClick={() => handleChangePage('/task/group')}>
          Agrupar por tags
          <Filter2 set="light" />
        </ButtonLink>
        <ButtonLink side={'right'} onClick={() => handleChangePage('/task/today')}>
          Urgentes
          <TimeCircle set="light" />
        </ButtonLink>
      </ContainerButtons>
    </div>
  )
}

const ContainerButtons = styled.div`
  display: flex;
  width: 100%;
`

const ButtonLink = styled.button`
  background-color: #539BF0;
  border: 0px;
  border-radius: ${(props) => {
    if (props.side === 'left') return '12px 0px 0px 12px'
    else if (props.side === 'right') return '0px 12px 12px 0px'
    else return '0px'
  }};
  color: white;
  cursor: pointer;
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: 100%;
  transition: 0.5s;
  :hover {
    background-color: #0057BF;
    border: 0px;
    color: white;
    transition: 0.5s;
  };
  :active {
    transform: scale(0.9)
  }
`

LinkOptions.propTypes = {
  setDataTable: PropTypes.func
}
