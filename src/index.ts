import Hello, { InterfaceHello } from './lib/hello';

class World extends Hello implements InterfaceHello {
  constructor() {
    super();
  }
  log() {
    console.log('Hello World')
  }
}

export default World;