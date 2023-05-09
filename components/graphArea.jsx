import StackedGraph from './stackedGraph.jsx'

export const GraphArea = (props)=>{
  return (
    <div className='leftDiv'>
        <div className='vennDiagramLeftLabel'><p>SCHEME A</p></div>
        <div className='vennDiagramRightLabel'><p>SCHEME B</p></div>
        <div className="vennDiagramLeft">
            <div className='sideLabel'>%  WEIGHT</div>
            <div className='graphALabel'>IN SCHEME A NOT IN SCHEME B</div>
            <div className='commonGraphLabel'>COMMON STOCKS</div>
            <div className='graphA'><StackedGraph value={props.values && props.values.holdingAOnlyNetAsset && props.values.holdingAOnlyNetAsset} colorGraph={props.colorGraph && props.colorGraph} color={"#39B0DC"}/></div>
            <div className='commonGraphA'><StackedGraph value={props.values && props.values.commonHoldingA && props.values.commonHoldingA} colorGraph={props.colorGraph && props.colorGraph} color={"#39B0DC"}/></div>
            <div className='commonGraphB'><StackedGraph value={props.values && props.values.commonHoldingsB && props.values.commonHoldingsB} colorGraph={props.colorGraph && props.colorGraph} color={"#F15562"}/></div>
        </div>
        <div className="vennDiagramRight">
            <div className='graphBLabel'>IN SCHEME B NOT IN SCHEME A</div>
            <div className='graphB'><StackedGraph value={props.values && props.values.holdingBOnlyNetAsset && props.values.holdingBOnlyNetAsset} colorGraph={props.colorGraph && props.colorGraph} color={"#F15562"}/></div>
        </div>
        <span className='vennLabel'>Note : The Venn Diagram potrays portfolio Overlap between Scheme A and B. Cash is not included</span>
    </div>
  )
}
export default GraphArea