import React from "react";
import Layout from "@theme/Layout";
const fs = require("fs");

// Specify the path to your JavaScript file
const filePath = "./src/scripts/fullstory.js";

// Read the content of the JavaScript file
const js_snippet = fs.readFileSync(filePath, "utf-8");

export default function Hello() {
  return (
    <Layout title="Hello" description="Hello React Page">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "20px",
        }}
      >
        <p>Nothing to see here</p>
      </div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: js_snippet }}
      />
    </Layout>
  );
}
