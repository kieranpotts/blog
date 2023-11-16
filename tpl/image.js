module.exports = ({ node }) => {
  const attrs = node.attributes['$$smap']
  let html = ''

  html += '<figure>'
  if (attrs['link']) {
    html += `<a href="${attrs['link']}">`
  }
  html += `<img alt="${JSON.stringify(attrs['alt'])}"
    src="${attrs['target']}"
    width="${attrs['width']}" />`
    if (attrs['link']) {
      html += '</a>'
    }
  html += `<figcaption>${node.getTitle()}</figcaption>`
  html += '</figure>'

  return html
}
