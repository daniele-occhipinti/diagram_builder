/*
Depends on node modules: pako, mac-open
therefore you need to install them with: npm install mac-open pako

The textual representation of the diagram you want to generate needs
to be in a file in the same folder as this script of name input_diagram.txt

You run this by launch this command on the command line:
node generate_diagram.js

Based on the type of script you want to generate, uncomment the right
baseurl variable in the script

You can find examples of the different types of diagrams here:
https://kroki.io/examples.html

*/

const pako = require('pako')
const fs = require('fs')
const open = require('mac-open');

try {
  const diagramSource = fs.readFileSync('./input_diagram.txt', 'utf8')

  const data = Buffer.from(diagramSource, 'utf8')
  const compressed = pako.deflate(data, { level: 9 })
  const diagram_encoded_content = Buffer.from(compressed)
    .toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_')

  const baseurl = 'https://kroki.io/c4plantuml/svg/' // for C4model diagrams
  // const baseurl = 'https://kroki.io/mermaid/svg/' // for Gantt charts
  // const baseurl = 'https://kroki.io/plantuml/svg/' // for Work Breakdown Structure, Mindmaps and more

  const url =  baseurl . concat(diagram_encoded_content)

  console.log(url)

  open(url)

} catch (err) {
  console.error(err)
}
