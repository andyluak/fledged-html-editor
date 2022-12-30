import { InspectorControls } from "@wordpress/block-editor";
import { SelectControl } from "@wordpress/components";

function CustomInspectorControls({ props }) {
  return (
    <InspectorControls>
      <SelectControl
        label="Template"
        value={props.attributes.template}
        options={[
          { label: "React", value: "react" },
          { label: "React Typescript", value: "react-ts" },
          { label: "Typescript", value: "vanilla-ts" },
          { label: "Javascript", value: "vanilla" },
        ]}
        onChange={(newTemplate) =>
          props.setAttributes({ template: newTemplate })
        }
        __nextHasNoMarginBottom
      />
    </InspectorControls>
  );
}

export default CustomInspectorControls;
