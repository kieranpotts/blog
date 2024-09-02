module.exports = ({ node }) => {
  const attr = node.attributes["$$smap"];
  let html = "";

  html += "<blockquote>";
  html += `<p>${node.getContent()}</p>`;
  if (attr["attribution"]) {
    html += `<p>– ${attr.attribution}</p>`;
  }
  html += "</blockquote>";

  return html;
};
