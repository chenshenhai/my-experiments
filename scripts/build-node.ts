import ts from 'typescript';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import { resolvePackagePath, getTsConfig } from './project';


const packages = [
  {
    dirName: 'server',
  }
]

build();

async function build() {
  packages.forEach(async (pkg) => {
    const target = pkg.dirName;
    const pkgDir = path.resolve(`packages/${target}`);
    if (fs.existsSync(`${pkgDir}/dist`)) {
      fs.rmSync(`${pkgDir}/dist`, { recursive: true });
    }
    buildPackage(pkg.dirName);
  });
}

function buildPackage(dirName: string) {
  const pattern = '**/*.ts';
  const cwd = resolvePackagePath(dirName, 'src');
  const files = glob.sync(pattern, { cwd, });

  const targetFiles = files.map((file) => {
    return resolvePackagePath(dirName, 'src', file);
  });

  // build ts -> esm
  {
    const tsConfig = getTsConfig();
    const compilerOptions = tsConfig.compilerOptions;
    compilerOptions.target = ts.ScriptTarget.ES2015;
    compilerOptions.moduleResolution = ts.ModuleResolutionKind.NodeJs;
    compilerOptions.declaration = true;
    compilerOptions.outDir = resolvePackagePath(dirName, 'dist', 'esm');
    compilerOptions.rootDir  = resolvePackagePath(dirName, 'src');
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
    compilerOptions.outDir = resolvePackagePath(dirName, 'dist', 'cjs');
    compilerOptions.rootDir  = resolvePackagePath(dirName, 'src');
    const program = ts.createProgram(targetFiles, compilerOptions);
    program.emit();
  }
}