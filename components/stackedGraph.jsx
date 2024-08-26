import { Fragment } from "react";

export const StackedGraph = (props) => {
  const white = "#EBEBEB";
  const index = Math.floor(props.value / 10);
  const decimalPart = (props.value % 10) / 10;
  const colorIndex = index + decimalPart + 1;
  return (
    <Fragment>
      <span style={{ color: props.color, fontWeight: "bold" }}>
        {props.value}%
      </span>
      {(() => {
        const elements = [];
        for (let index = 10; index > 0; index--) {
          let barGraphRightColor = white;
          let barGraphLeftColor = white;
          if (index < colorIndex) {
            barGraphRightColor = props.color;
          }
          if (index + 1 <= colorIndex) {
            barGraphLeftColor = props.color;
          }
          elements.push(
            <div className="bar" key={index}>
              <span
                className="barGraphRight"
                style={{ backgroundColor: barGraphRightColor }}
              ></span>
              <span
                className="barGraphLeft"
                style={{ backgroundColor: barGraphLeftColor }}
              ></span>
            </div>
          );
        }
        return elements;
      })()}
    </Fragment>
  );
}

export default StackedGraph;
