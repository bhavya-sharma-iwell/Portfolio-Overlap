export const SearchField = (props)=> {
  return (
    <div className="searchField">
      <label className='schemeLabel'>{props.label}</label>
        <input className="dropdownInput" type="search" placeholder='Select' value={props.scheme.scheme} onChange={(event) => { props.handleInputChange(event, props.label), props.setDropdown(true)}} onClick={() => { props.setDropdown(!props.dropdown) }} />
      <div className="dropDown">
        {props.dropdown && props.mutualFunds && props.scheme.scheme && props.mutualFunds
          .map((item) => (
            <div className="dropDown-row" key={item.schid} onClick={() => {props.setScheme({ scheme: item.shortName, id: item.schid }),props.setDropdown(false)}}>
              {item.shortName}
            </div>
          ))}
      </div>
    </div>
  )
}
export default SearchField