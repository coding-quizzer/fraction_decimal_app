import React from "react";
import "./NumberContainer.scss";

type NumberContainerProps = {
  children: React.ReactNode;
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  ref?: React.LegacyRef<HTMLDivElement>;
  className?: string;
  width?: number;
  background?: string;
};

const NumberContainer = React.forwardRef(function (
  props: NumberContainerProps,
  ref: React.LegacyRef<HTMLDivElement>
) {
  const { onMouseOver, onMouseLeave, className, children } = props;

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      ref={ref}
      className={className + " number-container"}
      style={{ width: props.width, background: props.background }}
      // {...props}
    >
      {children}
    </div>
  );
});

NumberContainer.displayName = "Number_Container";

export default NumberContainer;
