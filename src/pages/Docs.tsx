export default function Docs() {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">📚 OnCom Documentation</h1>

      <div className="space-y-6 text-gray-800 dark:text-gray-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2">🚀 Getting Started</h2>
          <p>Welcome to OnCom, your lightweight online code compiler! Select a language, write your code, and hit <strong>"Run Code"</strong> to see the output instantly.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">🛠️ Features</h2>
          <ul className="list-disc pl-6">
            <li>Multi-language support (Python, C++, Java, etc.)</li>
            <li>Dark and Light mode toggle</li>
            <li>Multiple tabs for different files</li>
            <li>Font size adjustment</li>
            <li>Copy, Download, and Clear code easily</li>
            <li>Custom input for programs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">💬 Tips</h2>
          <ul className="list-disc pl-6">
            <li>Use the "+" button to create new tabs.</li>
            <li>Save your code snippets locally (auto-save enabled).</li>
            <li>Resize input/output panels as you prefer!</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
