module.exports = ({ node }) => {
  const attrs = node.attributes["$$smap"];
  let html = "";

  html += "<figure>";
  if (attrs["link"]) {
    html += `<a href="${attrs["link"]}">`;
  }
  html += `<img alt=${JSON.stringify(attrs["alt"])}`;
  html += ` src="${attrs["target"]}"`;
  if (attrs["width"]) {
    html += ` width="${attrs["width"]}" `;
  }
  html += ` />`;
  if (attrs["link"]) {
    html += "</a>";
  }
  if (node.getTitle()) {
    html += `<figcaption>${node.getTitle()}</figcaption>`;
  }
  html += "</figure>";

  return html;
};
