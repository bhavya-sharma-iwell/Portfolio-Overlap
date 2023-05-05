export const ProgressBar=(props)=>{
  const outerBar = {
    height: 7,
    width: "80%",
    margin: 2
  };
  const innerBar = {
    height: "100%",
    width: `${props.progress}%`,
    backgroundColor: props.bgcolor,
    textAlign: "right"
  };
  return (
    <div style={outerBar}>
      <div style={innerBar}></div>
    </div>
  );
}
export default ProgressBar