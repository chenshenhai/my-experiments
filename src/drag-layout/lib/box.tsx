import React, { FC } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './item-types'

export interface BoxProps {
  id: string,
  name: string
}

interface DropResult {
  id: string,
  name: string,
  wrapperId: string,
  wrapperName: string
}

export const Box: FC<BoxProps> = function Box({ name, id }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name, id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        console.log(`You dropped [${item.name}] into [${dropResult.name}]!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const opacity = isDragging ? 0.4 : 1
  return (
    <div
      ref={drag}
      className='box'
      style={{  opacity }}
      data-testid={`box-${name}`}
    >
      {name}
    </div>
  )
}
