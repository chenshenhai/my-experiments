function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'object' ? child: createTextVDom(child)
      })
    }
  }
}

function createTextVDom(text) {
  return {
    type: 'TEXT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function createDom(vDom) {
  let dom;
  if(vDom.type === 'TEXT') {
    dom = document.createTextNode(vDom.props.nodeValue);
  } else {
    dom = document.createElement(vDom.type);
    if(vDom.props) {
      Object.keys(vDom.props)
        .filter(key => key !== 'children')
        .forEach(item => {
          if(item.indexOf('on') === 0) {
            dom.addEventListener(item.substr(2).toLowerCase(), vDom.props[item], false);
          } else {
            dom[item] = vDom.props[item];
          }
        })
    }
  }

  return dom;
}

function updateDom(dom, prevProps, nextProps) {
  Object.keys(prevProps)
    .filter(name => name !== 'children')
    .filter(name => !(name in nextProps))
    .forEach(name => {
      if(name.indexOf('on') === 0) {
        dom.removeEventListener(name.substr(2).toLowerCase(), prevProps[name], false);
      } else {
        dom[name] = '';
      }
    });

  Object.keys(nextProps)
    .filter(name => name !== 'children')
    .forEach(name => {
      if(name.indexOf('on') === 0) {
        dom.addEventListener(name.substr(2).toLowerCase(), nextProps[name], false);
      } else {
        dom[name] = nextProps[name];
      }
    });
}
 
function commitRoot() {
  deletions.forEach(commitRootImpl);    
  commitRootImpl(workInProgressRoot.child); 
  currentRoot = workInProgressRoot; 
  workInProgressRoot = null; 
}

function commitDeletion(fiber, domParent) {
  if(fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}

function commitRootImpl(fiber) {
  if(!fiber) {
    return;
  }
  let parentFiber = fiber.return;
  while(!parentFiber.dom) {
    parentFiber = parentFiber.return;
  }
  const parentDom = parentFiber.dom;

  if(fiber.effectTag === 'REPLACEMENT' && fiber.dom) {
    parentDom.appendChild(fiber.dom);
  } else if(fiber.effectTag === 'DELETION') {
    commitDeletion(fiber, parentDom);
  } else if(fiber.effectTag === 'UPDATE' && fiber.dom) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }

  commitRootImpl(fiber.child);
  commitRootImpl(fiber.sibling);
}

let nextUnitOfWork = null;
let workInProgressRoot = null;
let currentRoot = null;
let deletions = null;

function workLoop(deadline) {
  while(nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if(!nextUnitOfWork && workInProgressRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

function buildNewFiber(fiber, workInProgressFiber) {
  return {
    type: fiber.type,
    props: fiber.props,
    dom: null,         
    return: workInProgressFiber,
    alternate: null, 
    effectTag: 'REPLACEMENT' 
  }
}

function reconcileChildren(workInProgressFiber, elements) {
  let oldFiber = workInProgressFiber.alternate && workInProgressFiber.alternate.child;  // 获取上次的fiber树
  let prevSibling = null;
  let index = 0;
  if(elements && elements.length) { 
    if(!oldFiber) {
      for(let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const newFiber = buildNewFiber(element, workInProgressFiber);
        if(i === 0) {
          workInProgressFiber.child = newFiber;
        } else {
          prevSibling.sibling = newFiber;
        }

        prevSibling = newFiber;
      }
    }

    while(index < elements.length && oldFiber) {
      let element = elements[index];
      let newFiber = null;

      const sameType = oldFiber && element && oldFiber.type === element.type;

      if(sameType) {
        newFiber = {
          type: oldFiber.type,
          props: element.props,
          dom: oldFiber.dom,
          return: workInProgressFiber,
          alternate: oldFiber,  
          effectTag: 'UPDATE' 
        }
      } else if(!sameType && element) {
        newFiber = buildNewFiber(element, workInProgressFiber)
      } else if(!sameType && oldFiber) {
        oldFiber.effectTag = 'DELETION'; 
        deletions.push(oldFiber);  
      }


      oldFiber = oldFiber.sibling;  

      if(index === 0) {
        workInProgressFiber.child = newFiber;
      } else {
        prevSibling.sibling = newFiber;
      }

      prevSibling = newFiber;
      index++;
    }
  }
}
 
let wipFiber = null;
let hookIndex = null;
function useState(init) { 
  const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex];
 
  const hook = {
    state: oldHook ? oldHook.state : init 
  }
 
  wipFiber.hooks.push(hook);
  hookIndex++;
 
  const setState = value => {
    hook.state = value;

    workInProgressRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    }
    nextUnitOfWork = workInProgressRoot;
    deletions = [];
  }

  return [hook.state, setState]
}

function updateFunctionComponent(fiber) { 
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];  
 
  const children = [fiber.type(fiber.props)];

  reconcileChildren(fiber, children);
}
 
function updateHostComponent(fiber) {
  if(!fiber.dom) {
    fiber.dom = createDom(fiber); 
  } 
 
  const elements = fiber.props && fiber.props.children;
 
  reconcileChildren(fiber, elements);
}
 
function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;
  if(isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
  if(fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while(nextFiber) {
    if(nextFiber.sibling) {
      return nextFiber.sibling;
    }

    nextFiber = nextFiber.return;
  }
}

requestIdleCallback(workLoop);

function render(vDom, container) {
  workInProgressRoot = {
    dom: container,
    props: {
      children: [vDom]
    },
    alternate: currentRoot
  }
  deletions = [];
  nextUnitOfWork = workInProgressRoot;
}


export {
  createElement,
  render,
  useState,
}