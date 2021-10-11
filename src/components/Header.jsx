import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Header = ({ namePage }) => {
  return (
    <div>
      <Title>{namePage}</Title>
      <Subtitle>Hoy <br /> {new Date().toLocaleDateString()}</Subtitle>
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
