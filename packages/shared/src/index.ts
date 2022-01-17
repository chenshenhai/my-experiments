import Hello, { InterfaceHello } from './lib/hello';

class Shared extends Hello implements InterfaceHello {
  constructor() {
    super();
  }
  log() {
    console.log('Hello World')
  }
}

export default Shared;