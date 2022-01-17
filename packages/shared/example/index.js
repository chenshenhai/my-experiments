import Shared from '../src/index.ts';

console.log('Shared =', Shared)
const hello = new Shared();
hello.say();
hello.log();