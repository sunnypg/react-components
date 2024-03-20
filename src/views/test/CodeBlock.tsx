import { useEffect, useRef, useState } from 'react';
import hljs from '../../utils/highlight';
import Clipboard from 'clipboard';
import 'highlight.js/styles/default.css';

interface CodeBlockProps {
  language: string;
  code: string;
}

function CodeBlock(props: CodeBlockProps) {
  const { language, code } = props;

  const preRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preRef.current) {
      hljs.highlightElement(preRef.current);

      // 创建 clipboard 实例并保存到变量中
      const clipboard = new Clipboard(`#${language}copy_btn`, {
        text: () => code,
      });

      // 监听复制成功事件
      clipboard.on('success', () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });

      // 销毁 clipboard 实例
      return () => {
        clipboard.destroy();
      };
    }
  }, [code]);

  return (
    <div className="code-block" style={{ position: 'relative', marginTop: 8 }}>
      <pre>
        <code id={language} ref={preRef}>
          {code}
        </code>
      </pre>
      <button id={`${language}copy_btn`} style={{ position: 'absolute', top: 4, right: 4, lineHeight: '14px' }} data-clipboard-target={`#${language}`}>
        {copied ? '已复制' : '复制'}
      </button>
    </div>
  );
}


export default CodeBlock