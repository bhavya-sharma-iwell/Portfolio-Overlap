import React from "react";

export default function ProgressBar(props) {
  const outerBar = {
    height: 7,
    width: "80%",
    margin:2    
  };

  const innerBar = {
    height: "100%",
    width: `${props.progress}%`,
    backgroundColor: props.bgcolor,
    textAlign: "right"
  };
const Percentage={
  fontSize:"10px",
  color:props.bgcolor,
  fontWeight:"bold",
  float:"right",
};
  return (
    < >
      <span style={Percentage}>{props.value}</span>
      <div style={outerBar}>
      <div style={innerBar}></div>   
      </div>
    </>

    
  );

}

