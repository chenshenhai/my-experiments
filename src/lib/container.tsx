import React from 'react'
import { Wrapper } from './wrapper'
import { Box } from './box'

export const Container: React.FC = () => (
  <div className='page'>

    <div className='page-module'>
      <Box name="hello" />
    </div>
    <div className='page-module'>
      <Wrapper name="001">
        <Wrapper  name="002">
          <Wrapper name="003"/>
        </Wrapper>
      </Wrapper>
    </div>
  </div>
)
