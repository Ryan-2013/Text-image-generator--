const inputText = document.getElementById('inputText');
    const fontSizeInput = document.getElementById('fontSize');
    const charsPerLineInput = document.getElementById('charsPerLine');
    const lineHeightInput = document.getElementById('lineHeight');
    const scaleFactorInput = document.getElementById('scaleFactor');
    const canvas = document.getElementById('textCanvas');
    const ctx = canvas.getContext('2d');
    const downloadLink = document.getElementById('downloadLink');
    const generateBtn = document.getElementById('generateBtn');

    // 動態調整步進值
    function adjustStep(input) {
      const value = parseFloat(input.value);
      input.step = value <= 1 ? "0.1" : "1";
    }

    function updateCanvas() {
      const text = inputText.value;
      const fontSize = parseFloat(fontSizeInput.value);
      const charsPerLine = parseInt(charsPerLineInput.value);
      const lineHeightRatio = parseFloat(lineHeightInput.value);
      const scaleFactor = parseFloat(scaleFactorInput.value);

      // 更新步進值
      adjustStep(fontSizeInput);
      adjustStep(charsPerLineInput);
      adjustStep(lineHeightInput);
      adjustStep(scaleFactorInput);

      const lineHeight = fontSize * lineHeightRatio;
      const padding = 40;

      // 設置字體
      ctx.font = `${fontSize}px Arial`;

      // 按每行字數切割文字
      const lines = [];
      for (let i = 0; i < text.length; i += charsPerLine) {
        lines.push(text.slice(i, i + charsPerLine));
      }

      // 計算畫布大小
      const canvasWidth = padding * 2 + charsPerLine * fontSize * 0.6; // 每個字約佔 0.6 倍字寬
      const canvasHeight = padding * 2 + lineHeight * lines.length;
      canvas.width = canvasWidth * scaleFactor;
      canvas.height = canvasHeight * scaleFactor;

      // 設置高解析度
      ctx.scale(scaleFactor, scaleFactor);

      // 填充背景
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // 繪製文字
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      lines.forEach((line, index) => {
        const y = padding + index * lineHeight;
        ctx.fillText(line, padding, y);
      });

      // 更新下載鏈接
      downloadLink.style.display = 'inline-block';
      downloadLink.href = canvas.toDataURL('image/png');
      downloadLink.download = 'text-image.png';
      downloadLink.textContent = '下載圖片';
    }

    // 生成圖片事件
    generateBtn.addEventListener('click', updateCanvas);

    // 添加其他事件監聽器
    inputText.addEventListener('input', updateCanvas);
    fontSizeInput.addEventListener('input', updateCanvas);
    charsPerLineInput.addEventListener('input', updateCanvas);
    lineHeightInput.addEventListener('input', updateCanvas);
    scaleFactorInput.addEventListener('input', updateCanvas);

    // 初始化畫布
    updateCanvas();