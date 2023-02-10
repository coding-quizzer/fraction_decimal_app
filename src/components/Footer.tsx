import { useFloating, useHover, useInteractions } from "@floating-ui/react";
import { useState } from "react";
import "./footer.scss";
const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
  return (
    <footer id="main-footer">
      {isOpen && (
        <section
          id="main-footer--popper"
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: "max-content",
          }}
          {...getFloatingProps}
        >
          Visit GitHub Repository
        </section>
      )}
      <a
        href="https://github.com/coding-quizzer/fraction_decimal_app"
        ref={refs.setReference}
        {...getReferenceProps}
      >
        <img className="github-lightmode" src="github-mark.svg"></img>
        <img className="github-darkmode" src="github-mark-white.svg"></img>
      </a>
    </footer>
  );
};

export default Footer;
