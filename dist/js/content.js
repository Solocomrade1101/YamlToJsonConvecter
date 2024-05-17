// Добавляет скрипт к документу и вызывает callback, когда скрипт загружен.
function injectScript(file, node, callback) {
    const th = document.getElementsByTagName(node)[0];
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file);
    script.onload = callback; // Вызывается после загрузки скрипта
    th.appendChild(script);
}

// Добавляет стиль к документу.
function injectCSS(file, node) {
    const th = document.getElementsByTagName(node)[0];
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('type', 'text/css');
    style.setAttribute('href', file);
    th.appendChild(style);
}
function injectTheme(file, node) {
    const th = document.getElementsByTagName(node)[0];
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('type', 'text/css');
    style.setAttribute('href', file);
    th.appendChild(style);
}

// Внедрение CodeMirror и зависимостей
function initCodeMirror() {
    // Здесь будет инициализация CodeMirror
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const editor = CodeMirror.fromTextArea(textarea, {
            lineNumbers: true,
            mode: "yaml", // Выберите нужный режим для подсветки синтаксиса
            theme: "dracula"
        });
    });
}

// Внедряем стили CodeMirror


// Внедряем основной скрипт CodeMirror, после чего внедряем скрипт режима и инициализируем CodeMirror
injectScript(chrome.runtime.getURL('codemirror/codemirror.js'), 'head', function() {
    console.log('CodeMirror main script loaded.');

    // Дополнительно можно загрузить расширения для режима или темы
    injectScript(chrome.runtime.getURL('codemirror/mode/yaml/yaml.js'), 'head', function() {
        console.log('CodeMirror YAML mode script loaded.');

        injectCSS(chrome.runtime.getURL('codemirror/codemirror.css'), 'head');
        console.log('CodeMirror css.')

        injectTheme(chrome.runtime.getURL('codemirror/theme/dracula.css'), 'head');
        console.log('CodeMirror theme.')

        // После загрузки всех зависимостей, инициализируем CodeMirror
        initCodeMirror();
    });
});