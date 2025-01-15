function updatePreview() {
    const htmlCode = document.getElementById('html-code').value;
    const cssCode = document.getElementById('css-code').value;
    const jsCode = document.getElementById('js-code').value;
    const preview = document.getElementById('preview').contentWindow.document;

    preview.open();
    preview.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                ${cssCode}
            </style>
        </head>
        <body>
            ${htmlCode}
            <script>
                ${jsCode}
            </script>
        </body>
        </html>
    `);
    preview.close();
}

document.querySelectorAll('.code-editor').forEach(editor => {
    editor.addEventListener('input', updatePreview);
});

updatePreview(); // Initial preview update
