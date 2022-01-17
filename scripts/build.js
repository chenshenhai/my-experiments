const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const babel = require('@babel/core');
const glob = require("glob");

build();

function build() {
  buildTS();
  tranformES();
}

function tranformES() {
  const pattern = '**/*.js';
  const cwd = resolve('dist');
  const files = glob.sync(pattern, { cwd, });
  files.forEach((file) => {
    const filePath = resolve('dist', file);
    const code = fs.readFileSync(filePath, { encoding: 'utf8' });
    const result = babel.transformSync(code, {
      filename: 'file.ts',
      presets: [
        // '@babel/preset-env', 
        // '@babel/preset-typescript',
      ],
      plugins: []
    })
    fs.writeFileSync(filePath, result.code);
  })
}

function buildTS() {
  const pattern = '**/*.ts';
  const cwd = resolve('src');
  const files = glob.sync(pattern, { cwd, });

  const targetFiles = files.map((file) => {
    return resolve('src', file);
  });

  // build ts -> esm
  {
    const tsConfig = getTsConfig();
    const compilerOptions = tsConfig.compilerOptions;
    compilerOptions.target = ts.ScriptTarget.ES2015;
    compilerOptions.moduleResolution = ts.ModuleResolutionKind.NodeJs;
    compilerOptions.declaration = true;
    compilerOptions.outDir = resolve('dist', 'esm');
    compilerOptions.rootDir  = resolve('src');
    const program = ts.createProgram(targetFiles, compilerOptions);
    program.emit();
  }

  // build ts -> cjs
  {
    const tsConfig = getTsConfig();
    const compilerOptions = tsConfig.compilerOptions;
    compilerOptions.target = ts.ScriptTarget.ES5;
    compilerOptions.moduleResolution = ts.ModuleResolutionKind.NodeJs;
    compilerOptions.declaration = true;
    compilerOptions.outDir = resolve('dist', 'cjs');
    compilerOptions.rootDir  = resolve('src');
    const program = ts.createProgram(targetFiles, compilerOptions);
    program.emit();
  }

  // console.log('files ===', files);
}

function resolve(...args) {
  return path.join(__dirname, '..', ...args);
}

function getTsConfig() {
  const configPath = resolve('tsconfig.json')
  // const configStr = fs.readFileSync(configPath, { encoding: 'utf8' });
  // const config = JSON.parse(configStr);
  const config = require(configPath)
  return config;
}
