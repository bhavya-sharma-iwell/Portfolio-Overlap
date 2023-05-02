import React from 'react'
import SearchField from './searchField.jsx'
import Link from 'next/link.js'

export default function FilterArea(props) {
  return (
    <>
      <SearchField
        label="Scheme A"
        setScheme={props.setSchemeA}
        scheme={props.schemeA}
        mutualFunds={props.mutualFunds}
        dropdown={props.dropdownA}
        setDropdown={props.setDropdownA}
        handleInputChange={props.handleInputChange}
      />
      <SearchField
        label="Scheme B"
        setScheme={props.setSchemeB}
        scheme={props.schemeB}
        mutualFunds={props.mutualFunds}
        dropdown={props.dropdownB}
        setDropdown={props.setDropdownB}
        handleInputChange={props.handleInputChange}
      />

     <Link href={`http://localhost:3001/?schid1=${props.schemeA.id}&schid2=${props.schemeB.id}`}> <button className='proceedButton' disabled={props.proceedDisable()} 
    //  onClick={props.handleSubmit()}
     >Go</button></Link>
    </>
  )
}
