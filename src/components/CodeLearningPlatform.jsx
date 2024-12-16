import React, { useState, useEffect } from "react";

const CodeLearningPlatform = () => {
  const [activeTheme, setActiveTheme] = useState("light");
  const [activeTemplate, setActiveTemplate] = useState("empty");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [preview, setPreview] = useState("");

  const templates = {
    empty: {
      html: '<!-- HTML kodunuzu buraya yazın -->\n<div class="container">\n  <h1>Merhaba Dünya!</h1>\n  <p>Bu bir paragraf.</p>\n</div>',
      css: "/* CSS kodunuzu buraya yazın */\n.container {\n  padding: 20px;\n  background-color: #f0f0f0;\n}\n\nh1 {\n  color: #2563eb;\n}\n\np {\n  color: #374151;\n}",
    },
    card: {
      html: '<div class="card">\n  <img src="/api/placeholder/400/200" alt="placeholder">\n  <div class="content">\n    <h2>Kart Başlığı</h2>\n    <p>Kart içeriği buraya gelecek.</p>\n    <button>Daha Fazla</button>\n  </div>\n</div>',
      css: ".card {\n  width: 300px;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n}\n\n.card img {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n}\n\n.content {\n  padding: 16px;\n}\n\nbutton {\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\nbutton:hover {\n  background: #2563eb;\n}",
    },
    navbar: {
      html: '<nav class="navbar">\n  <div class="logo">Logo</div>\n  <ul class="nav-links">\n    <li><a href="#">Ana Sayfa</a></li>\n    <li><a href="#">Hakkında</a></li>\n    <li><a href="#">İletişim</a></li>\n  </ul>\n</nav>',
      css: ".navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 2rem;\n  background: #1e293b;\n  color: white;\n}\n\n.nav-links {\n  display: flex;\n  gap: 2rem;\n  list-style: none;\n}\n\n.nav-links a {\n  color: white;\n  text-decoration: none;\n  transition: color 0.3s;\n}\n\n.nav-links a:hover {\n  color: #60a5fa;\n}",
    },
  };

  useEffect(() => {
    if (activeTemplate && !htmlCode && !cssCode) {
      setHtmlCode(templates[activeTemplate].html);
      setCssCode(templates[activeTemplate].css);
    }
  }, [activeTemplate]);

  useEffect(() => {
    const combinedCode = `
      <html class="${activeTheme}">
        <style>
          /* Reset CSS */
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: system-ui, -apple-system, sans-serif; }
          
          /* Theme Styles */
          .dark { background: #1a1a1a; color: #fff; }
          .dark button { background: #3b82f6; color: white; }
          .light { background: #ffffff; color: #000; }
          
          ${cssCode}
        </style>
        <body>${htmlCode}</body>
      </html>
    `;
    setPreview(combinedCode);
  }, [htmlCode, cssCode, activeTheme]);

  const formatHTML = (code) => {
    let formatted = "";
    let indent = 0;
    const tab = "  ";

    code = code.trim();

    code.split(/>\s*</).forEach((element) => {
      if (element.match(/^\/\w/)) {
        indent -= 1;
      }

      formatted += tab.repeat(indent) + "<" + element + ">\n";

      if (element.match(/^[^\/].*[^\/]$/) && !element.match(/\/>/)) {
        indent += 1;
      }
    });

    return formatted.substring(1, formatted.length - 2);
  };

  const formatCSS = (code) => {
    return code
      .replace(/\s+/g, " ")
      .replace(/\{\s+/g, " {\n  ")
      .replace(/;\s+/g, ";\n  ")
      .replace(/\s+\}/g, "\n}")
      .replace(/\n\s*\n/g, "\n")
      .replace(/}\s+/g, "}\n\n");
  };

  const handleFormat = () => {
    const formattedHTML = formatHTML(htmlCode);
    const formattedCSS = formatCSS(cssCode);
    setHtmlCode(formattedHTML);
    setCssCode(formattedCSS);
  };

  const handleHTMLKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const textarea = e.target;
      const { selectionStart } = textarea;
      const beforeCursor = htmlCode.substring(0, selectionStart);
      const afterCursor = htmlCode.substring(selectionStart);

      const lastLine = beforeCursor.split("\n").pop();
      const indent = lastLine.match(/^\s*/)[0];

      let extraIndent = "";
      if (lastLine.includes("<") && !lastLine.includes("</")) {
        extraIndent = "  ";
      }

      setHtmlCode(beforeCursor + "\n" + indent + extraIndent + afterCursor);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd =
          selectionStart + 1 + indent.length + extraIndent.length;
      }, 0);
    } else if (e.key === ">") {
      const beforeCursor = htmlCode.substring(0, e.target.selectionStart);
      if (beforeCursor.endsWith("<")) {
        const tag = prompt("Hangi tag'i kapatmak istersiniz?");
        if (tag) {
          e.preventDefault();
          const newText = `${beforeCursor}${tag}></${tag}>`;
          setHtmlCode(newText + htmlCode.substring(e.target.selectionStart));
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 border-b dark:border-gray-600 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={activeTemplate}
              onChange={(e) => setActiveTemplate(e.target.value)}
              className="px-3 py-1.5 rounded border bg-white dark:bg-gray-800 dark:text-white"
            >
              <option value="empty">Boş Template</option>
              <option value="card">Kart Komponenti</option>
              <option value="navbar">Navbar Komponenti</option>
            </select>

            <select
              value={activeTheme}
              onChange={(e) => setActiveTheme(e.target.value)}
              className="px-3 py-1.5 rounded border bg-white dark:bg-gray-800 dark:text-white"
            >
              <option value="light">Light Theme</option>
              <option value="dark">Dark Theme</option>
            </select>

            <button
              onClick={handleFormat}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Kodu Düzenle
            </button>
          </div>

          <button
            onClick={() => {
              setHtmlCode("");
              setCssCode("");
            }}
            className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Temizle
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          <div className="space-y-4">
            <div className="border dark:border-gray-600 rounded-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b dark:border-gray-600 flex justify-between items-center">
                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                  HTML
                </h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200">
                  Structure
                </span>
              </div>
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                onKeyDown={handleHTMLKeyDown}
                className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none"
                spellCheck="false"
                placeholder="HTML kodunuzu buraya yazın..."
              />
            </div>

            <div className="border dark:border-gray-600 rounded-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b dark:border-gray-600 flex justify-between items-center">
                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                  CSS
                </h3>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded dark:bg-purple-900 dark:text-purple-200">
                  Styling
                </span>
              </div>
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none"
                spellCheck="false"
                placeholder="CSS kodunuzu buraya yazın..."
              />
            </div>
          </div>

          <div className="border dark:border-gray-600 rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b dark:border-gray-600 flex justify-between items-center">
              <h3 className="font-medium text-gray-700 dark:text-gray-200">
                Önizleme
              </h3>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-200">
                Live Preview
              </span>
            </div>
            <div className="bg-white dark:bg-gray-800">
              <iframe
                srcDoc={preview}
                title="preview"
                className="w-full h-[calc(100vh-24rem)] border-none"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border-t dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            İpuçları:
          </h4>
          <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>Enter tuşu ile otomatik girinti eklenir</li>
            <li>'>' karakterinden sonra tag otomatik kapanır</li>
            <li>'Kodu Düzenle' butonu ile kodunuzu düzenli hale getirin</li>
            <li>Tag kapatmak için '>' yazarken istediğiniz tag'i belirtin</li>
            <li>Farklı şablonları deneyerek öğrenme sürecinizi hızlandırın</li>
            <li>
              Dark/Light tema seçeneğini kullanarak farklı görünümleri test edin
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CodeLearningPlatform;
