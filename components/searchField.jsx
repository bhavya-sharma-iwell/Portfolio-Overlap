import React from 'react'

export default function SearchField(props) {
  return (
    <div className="searchField">
      <label className='schemeLabel'>{props.label}</label>
      <div className='dropdownInputOuter'>
        <input className="dropdownInput" type="text" value={props.scheme.scheme} onChange={(event) => { props.handleInputChange(event, props.label), props.setDropdown(true) }} />
        <svg className ='svg' height="20" width="20" viewBox="0 0 20 20" onClick={() => { props.setDropdown(!props.dropdown) }}>
          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
        {props.scheme.scheme && <span className='clearInput' onClick={()=>props.setScheme({ scheme: '', id: 0 })}>X</span>}
      </div>
      <div className="dropDown">
        {props.dropdown && props.mutualFunds && props.scheme.scheme && props.mutualFunds
          .map((item) => (
            <div
              onClick={() => {
                props.setScheme({ scheme: item.orgsch, id: item.schid })
                props.setDropdown(false)
              }}
              className="dropDown-row"
              key={item.schid}
            >
              {item.orgsch}
            </div>
          ))}
      </div>

    </div>
  )
}



