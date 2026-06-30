import { promises as fs } from 'fs';
import path from 'path';

const root = process.cwd();
const srcDir = path.join(root, 'src');
const distDir = path.join(root, 'dist');

async function copyRecursive(src, dest) {
  const entries = await fs.readdir(src, { withFileTypes: true });
  await fs.mkdir(dest, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyRecursive(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

try {
  await fs.rm(distDir, { recursive: true, force: true });
  await copyRecursive(srcDir, distDir);
  console.log('Built backend to dist/');
} catch (error) {
  console.error(error);
  process.exit(1);
}
