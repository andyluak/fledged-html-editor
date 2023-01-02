import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { useIntersectionObserver } from "./components/useIntersectionObserver";

const Playground = React.lazy(() => import("agney-alex-code-playground"));

document.addEventListener("DOMContentLoaded", () => {
  const divsToUpdate = document.querySelectorAll(".code-editor-attributes");

  divsToUpdate.forEach((div) => {
    const data = JSON.parse(div.querySelector("pre").innerText);
    ReactDOM.render(<OurComponent {...data} />, div);
    div.classList.remove("code-editor-attributes");
  });
});

function OurComponent(props) {
  const playgroundRef = React.useRef(null);
  const isIntersection = useIntersectionObserver(playgroundRef, {
    rootMargin: "0px 0px 0px 0px",
    root: null,
    threshold: 0.1,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className="bg-amber-200 border-2 border-amber-300 p-4 my-3 rounded shadow-md"
        ref={playgroundRef}
      >
        {!isIntersection ? null : (
          <Playground
            id="example"
            initialSnippet={props.snippet}
            defaultEditorTab="markup"
            transformJs
            showConsole={false}
          />
        )}
      </div>
    </Suspense>
  );
}
