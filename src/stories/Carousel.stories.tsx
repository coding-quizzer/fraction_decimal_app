import Carousel from "../components/reusables/Carousel";

export default {
  title: "Carousel",
  component: Carousel,
};

const aspectRatio = "3 / 4";
const padding = 5;
// const minHeight = 75;
const height = 100;

const exampleContent = [
  <div style={{ padding, width: "fit-content" }} key="test1">
    <div
      style={{
        //width: "100%",
        height,
        aspectRatio,
        backgroundColor: "red",
      }}
    />
  </div>,

  <div style={{ padding, width: "fit-content" }} key="test2">
    <div
      style={{
        //width: "100%",

        height,
        aspectRatio: aspectRatio,
        backgroundColor: "yellow",
      }}
    />
  </div>,

  <div style={{ padding, width: "fit-content" }} key="test3">
    <div
      style={{
        height,
        //width: "100%",
        aspectRatio: aspectRatio,
        backgroundColor: "blue",
      }}
    />
  </div>,

  <div style={{ padding, width: "fit-content" }} key="test4">
    <div
      style={{
        //width: "100%",
        height,
        aspectRatio,
        backgroundColor: "red",
      }}
    />
  </div>,

  <div style={{ padding, width: "fit-content" }} key="test5">
    <div
      style={{
        //width: "100%",
        height,
        aspectRatio: aspectRatio,
        backgroundColor: "yellow",
      }}
    />
  </div>,

  <div style={{ padding, width: "fit-content" }} key="test6">
    <div
      style={{
        height,
        // width: "100%",
        aspectRatio: aspectRatio,
        backgroundColor: "blue",
      }}
    />
  </div>,

  <div style={{ padding, width: "fit-content" }} key="test7">
    <div
      style={{
        //width: "100%",
        height,
        aspectRatio: aspectRatio,
        backgroundColor: "orange",
      }}
    />
  </div>,
];

export const Default = () => (
  <Carousel unitWidth={77.5}>{exampleContent}</Carousel>
);

export const Size_3 = () => (
  <Carousel unitWidth={85} show={3} arrowMargin={5}>
    {exampleContent}
  </Carousel>
);
