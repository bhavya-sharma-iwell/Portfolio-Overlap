import React from 'react'
import GraphArea from './graphArea.jsx'
import DonutChart from './donutChart.jsx'
import UpperLogo from '../public/commonStock.png'
import LowerLogo from '../public/unCommonStock.png'
import Image from 'next/image'

export default function PortfolioOverlap(props) {
  return (
      <div className='portfolioOverlap'>
            <GraphArea values={props.holdingsDetails.vennDiagram}/>
            <div className='rightDiv'>
              <div className='rightContainerA'><DonutChart values={props.holdingsDetails.overlapValue.overlapPercentage} /></div>

              <div className='rightContainerB'>
                  <div className='commonStockDiv'><Image alt="Logo" src={UpperLogo} className='commonStockIcon' /></div>
                  <span className='commonStock'>{props.holdingsDetails.overlapValue.commonHoldings}<br />
                    <div className='text'>#common stocks</div>
                  </span>
              </div>



              <div className='rightContainerC'>
          
                  <div className='unCommonStockDiv'><Image alt="Logo" src={LowerLogo} className='unCommonStockIcon' /></div>
                  <span className='unCommonStockA'>{props.holdingsDetails.overlapValue.unCommonHoldingsInA}<br />
                    <div className='text'>#uncommon stocks in A</div>
                  </span>
                  <span className='totalStockA'>{props.holdingsDetails.overlapValue.totalHoldingsInA}<br />
                    <div className='text'>#total stocks in A</div>
                  </span>
                
              </div>



              <div className='rightContainerD'>
                  <div className='unCommonStockDiv'><Image alt="Logo" src={LowerLogo} className='unCommonStockIcon' /></div>
                  <span className='unCommonStockB'>{props.holdingsDetails.overlapValue.unCommonHoldingsInB}<br />
                    <div className='text'>#uncommon stocks in B</div>
                  </span>
                  <span className='totalStockB'>{props.holdingsDetails.overlapValue.totalHoldingsInB}<br />
                    <div className='text'>#total stocks in B</div>
                  </span>
                </div>
          
            </div>

          </div>
  )
}

