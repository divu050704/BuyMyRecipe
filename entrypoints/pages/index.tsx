import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Hello from My Chrome Extension Page!</h1>
      <p>This is a React (TSX) page built with WXT.</p>
    </div>
  );
}

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(<App />);
