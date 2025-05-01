import { useEffect, useState } from 'react';
import EditorMonaco from '@monaco-editor/react';
import { compileCode } from '../utils/api';
import Split from 'react-split';
import toast from 'react-hot-toast';

const languageOptions = [
  { id: 63, name: '🟨 JavaScript (Node.js)', monacoLang: 'javascript' },
  { id: 71, name: '🐍 Python (3.8.1)', monacoLang: 'python' },
  { id: 62, name: '☕ Java (OpenJDK 13.0.1)', monacoLang: 'java' },
  { id: 52, name: '💠 C++ (GCC 9.2.0)', monacoLang: 'cpp' },
  { id: 50, name: '🧱 C (GCC 9.2.0)', monacoLang: 'c' },
];

const fontSizes = [12, 14, 16, 18, 20];

type Tab = {
  id: number;
  name: string;
  language: number;
  code: string;
};

export default function Editor() {
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const saved = localStorage.getItem('oncomTabs');
    return saved
      ? JSON.parse(saved)
      : [{ id: 1, name: 'Tab 1', language: 63, code: '// Write your code here...' }];
  });

  const [activeTab, setActiveTab] = useState(0);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(() => {
    const stored = localStorage.getItem('fontSize');
    return stored ? parseInt(stored) : 14;
  });

  const current = tabs[activeTab];
  const selectedLang = languageOptions.find((l) => l.id === current.language);

  useEffect(() => {
    localStorage.setItem('oncomTabs', JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    localStorage.setItem('fontSize', String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setEditorTheme(isDark ? 'vs-dark' : 'vs-light');
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setEditorTheme(document.documentElement.classList.contains('dark') ? 'vs-dark' : 'vs-light');

    return () => observer.disconnect();
  }, []);

  const updateCurrent = (field: keyof Tab, value: any) => {
    const newTabs = [...tabs];
    newTabs[activeTab] = { ...newTabs[activeTab], [field]: value };
    setTabs(newTabs);
  };

  const runCode = async () => {
    setIsLoading(true);
    setOutput('');
    try {
      const result = await compileCode(current.code, current.language, input);
      setOutput(result.stdout || result.stderr || result.compile_output || 'No output received');
      toast.success('✅ Code executed!');
    } catch (error: any) {
      setOutput('Error: ' + (error.response?.data?.message || error.message));
      toast.error('❌ Execution failed!');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCode = () => {
    updateCurrent('code', '');
    toast.success('🗑️ Code cleared!');
  };

  const clearOutput = () => {
    setOutput('');
    toast.success('🧹 Output cleared!');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`📋 ${label} copied!`);
  };

  const downloadCode = () => {
    const blob = new Blob([current.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${current.name.replace(' ', '_')}-${selectedLang?.monacoLang}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('⬇️ Code downloaded!');
  };

  const addTab = () => {
    const newId = tabs.length + 1;
    setTabs([...tabs, { id: newId, name: `Tab ${newId}`, language: 63, code: '' }]);
    setActiveTab(tabs.length);
  };

  const closeTab = (index: number) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);
    setActiveTab(index === 0 ? 0 : index - 1);
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      {/* Tab Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-1 rounded-t cursor-pointer border-b-2 text-sm ${
              index === activeTab
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white border-transparent'
            }`}
          >
            {tab.name}
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(index);
                }}
                className="ml-2 text-xs text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addTab}
          className="bg-green-500 hover:bg-green-600 text-white px-2 rounded text-sm"
        >
          ＋
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div className="flex gap-3 flex-wrap items-center">
          <select
            className="p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded"
            value={current.language}
            onChange={(e) => updateCurrent('language', Number(e.target.value))}
          >
            {languageOptions.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>

          <select
            className="p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                Font: {size}px
              </option>
            ))}
          </select>

          <button
            onClick={() => copyToClipboard(current.code, 'Code')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-1 rounded"
          >
            📋 Copy Code
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={downloadCode}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-1 rounded"
          >
            ⬇️ Download
          </button>
          <button
            onClick={clearCode}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-1 rounded"
          >
            🗑️ Clear Code
          </button>
        </div>
      </div>

      {/* Editor and Split Panel */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-300 dark:border-gray-600 rounded overflow-hidden h-[400px]">
          <EditorMonaco
            height="100%"
            language={selectedLang?.monacoLang}
            value={current.code}
            theme={editorTheme}
            onChange={(value) => updateCurrent('code', value || '')}
            options={{
              fontSize,
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          />
        </div>

        <Split direction="vertical" className="flex flex-col gap-4" sizes={[50, 50]} minSize={100}>
          {/* Custom Input */}
          <div className="space-y-2">
            <label className="font-medium dark:text-white text-gray-900">📥 Custom Input</label>
            <textarea
              className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded resize-none"
              rows={6}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={runCode}
              disabled={isLoading}
              className="w-full px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition duration-300"
            >
              {isLoading ? 'Running...' : 'Run Code'}
            </button>
          </div>

          {/* Output Panel */}
          <div className="space-y-2">
            <label className="font-medium dark:text-white text-gray-900">💻 Output</label>
            <div className="bg-black text-green-400 p-3 rounded h-48 overflow-auto whitespace-pre-wrap border border-gray-700">
              <pre className="text-sm">{output}</pre>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => copyToClipboard(output, 'Output')}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-3 py-1 rounded"
              >
                📋 Copy Output
              </button>
              <button
                onClick={clearOutput}
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 rounded"
              >
                🧹 Clear Output
              </button>
            </div>
          </div>
        </Split>
      </div>
    </div>
  );
}
