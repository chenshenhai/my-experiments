import React from 'react'
import { Wrapper } from './wrapper'
import { Box } from './box'

export const Container: React.FC = () => (
  <div className='page'>

    <div className='page-module'>
      <Box name="box-001" />
      <Box name="box-002" />
      <Box name="box-003" />
    </div>
    <div className='page-module'>
      <div className='wrapper-list'>
        <Wrapper name="001" />
        <Wrapper name="002" />
        <Wrapper name="003"/>
      </div>
    </div>
  </div>
)
