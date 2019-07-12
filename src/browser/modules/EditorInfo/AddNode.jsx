import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyledTable, StyledValue, StyledKey } from '../DatabaseInfo/styled'
import { ConfirmationButton } from 'browser-components/buttons/ConfirmationButton'
import {
  PlusIcon,
  TickMarkIcon,
  CancelIcon
} from 'browser-components/icons/Icons'
import {
  DrawerSection,
  DrawerSectionBody
} from 'browser-components/drawer/index'
import { TextInput } from 'browser-components/Form'
import styled from 'styled-components'

const IconButton = styled.button`
  margin-left: 4px;
  border: 0;
  background: transparent;
  &:focus {
    outline: none;
  }
`

function Node (props) {
  const [textField, handleToggle] = useState(false)
  const [nodeLabel, handleChange] = useState('')
  // const [error, handleValidate] = useState("");

  const handleValidate = value => {
    let error = ''
    if (!value) {
      error = `${nodeLabel} field cannot be empty`
    }
    return error
  }

  return (
    <React.Fragment>
      <ConfirmationButton
        requestIcon={
          <IconButton onClick={() => handleToggle(!textField)}>
            <PlusIcon />
          </IconButton>
        }
        cancelIcon={
          <IconButton onClick={() => handleToggle(textField)}>
            <CancelIcon />
          </IconButton>
        }
        confirmIcon={<TickMarkIcon />}
        onConfirmed={() => {
          if (handleValidate(event.target.value) === '') {
            props.editEntityAction({ nodeLabel: nodeLabel }, 'create', 'node')
            handleToggle(!textField)
          } else {
            alert('error occurred')
          }
        }}
      />
      {textField ? (
        <DrawerSection>
          <DrawerSectionBody>
            <StyledTable>
              <StyledKey>Node with Label:</StyledKey>
              <StyledValue>
                <TextInput
                  id='nodeLabel'
                  style={{
                    width: '120px'
                  }}
                  onChange={event => {
                    handleChange(([event.target.id] = event.target.value))
                  }}
                />
              </StyledValue>
            </StyledTable>
          </DrawerSectionBody>
        </DrawerSection>
      ) : null}
    </React.Fragment>
  )
}

Node.propTypes = {
  editEntityAction: PropTypes.func
}

export default Node
