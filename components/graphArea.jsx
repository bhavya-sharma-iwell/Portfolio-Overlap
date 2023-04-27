import React from 'react'
import StackedGraph from './stackedGraph.jsx'

export default function GraphArea(props) {
  
  return (
    <div className='leftDiv'>
        <div className='vennDiagramLeftLabel'><p>SCHEME A</p></div>

      
        <div className="vennDiagramLeft">
              <div className='sideLabel'>%  WEIGHT</div>
              <div className='graphA'>
                  <StackedGraph  value = {props.values.holdingAOnlyNetAsset} colorGraph={props.colorGraph} color = {"#39B0DC"}/>
              </div> 
              <div className='graphALabel'>IN SCHEME A NOT IN SCHEME B</div>



              <div className='commonGraphA'>
                <StackedGraph  value = {props.values.commonHoldingA} colorGraph={props.colorGraph} color = {"#39B0DC"}/>
              </div>
              <div className='commonGraphB'>
                <StackedGraph  value = {props.values.commonHoldingsB} colorGraph={props.colorGraph} color = {"#F15562"}/>
              </div>

              <div className='commonGraphLabel'>COMMON STOCKS</div>

        </div>

        <div className='vennDiagramRightLabel'><p>SCHEME B</p></div>
        <div className="vennDiagramRight">
          <div className='graphB'>
              <StackedGraph  value = {props.values.holdingBOnlyNetAsset} colorGraph={props.colorGraph} color = {"#F15562"}/>
          </div>
          <div className='graphBLabel'>IN SCHEME B NOT IN SCHEME A</div>

        </div>
        <span className='vennLabel'>Note : The Venn Diagram potrays portfolio Overlap between Scheme A and B. Cash is not included</span>
  
  </div>
  )
}
