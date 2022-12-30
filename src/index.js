import Playground from "agney-alex-code-playground";
// import Playground from '../../../../../../../../Github/playground';
import CustomInspectorControls from "./components/admin/InspectorControls";

wp.blocks.registerBlockType("fully-fledged/fully-fledged-html-editor", {
  title: "Fully Fledged HTML Editor",
  icon: "editor-code",
  category: "common",
  attributes: {
    snippet: {
      type: "object",
      default: {
        markup: `<h1>Hello World</h1>`,
        css: `h1 {color: blue;}`,
      },
    },
  },
  edit: EditComponent,
  save: function () {
    return null;
  },
});

function EditComponent(props) {
  const onCodeChange = (code, type) => {
    props.setAttributes({
      snippet: {
        ...props.attributes.snippet,
        [type]: code,
      },
    });
  };
  return (
    <>
      <CustomInspectorControls props={props} />
      <Playground
        id="example"
        initialSnippet={props.attributes.snippet}
        defaultEditorTab="markup"
        transformJs
        onChange={onCodeChange}
        showConsole={false}
      />
    </>
  );
}
