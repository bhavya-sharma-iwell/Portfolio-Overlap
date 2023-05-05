import React, { useState } from 'react'
import axios from 'axios'
import FilterArea from '../components/filterArea.jsx'
import StocksTable from '../components/stocksTable.jsx'
import PortfolioOverlap from '../components/portfolioOverlap.jsx'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
  try {
    const{schemeAId,schemeBId,name,direction,schemeAName,schemeBName} = context.query
  
    let holdingsDetails = await axios
      .get('http://localhost:3000/getPortfolioOverlap', {
        params: { schid1: schemeAId, schid2: schemeBId },
      })
      .then((res) => (res.data && res.data.status === 0 ? res.data.result : null));
      if(name){
      let obj=[...holdingsDetails.holding]
      name=="A" && obj.sort((a, b) => (a.holdingsA > b.holdingsA) ? ((direction=="true") ? 1 :-1) : ((direction=="true") ? -1 :1))
      name=="B" && obj.sort((a, b) => (a.holdingsB > b.holdingsB) ? ((direction=="true") ? 1 :-1) : ((direction=="true") ? -1 :1))
      name=="asset" && obj.sort((a, b) => (Math.min(a.netAssetA,a.netAssetB) > Math.min(b.netAssetA,b.netAssetB)) ? ((direction=="true") ? 1 :-1) : ((direction=="true") ? -1 :1))
      holdingsDetails={holding:obj,vennDiagram:holdingsDetails.vennDiagram,overlapValue:holdingsDetails.overlapValue}
    }
    if(holdingsDetails)   return { props: { holdingsDetails,schemeAName,schemeBName,schemeAId,schemeBId } }
    else      return { props: { holdingsDetails} }
  } catch (error) {
    console.error(error);
    return { props: { holdingsDetails: null } };
  }
}

export default function Index({holdingsDetails,schemeAName,schemeBName,schemeAId,schemeBId}){
  const [loading, setLoading] = useState(false)
  const [clearInputA,setClearInputA] = useState(false)
  const [clearInputB,setClearInputB] = useState(false)
  const [dropdownA, setDropdownA] = useState(true)
  const [dropdownB, setDropdownB] = useState(true)
  const [schemeA, setSchemeA] = useState({})
  const [schemeB, setSchemeB] = useState({})
  const [mutualFunds, setMutualFunds] = useState('')
  const [debounce, setDebounce] = useState()
  const [sortTable,setSortTable]=useState({name:"",direction:true})
  const router = useRouter()
  const handleInputChange = (event, label) => {
    let debounceTimer = debounce
    clearTimeout(debounceTimer)
    const name = event.target.value
    debounceTimer = setTimeout(() => {
      axios
        .get(`http://localhost:3000/getSchemes`, { params: {schemeName: name } })
        .then((res) => {
          if (res.data && res.data.status == 0) {
            setMutualFunds(res.data.result);
          } else {
            setMutualFunds();
          }
        })
    }, 600)
    setDebounce(debounceTimer)
    switch (label) {
      case "Scheme A":
        setSchemeA({ scheme: name, id: 0})
        break
      case "Scheme B":
        setSchemeB({ scheme: name, id: 0})
        break
    }
  }

  
  const proceedDisable = () => {
    if (schemeA.id > 0 && schemeB.id > 0)
      return false
    else
      return true
  }


  const sort=(holding)=>{
    router.push(`http://localhost:3001/?schemeAId=${schemeAId}&schemeBId=${schemeBId}&name=${holding}&direction=${sortTable.direction}&schemeAName=${schemeAName}&schemeBName=${schemeBName}`)
    setSortTable({name:holding,direction:!(sortTable.direction)})
  }

  return (
    <>
    <title>Portfolio Overlap</title>
    <div className='outerContainer '>
      <h3 className='info'> Diversity the holding across different categories of fund investing in different asset classes after comparing the portfolio of various fund houses
        to avoid portfolio overlap</h3>
      <div className='filterArea'>
        <FilterArea
          clearInputA={clearInputA}
          setClearInputA={setClearInputA}
          clearInputB={clearInputB}
          setClearInputB={setClearInputB}
          mutualFunds={mutualFunds}
          setSchemeA={setSchemeA}
          schemeA={schemeA}
          setSchemeB={setSchemeB}
          schemeB={schemeB}
          proceedDisable={proceedDisable}
          dropdownA={dropdownA}
          setDropdownA={setDropdownA}
          dropdownB={dropdownB}
          setDropdownB={setDropdownB}
          handleInputChange={handleInputChange}
        />
      </div>
      {loading ? <div className='loader' /> : <> 
     {holdingsDetails && <PortfolioOverlap holdingsDetails={holdingsDetails} />}   {holdingsDetails && <StocksTable holdingsDetails={holdingsDetails} sort={sort} sortTable={sortTable} schemeAName={schemeAName} schemeBName={schemeBName}/>} 
      </>}
    </div>
    </>
  )
}