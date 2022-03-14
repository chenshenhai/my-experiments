import React from 'react';
import Module1 from './../components/mod1';
import Module2 from '../components/mod2';
import Module3 from '../components/mod3';
import Module4 from '../components/mod4';

export type TypeItem = {
  entity: React.FC|React.Component,
  name: string,
  id: string
}

export const moduleData: { list: TypeItem[] } = {
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
    },
    {
      entity: Module4,
      name: 'Module 004',
      id: 'module-4'
    }
  ]
}

export type TypeCompList = Array<React.FC|React.Component>;

export const getModuleById = (id: string): null | React.FC | React.Component => {
  let Module: null | React.FC | React.Component = null;
  const { list } = moduleData;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return list[i].entity;
    }
  }
  return Module;
}
