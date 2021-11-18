import rollup, { defineConfig } from 'rollup';
import path from 'path';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const resolveFile = function(filePath: string) {
  return path.join(__dirname, '..', filePath)
}


const config: rollup.RollupOptions = defineConfig({
  input: resolveFile('src/server/index.ts'),
  output: {
    file: resolveFile('dist/server/index.js'),
    format: 'cjs',
  }, 
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: resolveFile('./tsconfig-server.json'),
    }),
  ],
})


export default config;