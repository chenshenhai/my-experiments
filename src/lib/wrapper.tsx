import React, { FC, ReactNode, useState } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './item-types'

export interface WrapperProps {
  children?: ReactNode,
  name: string,
}

export interface WrapperState {
  hasDropped: boolean
  hasDroppedOnChild: boolean
}

const greedy = false;

export const Wrapper: FC<WrapperProps> = ({ children, name = 'Hello' }) => {
  const [hasDropped, setHasDropped] = useState(false)
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(_item: unknown, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop && !greedy) {
          return
        }
        setHasDropped(true)
        setHasDroppedOnChild(didDrop)
        return { name: `Wrapper-${name}` }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [setHasDropped, setHasDroppedOnChild],
  )

  let backgroundColor = '#00000036';

  if (isOverCurrent || isOver) {
    backgroundColor = '#f4433694'
  }

  return (
    <div ref={drop} className='wrapper' style={{backgroundColor}}>
      {hasDropped && <div>dropped {hasDroppedOnChild && ' on child'}</div>}
      <div>{children}</div>
    </div>
  )
}
