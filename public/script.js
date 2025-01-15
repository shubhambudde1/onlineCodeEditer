const starterCode = {
    javascript: `console.log("Hello, World!");`,
    html: `<h1>Hello, World!</h1>`,
    css: `body { color: red; }`,
    python: `print("Hello, World!")`,
    java: `public class Main { public static void main(String[] args) { System.out.println("Hello, World!"); } }`,
    cpp: `#include <iostream>\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}`,
    php: `<?php echo "Hello, World!"; ?>`
};

const languageModes = {
    javascript: 'javascript',
    html: 'xml',
    css: 'css',
    python: 'python',
    java: 'text/x-java',
    cpp: 'text/x-c++src',
    php: 'application/x-httpd-php'
};

const editor = CodeMirror(document.getElementById('editor'), {
    mode: 'javascript',
    theme: 'monokai',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    value: starterCode.javascript,
});

const output = document.getElementById('output');
const preview = document.getElementById('preview');

function changeLanguage() {
    const lang = document.getElementById('language').value;
    editor.setOption('mode', languageModes[lang]);
    editor.setValue(starterCode[lang]);
    togglePreview(lang === 'html');
}

function togglePreview(isHtml) {
    preview.style.display = isHtml ? 'block' : 'none';
    output.style.display = isHtml ? 'none' : 'block';
}

function clearOutput() {
    output.textContent = '';
}

async function runCode() {
    const lang = document.getElementById('language').value;
    const code = editor.getValue();

    clearOutput();

    if (lang === 'html') {
        preview.srcdoc = code;
    } else if (lang === 'javascript') {
        try {
            new Function(code)();
        } catch (err) {
            output.textContent = `Error: ${err.message}`;
        }
    } else {
        try {
            const response = await fetch('/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ language: lang, code: code }),
            });

            const result = await response.json();
            if (result.error) {
                output.textContent = `Error: ${result.error}`;
            } else {
                output.textContent = result.output;
            }
        } catch (err) {
            output.textContent = `Error: ${err.message}`;
        }
    }
}

document.getElementById('language').addEventListener('change', changeLanguage);