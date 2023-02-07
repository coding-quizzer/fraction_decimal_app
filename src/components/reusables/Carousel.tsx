import { useState, useEffect } from "react";
import "./Carousel.scss";

type CarouselProps = {
  children: React.ReactNode[];
  show?: number;
  unitWidth?: number;
  arrowMargin?: number;
};
const Carousel = (props: CarouselProps) => {
  const { children } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  const [show, setShow] = useState(props.show || 1);
  const [arrowMargin, setArrowMargin] = useState(props.unitWidth || 0);
  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  useEffect(() => setLength(children.length), [children]);
  useEffect(() => setShow(props.show || 1), [props.show]);
  useEffect(() => setArrowMargin(props.arrowMargin || 0), [props.arrowMargin]);

  return (
    <div
      className="carousel-container"
      style={{
        width: props.unitWidth && props.unitWidth * show,
      }}
    >
      <div className="carousel-wrapper">
        {currentIndex > 0 && (
          <button
            className="left-arrow"
            onClick={prev}
            style={{ left: arrowMargin }}
          >
            &lt;
          </button>
        )}
        <div className="carousel-content-wrapper">
          <div
            className="carousel-content"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: props.unitWidth,
            }}
          >
            {children}
          </div>
        </div>
        {currentIndex < length - show && (
          <button
            className="right-arrow"
            onClick={next}
            style={{ right: arrowMargin }}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
