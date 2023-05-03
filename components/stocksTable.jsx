import React from 'react'
import ProgressBar from './progressBar.jsx'
import SquareIcon from '@mui/icons-material/Square'
import Link from 'next/link.js'

export default function StocksTable(props) {

  return (
    <>
      <span className='tableLabel'>Stocks Overlapping in mutual fund schemes</span>
      <div className='tableScroll'>
        <table className='styledTable'>
          <thead>
            <tr>
            <th className='tableHeading' onClick={()=>{props.sort("A")}}>{props.schemeA.scheme}<span className={props.sortTable.name!='A' ? 'sortDefault' :props.sortTable.direction==1 ?'sortAscending' : 'sortDescending'}></span></th>
              <th className='tableHeading' onClick={()=>{props.sort("asset")}}>Portfolio Overlap<span className={props.sortTable.name!='asset' ? 'sortDefault' :props.sortTable.direction==1 ?'sortAscending' : 'sortDescending'}></span></th>
              <th className='tableHeading' onClick={()=>{props.sort("B")}}>{props.schemeB.scheme}<span className={props.sortTable.name!='B' ? 'sortDefault' :props.sortTable.direction==1 ?'sortAscending' : 'sortDescending'}></span></th>
            </tr>
          </thead>
          <tbody className='scroll'>
            {
              props.holdingsDetails && props.holdingsDetails.holding.map(item => <tr className='tableRow'>
                <td className='tableData'><SquareIcon style={{ color: '#5275E9', width: '15px', float: 'left' }} /><span className='icons'>{item.holdingsA}</span><span className='percentageLeft'>{item.netAssetA}%</span></td>
                <td className='progressColoumn tableData'>
                  <ProgressBar
                    bgcolor="#5275E9"
                    progress={item.netAssetA >= 1 ? Math.min((item.netAssetA + item.netAssetB) * 10 / (item.netAssetB < 1 ? 1 : item.netAssetB),100) : item.netAssetA * 10}
                    height={7}
                  />
                  <ProgressBar
                    bgcolor="#F8432B"
                    progress={item.netAssetB >= 1 ? Math.min((item.netAssetA + item.netAssetB) * 10 / (item.netAssetA < 1 ? 1 : item.netAssetA),100) : item.netAssetB * 10}
                    height={7}
                  /></td>
                <td className='tableData'><SquareIcon style={{ color: '#F8432B', width: '15px', float: 'left' }} /><span className='icons'>{item.holdingsB}</span><span className='percentageRight'>{item.netAssetB}%</span></td>
              </tr>)
            }

          </tbody></table>
      </div>
    </>
  )
}
