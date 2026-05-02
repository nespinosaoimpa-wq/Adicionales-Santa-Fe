const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'app', 'js', 'views');
const componentsFile = path.join(__dirname, 'app', 'js', 'components.js');

const filesToProcess = [];

// Get all files in viewsDir
if (fs.existsSync(viewsDir)) {
    const files = fs.readdirSync(viewsDir);
    files.forEach(f => {
        if (f.endsWith('.js')) {
            filesToProcess.push(path.join(viewsDir, f));
        }
    });
}
if (fs.existsSync(componentsFile)) {
    filesToProcess.push(componentsFile);
}

// Allowed replacements
const replacements = [
    // text-white -> text-slate-900 dark:text-white
    {
        regex: /(class="[^"]*?\b)(text-white)(\b[^"]*?")/g,
        replaceFn: (match, p1, p2, p3) => {
            // Check if it has a solid background that needs pure white text
            const solidBgs = /bg-(primary|red|green|emerald|amber|purple|rose|blue|teal)-\d{3}|bg-primary|from-(primary|red|green|emerald|amber|purple|rose|blue|teal)/;
            if (solidBgs.test(p1) || solidBgs.test(p3)) {
                return match;
            }
            return p1 + 'text-slate-900 dark:text-white' + p3;
        }
    },
    // text-white/70 -> text-slate-600 dark:text-white/70
    {
        regex: /(class="[^"]*?\b)(text-white\/70)(\b[^"]*?")/g,
        replaceFn: (match, p1, p2, p3) => {
            const solidBgs = /bg-(primary|red|green|emerald|amber|purple|rose|blue|teal)-\d{3}|bg-primary|from-/;
            if (solidBgs.test(p1) || solidBgs.test(p3)) return match;
            return p1 + 'text-slate-600 dark:text-white/70' + p3;
        }
    },
    // text-white/50 -> text-slate-500 dark:text-white/50
    {
        regex: /(class="[^"]*?\b)(text-white\/50)(\b[^"]*?")/g,
        replaceFn: (match, p1, p2, p3) => {
            const solidBgs = /bg-(primary|red|green|emerald|amber|purple|rose|blue|teal)-\d{3}|bg-primary|from-/;
            if (solidBgs.test(p1) || solidBgs.test(p3)) return match;
            return p1 + 'text-slate-500 dark:text-white/50' + p3;
        }
    },
    // text-slate-300 -> text-slate-700 dark:text-slate-300
    {
        regex: /(class="[^"]*?\b)(text-slate-300)(\b[^"]*?")/g,
        replaceFn: (match, p1, p2, p3) => {
            const darkBg = /bg-slate-800|bg-slate-900/;
            if (darkBg.test(p1) || darkBg.test(p3)) return match; // Keep as is if dark background is forced
            return p1 + 'text-slate-700 dark:text-slate-300' + p3;
        }
    },
    // text-slate-200 -> text-slate-800 dark:text-slate-200
    {
        regex: /(class="[^"]*?\b)(text-slate-200)(\b[^"]*?")/g,
        replaceFn: (match, p1, p2, p3) => {
            return p1 + 'text-slate-800 dark:text-slate-200' + p3;
        }
    }
];

let changedFiles = 0;

filesToProcess.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    replacements.forEach(rep => {
        content = content.replace(rep.regex, rep.replaceFn);
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${path.basename(file)}`);
        changedFiles++;
    }
});

console.log(`Done! Updated ${changedFiles} files.`);
