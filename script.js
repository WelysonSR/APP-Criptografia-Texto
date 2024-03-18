document.addEventListener("DOMContentLoaded", function () {
    const textArea = document.getElementById("text");
    const encryptBtn = document.getElementById("encrypt");
    const decryptBtn = document.getElementById("decrypt");
    const copyBtn = document.getElementById("copyBtn");
    const resultDiv = document.getElementById("result");
    let operation = null;
  
    encryptBtn.addEventListener("click", function () {
      const text = textArea.value.trim();
      operation = "encrypt";
      const processedText = processText(text, operation);
      resultDiv.textContent = processedText;
  
      copyBtn.style.display = "block";
    });
  
    decryptBtn.addEventListener("click", function () {
      const text = textArea.value.trim();
      operation = "decrypt";
      const processedText = processText(text, operation);
      resultDiv.textContent = processedText;
  
      copyBtn.style.display = "block";
    });
  
    copyBtn.addEventListener("click", function () {
      copyToClipboard(resultDiv.textContent);
    });
  
    function processText(text, operation) {
      const conversionMap = {
        e: "enter",
        i: "imes",
        a: "ai",
        o: "ober",
        u: "ufat",
      };
  
      if (operation === "encrypt") {
        return text
          .split("")
          .map((char) => conversionMap[char] || char)
          .join("");
      } else {
        const reverseConversionMap = Object.fromEntries(
          Object.entries(conversionMap).map(([key, value]) => [value, key])
        );
        return text.replace(
          /enter|imes|ai|ober|ufat/g,
          (matched) => reverseConversionMap[matched]
        );
      }
    }
  
    function copyToClipboard(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  });