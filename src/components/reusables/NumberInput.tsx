import React from "react";
import "./NumberInput.scss";
type NumberInputProps = {
  name: string;
  value: number | null;
  setValue: (value: number | null) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(props, ref) {
    const { name, value, setValue, onKeyDown } = props;
    return (
      <input
        name={name}
        value={value ? value : ""}
        onChange={(e) => {
          (!e.target.value || Number(e.target.value)) &&
            setValue(Number(e.target.value));
        }}
        onKeyDown={onKeyDown}
        type="number"
        className="number-input"
        style={{
          width: value ? `${String(value).length * 0.6 + 1.4}em` : "2em",
        }}
        min={1}
        ref={ref}
      />
    );
  }
);

NumberInput.displayName = "Number_Input";

export default NumberInput;
