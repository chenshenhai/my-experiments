import React from 'react'
import { Wrapper } from './wrapper'
import { Box } from './box'

export const Container: React.FC = () => (
  <div>
    <div style={{ overflow: 'hidden', clear: 'both', margin: '-1rem' }}>
      <Wrapper name="001">
        <Wrapper  name="002">
          <Wrapper name="003"/>
        </Wrapper>
      </Wrapper>
    </div>

    <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
      <Box name="hello" />
    </div>
  </div>
)
