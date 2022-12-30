import React from "react";
import ReactDOM from "react-dom";
import Playground from "agney-alex-code-playground";

document.addEventListener("DOMContentLoaded", () => {
  const divsToUpdate = document.querySelectorAll(".code-editor-attributes");

  divsToUpdate.forEach((div) => {
    const data = JSON.parse(div.querySelector("pre").innerText);
    ReactDOM.render(<OurComponent {...data} />, div);
    div.classList.remove("code-editor-attributes");
  });
});

function OurComponent(props) {
  return (
    <div className="bg-amber-200 border-2 border-amber-300 p-4 my-3 rounded shadow-md">
      <Playground
        id="example"
        initialSnippet={props.snippet}
        defaultEditorTab="markup"
        transformJs
        showConsole={false}
      />
    </div>
  );
}
