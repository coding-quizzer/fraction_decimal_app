import DecimalContainer from "../components/DecimalContainer";
import "../index.css";
export default {
  title: "DecimalContainer",
  component: DecimalContainer,
};
export const Default = () => <DecimalContainer fraction={[1, 1001]} />;
