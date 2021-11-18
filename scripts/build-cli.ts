import rollup, { defineConfig } from 'rollup';
import path from 'path';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

const resolveFile = function(filePath: string) {
  return path.join(__dirname, '..', filePath)
}


const config: rollup.RollupOptions = defineConfig({
  input: resolveFile('src/cli/index.ts'),
  output: {
    file: resolveFile('dist/cli/index.js'),
    format: 'cjs',
  }, 
  plugins: [
    json(),
    typescript({
      tsconfig: resolveFile('./tsconfig-cli.json'),
    }),
  ],
})


export default config;