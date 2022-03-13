import React, { CSSProperties, FC } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './item-types'

export interface BoxProps {
  name: string
}

interface DropResult {
  name: string
}

export const Box: FC<BoxProps> = function Box({ name }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
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
