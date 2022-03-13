import React, { useState } from 'react'
import { Wrapper } from './wrapper'
import { Box, DropResult } from './box'
import { moduleData, getModuleById, TypeCompList } from './data';

const wrapperCount = 3;
const defaultCompLists: TypeCompList[] = [];
for (let i = 0; i < wrapperCount; i++) {
  defaultCompLists.push([]);
}

export const Container: React.FC = () => {
  
  const [compLists, setCompLists] = useState<TypeCompList[]>(defaultCompLists);

  const onDrop = (result: DropResult) => {
    const { id, wrapperIndex } = result;
    const Module = getModuleById(id);

    if (Module) {
      compLists[wrapperIndex].push(Module);
      setCompLists(compLists);
    }
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
          {compLists.map((compList: TypeCompList, i: number) => {
            return (
              <Wrapper
                key={i}
                index={i}
                name={`wrapper-name-${i}`}
                id={`wrapper-${i}`}
                onDrop={onDrop}
                compList={compList} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
