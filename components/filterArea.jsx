import { Fragment } from 'react'
import SearchField from './searchField.jsx'
import Link from 'next/link.js'

export const FilterArea = (props) => {
  return (
    <Fragment>
      <SearchField
        label="Scheme A"
        clearInput={props.clearInputA}
        setClearInput={props.setClearInputA}
        setScheme={props.setSchemeA}
        scheme={props.schemeA}
        mutualFunds={props.mutualFunds}
        dropdown={props.dropdownA}
        setDropdown={props.setDropdownA}
        handleInputChange={props.handleInputChange}
      />
      <SearchField
        label="Scheme B"
        clearInput={props.clearInputB}
        setClearInput={props.setClearInputB}
        setScheme={props.setSchemeB}
        scheme={props.schemeB}
        mutualFunds={props.mutualFunds}
        dropdown={props.dropdownB}
        setDropdown={props.setDropdownB}
        handleInputChange={props.handleInputChange}
      />
      <Link href={`http://localhost:3001/?schemeAId=${props.schemeA.id}&schemeBId=${props.schemeB.id}&schemeAName=${props.schemeA.scheme}&schemeBName=${props.schemeB.scheme}`}>
        <button className='proceedButton' disabled={props.proceedDisable()}>Go</button>
      </Link>
    </Fragment>
  )
}
export default FilterArea