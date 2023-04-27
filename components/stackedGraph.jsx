import React from 'react';

export default function StackedGraph(props) {
    const divArray = [10,9,8,7,6,5,4,3,2,1];
    const white = "#EBEBEB";

    const colorGraph=(num)=>{
        const intervalSize = 10;
        const index = Math.floor(num / intervalSize);
        const decimalPart = (num % intervalSize) / intervalSize;
        return index + decimalPart +1;
      }

  
    return (
      <>
        <span style={{ color: props.color, fontWeight: "bold" }}>{props.value}%
        </span>
        {divArray.map((item, index) => (
          <div className="bar" key={index}>
            <span
              className="barGraphRight"
              style={{
                backgroundColor:
                (item < colorGraph(props.value))? props.color : white,
              }}
            ></span>
            <span
              className="barGraphLeft"
              style={{
                backgroundColor:
                ((item + 1) <= colorGraph(props.value)) ? props.color : white,
              
              }}
            ></span>
          </div>
        ))}
      </>
    );
  }
  