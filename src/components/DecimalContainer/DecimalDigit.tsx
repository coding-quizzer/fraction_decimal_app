import { useEffect, useRef, useState } from "react";
import {
  arrow,
  offset,
  useFloating,
  useHover,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";
import { Fraction } from "../../helpers/fractionDecimalFunctions";
import "./DecimalDigit.scss";
import NumberContainer from "../reusables/NumberContainer";
type DecimalDigitProps = {
  children: number;
  fraction: Fraction;
};

export default function DecimalDigit(props: DecimalDigitProps) {
  const [isOpen, setIsOpen] = useState(false);

  const arrowRef = useRef(null);

  const { x, y, strategy, refs, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      arrow({
        element: arrowRef,
      }),
    ],
  });
  // useEffect(() => {
  //   console.log(arrow({ element: arrowRef }));
  // }, [arrowRef]);

  const [arrowCoords, setArrowCoords] = useState({
    x: middlewareData.arrow?.x,
    y: middlewareData.arrow?.y,
  });

  useEffect(() => {
    setArrowCoords({ x: middlewareData.arrow?.x, y: middlewareData.arrow?.y });
  }, [middlewareData.arrow?.x, middlewareData.arrow?.y]);

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const { fraction } = props;

  return (
    <>
      <NumberContainer
        ref={refs.setReference}
        className={"decimal-digit"}
        width={36}
        {...getReferenceProps()}
      >
        {props.children}
      </NumberContainer>
      <FloatingPortal>
        {isOpen && (
          <div
            className="decimal-digit--popper"
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: "max-content",
            }}
            {...getFloatingProps()}
          >
            {`${fraction[0]} / ${fraction[1]}`}
            <div
              data-popper-arrow
              className="decimal-digit--popper-arrow"
              ref={arrowRef}
              style={{
                left: arrowCoords.x ? `${arrowCoords.x}px` : "",
                top: arrowCoords.y ? `${arrowCoords.y}px` : "",
              }}
            />
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
