export interface InterfaceHello {
  say: () => void;
}

class Hello implements InterfaceHello {
  say() {
    console.log('Hello!')
  }
}

export default Hello;