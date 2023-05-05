import { Fragment } from "react";

export const StackedGraph = (props) => {
  const white = "#EBEBEB";
  const colorGraph = (num) => {
    const intervalSize = 10;
    const index = Math.floor(num / intervalSize);
    const decimalPart = (num % intervalSize) / intervalSize;
    return index + decimalPart + 1;
  }
  return (
    <Fragment>
      <span style={{ color: props.color, fontWeight: "bold" }}>{props.value}%</span>
      {(() => {
        const elements = [];
        for (let index = 10; index > 0; index--) {
          elements.push(<div className="bar" key={index}>
            <span
              className="barGraphRight"
              style={{
                backgroundColor:
                  (index < colorGraph(props.value)) ? props.color : white,
              }}>
            </span>
            <span
              className="barGraphLeft"
              style={{
                backgroundColor:
                  ((index + 1) <= colorGraph(props.value)) ? props.color : white,
              }}>
            </span>
          </div>);
        }
        return elements;
      })()}
    </Fragment>
  );}
export default StackedGraph