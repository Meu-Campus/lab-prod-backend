// modules-cli.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const moduleName = process.argv[2];
if (!moduleName) {
	console.error('Informe o nome do módulo. Ex: npm run generate:module teacher-module');
	process.exit(1);
}

const baseName = moduleName.replace('-module', '');
const capitalized = baseName.charAt(0).toUpperCase() + baseName.slice(1);

const sourceDir = path.join(__dirname, 'module-example');
const targetDir = path.join(__dirname, 'src', 'module', moduleName);
fs.mkdirSync(targetDir, { recursive: true });

fs.readdirSync(sourceDir).forEach(file => {
	const content = fs.readFileSync(path.join(sourceDir, file), 'utf8')
		.replace(/example/g, baseName)
		.replace(/Example/g, capitalized)
		.replace(/subject/g, baseName)
		.replace(/Subject/g, capitalized);

	const newFile = file
		.replace(/example-module/g, `${baseName}-module`)
		.replace(/subject-module/g, `${baseName}-module`)
		.replace(/example/g, baseName)
		.replace(/subject/g, baseName);

	fs.writeFileSync(path.join(targetDir, newFile), content);
});

console.log(`Módulo "${moduleName}" criado com sucesso em src/module/${moduleName}`);
