import React from 'react'
import { Wrapper } from './wrapper'
import { Box } from './box'

export const Container: React.FC = () => {
  

  const onDrop = (item: any) => {
    console.log('item ===', item);
  }

  return (
    <div className='page'>
      <div className='page-module'>
        <Box name="box-001" id="box-1" />
        <Box name="box-002" id="box-2" />
        <Box name="box-003" id="box-3"/>
      </div>
      <div className='page-module'>
        <div className='wrapper-list'>
          <Wrapper name="001" id="wrapper-1" onDrop={onDrop}>
            hello
          </Wrapper>
          <Wrapper name="002" id="wrapper-2" onDrop={onDrop}></Wrapper>
          <Wrapper name="003" id="wrapper-3" onDrop={onDrop}></Wrapper>
        </div>
      </div>
    </div>
  )
}
