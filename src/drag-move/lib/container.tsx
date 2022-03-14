import React, { FC, useState, useCallback } from 'react'
import { Card } from './card'
import update from 'immutability-helper';
import { moduleData, TypeItem } from './data';

const style = {
  width: 400,
  margin: '20px auto',
}



export interface ContainerState {
  items: TypeItem[]
}

export const Container: FC = () => {
  {
    const [mods, setMods] = useState<TypeItem[]>(moduleData.list)

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setMods((prevCards: TypeItem[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as TypeItem],
          ],
        }),
      )
    }, [])

    const renderCard = useCallback(
      (item: TypeItem, index: number) => {
        return (
          <Card
            key={item.id}
            index={index}
            id={item.id}
            content={item.entity}
            moveCard={moveCard}
          />
        )
      },
      [],
    )

    return (
      <>
        <div style={style}>
          {mods.map((mod, i) => {
            return renderCard(mod, i)
          })}
        </div>
      </>
    )
  }
}
