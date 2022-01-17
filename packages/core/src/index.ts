import Hello, { InterfaceHello } from './lib/hello';

class Core extends Hello implements InterfaceHello {
  constructor() {
    super();
  }
  log() {
    console.log('Hello World')
  }
}

export default Core;