import React, { useState } from "react";

function App() {
  const [msg] = useState("Your Custom UI Is Working!");

  return (
    <div style={{ padding: 30, fontFamily: "Arial, sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
      <h1>{msg}</h1>
      <p>Edit this file to build your app’s interface.</p>
    </div>
  );
}

export default App;
