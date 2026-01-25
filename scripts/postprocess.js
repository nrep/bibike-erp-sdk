#!/usr/bin/env node
/**
 * Post-process generated SDK for better DX:
 * 1. Remove 'Api' suffix from class names (ProductsApi -> Products)
 * 2. Rename methods like list6, get4 -> list, get (per file)
 */

const fs = require('fs');
const path = require('path');

const APIS_DIR = path.join(__dirname, '../src/generated/src/apis');
const BASE_METHODS = ['list', 'get', 'create', 'update', 'delete', 'search'];

function processApiFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  
  if (fileName === 'index.ts') return { fileName, newFileName: fileName };
  
  let modified = false;
  
  // 1. Remove 'Api' suffix from class name
  const classMatch = fileName.match(/^(.+)Api\.ts$/);
  if (classMatch) {
    const baseName = classMatch[1];
    // Replace class name in content
    content = content.replace(new RegExp(`${baseName}Api`, 'g'), baseName);
    modified = true;
  }
  
  // 2. Normalize numbered methods (list6 -> list)
  for (const base of BASE_METHODS) {
    const pattern = new RegExp(`${base}(\\d+)`, 'g');
    const matches = content.match(pattern);
    
    if (matches && matches.length > 0) {
      const numbered = [...new Set(matches)].sort((a, b) => {
        return parseInt(a.replace(base, '')) - parseInt(b.replace(base, ''));
      });
      
      const baseMethodRegex = new RegExp(`async ${base}\\(`);
      if (!baseMethodRegex.test(content) && numbered.length > 0) {
        const firstNumbered = numbered[0];
        content = content.replace(new RegExp(firstNumbered, 'g'), base);
        modified = true;
      }
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
  }
  
  // Return info for file rename
  const newFileName = fileName.replace(/Api\.ts$/, '.ts');
  return { fileName, newFileName, shouldRename: fileName !== newFileName };
}

function updateApisIndex(renames) {
  const indexPath = path.join(APIS_DIR, 'index.ts');
  let content = fs.readFileSync(indexPath, 'utf8');
  
  for (const { fileName, newFileName } of renames) {
    if (fileName !== newFileName) {
      const oldModule = fileName.replace('.ts', '');
      const newModule = newFileName.replace('.ts', '');
      content = content.replace(
        new RegExp(`from '\\./${oldModule}'`, 'g'),
        `from './${newModule}'`
      );
      // Also update the export name
      content = content.replace(new RegExp(`${oldModule}`, 'g'), newModule);
    }
  }
  
  fs.writeFileSync(indexPath, content);
}

// Main
console.log('Post-processing SDK for better DX...');

if (fs.existsSync(APIS_DIR)) {
  const files = fs.readdirSync(APIS_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts');
  const renames = [];
  
  // Process content first
  for (const file of files) {
    const result = processApiFile(path.join(APIS_DIR, file));
    renames.push(result);
    if (result.shouldRename) {
      console.log(`  ${result.fileName} -> ${result.newFileName}`);
    }
  }
  
  // Rename files
  for (const { fileName, newFileName, shouldRename } of renames) {
    if (shouldRename) {
      fs.renameSync(
        path.join(APIS_DIR, fileName),
        path.join(APIS_DIR, newFileName)
      );
    }
  }
  
  // Update index.ts
  updateApisIndex(renames);
}

console.log('Post-processing complete!');
