import './style.css'
import './js/popup.js'
// const editorsBlock = document.querySelector('[data-element="editors-block"]')

// if (editorsBlock) setTimeout(editorsInit, 0)

// function editorsInit() {
//   const input = editorsBlock.querySelector('[data-element="input"]')
//   const output = editorsBlock.querySelector('[data-element="output"]')

//   lineNumbers()
//   input.addEventListener('input', convertValue)

//   function lineNumbers() {
//     const editorLine = document.querySelector('.editor-line');
//     let val = input.value;
//     let numOfLines = 1;

//     function update () {
//       val = input.value;

//       let lineBreaks = val.match(/[\n\r]/g) || [];
//       numOfLines = lineBreaks.length ? lineBreaks.length + 1 : 1;

//       editorLine.innerHTML = ""
//       for (var i = 0; i < numOfLines; i++) {

//         var el = document.createElement('span');
//         el.innerHTML = i + 1;
//         editorLine.appendChild(el);
//       }
//     }

//     input.addEventListener('input', update);
//   }

//   function convertValue () {
//     const doc = yaml.safeLoad(input.value)
//     console.log(doc);
//   }
// }