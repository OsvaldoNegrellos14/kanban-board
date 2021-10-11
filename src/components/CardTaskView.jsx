import React from 'react'
import { Card, Tooltip } from '@nextui-org/react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TimeCircle } from 'react-iconly'

export const CardTaskView = ({ task }) => {
  const { id, name, description, date, tag, urgent } = task
  let colorTag
  if (tag === 'casa') colorTag = '#1E90FF'
  else if (tag === 'trabajo') colorTag = '#228B22'
  else if (tag === 'escuela') colorTag = '#6A5ACD'
  else colorTag = '#FFA500'
  return (
    <CardContainer color='white' shadow={true} key={id}>
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title>{name}</Title>
          {
            urgent &&
            <Tooltip
              text={'Urgente'}
              color="warning"
              style={{ cursor: 'pointer' }}
            >
              <TimeCircle set="bold" primaryColor="orange" />
            </Tooltip>
          }
        </div>
        <SubTitle>{date}</SubTitle>
        <p>{description}</p>
        <ListTagButton>
          <Tag colorTag={colorTag}>#{tag}</Tag>
        </ListTagButton>
      </div>
    </CardContainer>
  )
}

const CardContainer = styled(Card)`
  margin-bottom: 15px !important;
  margin-top: 15px !important;
  width: 300px !important;
  div.content {
    padding: 20px
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

CardTaskView.propTypes = {
  task: PropTypes.object
}
