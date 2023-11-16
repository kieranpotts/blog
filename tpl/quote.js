module.exports = ({ node }) => {
  const attr = node.attributes['$$smap']
  let html = ''

  html += '<blockquote>'
  html += node.getContent()
  html += `<p>— ${attr.attribution}</p>`
  html += '</blockquote>'

  return html
}
