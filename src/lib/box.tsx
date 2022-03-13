// import React from 'react'
// import { useDrag } from 'react-dnd'
// import { ItemTypes } from './item-types'

// const style = {
//   display: 'inline-block',
//   border: '1px dashed gray',
//   padding: '0.5rem 1rem',
//   backgroundColor: 'white',
//   cursor: 'move',
// }

// export const Box: React.FC = () => {
//   const [, drag] = useDrag(() => ({ type: ItemTypes.BOX }))
//   return (
//     <div ref={drag} style={style}>
//       Drag me
//     </div>
//   )
// }



import React, { CSSProperties, FC } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './item-types'

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}

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
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
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
      role="Box"
      style={{ ...style, opacity }}
      data-testid={`box-${name}`}
    >
      {name}
    </div>
  )
}
