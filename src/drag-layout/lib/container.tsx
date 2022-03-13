import React from 'react'
import { Wrapper } from './wrapper'
import { Box } from './box'
import Module1 from './../components/mod1';
import Module2 from '../components/mod2';
import Module3 from '../components/mod2';

const moduleData: any = {
  list: [
    {
      entity: Module1,
      name: 'Module 001',
      id: 'module-1'
    },
    {
      entity: Module2,
      name: 'Module 002',
      id: 'module-2'
    },
    {
      entity: Module3,
      name: 'Module 003',
      id: 'module-3'
    }
  ]
}


export const Container: React.FC = () => {
  

  const onDrop = (item: any) => {
    console.log('item ===', item);
  }

  return (
    <div className='page'>
      <div className='page-module'>
        {moduleData.list.map((item: any, i: number) => {
          return (
            <Box key={i} name={item.name} id={item.id} />
          )
        })}
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
