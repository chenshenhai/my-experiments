import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './item-types'

function getStyle(backgroundColor: string): CSSProperties {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '8rem',
    minWidth: '8rem',
    color: 'white',
    backgroundColor,
    padding: '2rem',
    paddingTop: '1rem',
    margin: '1rem',
    textAlign: 'center',
    float: 'left',
    fontSize: '1rem',
  }
}

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

  let backgroundColor = 'rgba(0, 0, 0, .5)'

  if (isOverCurrent || isOver) {
    backgroundColor = 'darkgreen'
  }

  return (
    <div ref={drop} style={getStyle(backgroundColor)}>
      {hasDropped && <div>dropped {hasDroppedOnChild && ' on child'}</div>}
      <div>{children}</div>
    </div>
  )
}
