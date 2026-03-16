import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src');

// Define deep-clean replacements
const replacements = [
  // Previous Hardcoded hexes
  { search: /bg-\[#0A0A0F\]/g, replace: 'bg-background' },
  { search: /bg-\[#1A1A2E\]/g, replace: 'bg-card' },
  { search: /from-\[#1A1A2E\]/g, replace: 'from-card' },
  { search: /from-\[#0A0A0F\]/g, replace: 'from-background' },
  { search: /via-\[#0A0A0F\]/g, replace: 'via-background' },
  { search: /to-\[#0A0A0F\]/g, replace: 'to-background' },
  { search: /border-\[#2D2D44\]/g, replace: 'border-border' },
  { search: /text-\[#E5E7EB\]/g, replace: 'text-foreground' },
  { search: /text-\[#9CA3AF\]/g, replace: 'text-muted-foreground' },
  { search: /text-\[#7C3AED\]/g, replace: 'text-primary' },
  
  // New specific hidden purples
  { search: /bg-\[#7C3AED\]\/12/g, replace: 'bg-primary/20' }, // Hero section glares
  { search: /bg-\[#9333EA\]\/8/g, replace: 'bg-secondary/15' },
  { search: /bg-\[#7C3AED\]\/10/g, replace: 'bg-primary/15' },
  { search: /via-\[#7C3AED\]/g, replace: 'via-primary' },
  
  // Buttons & Gradients with hardcoded hexes
  { search: /\[--circle-start:#C084FC\]/g, replace: '[--circle-start:var(--color-accent-glow)]' },
  { search: /\[--circle-end:#7B2CBF\]/g, replace: '[--circle-end:var(--color-accent-secondary)]' },
  { search: /bg-\[#7B2CBF\]\/10/g, replace: 'bg-primary/10' },
  { search: /hover:bg-\[#7B2CBF\]\/20/g, replace: 'hover:bg-primary/20' },
  { search: /border-\[#C084FC\]/g, replace: 'border-ring' },
  { search: /shadow-\[0_0_20px_rgba\(124,58,237,0\.3\)\]/g, replace: 'shadow-[0_0_20px_var(--color-accent-primary)]' },
  { search: /shadow-\[0_0_50px_rgba\(124,58,237,0\.1\)\]/g, replace: 'shadow-[0_0_50px_var(--color-accent-primary)]' },
  
  // Standard Tailwind Purples/Violets used in toggles and backgrounds
  { search: /bg-violet-600/g, replace: 'bg-primary' },
  { search: /border-violet-500\/50/g, replace: 'border-primary/50' },
  { search: /shadow-\[0_0_12px_rgba\(124,58,237,0\.6\)\]/g, replace: 'shadow-[0_0_12px_var(--color-accent-primary)]' },
  { search: /shadow-\[0_0_16px_rgba\(124,58,237,0\.4\)\]/g, replace: 'shadow-[0_0_16px_var(--color-accent-primary)]' },
  { search: /hover:before:bg-violet-700/g, replace: 'hover:before:bg-primary' },
  { search: /from-indigo-400\/10/g, replace: 'from-primary/20' },
  { search: /to-purple-400\/10/g, replace: 'to-secondary/20' },
  
  // Specific cases
  { search: /ring-\[#C084FC\]\/20/g, replace: 'ring-ring/20' },
  { search: /text-\[#D8A8FF\]/g, replace: 'text-primary' }, // Privacy link in form
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.astro')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);
let changedFiles = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  replacements.forEach(({ search, replace }) => {
    content = content.replace(search, replace);
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log(`Updated: ${path.relative(srcDir, file)}`);
  }
});

console.log(`\nDeep-clean Refactoring complete! Modified ${changedFiles} files.`);
