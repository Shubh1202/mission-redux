import React from "react";
import ReactDOM from "react-dom/client"
import App from "./App"
const getRootElement = document.getElementById("root")
const element = ReactDOM.createRoot(getRootElement)

element.render(<App />)