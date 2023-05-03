import React, { useState } from 'react'
import axios from 'axios'
import FilterArea from '../components/filterArea.jsx'
import StocksTable from '../components/stocksTable.jsx'
import PortfolioOverlap from '../components/portfolioOverlap.jsx'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
  try {
    const{schemeA,schemeB,name,direction} = context.query
    let holdingsDetails = await axios
      .get('http://localhost:3000/getPortfolioOverlap', {
        params: { schid1: schemeA, schid2: schemeB },
      })
      .then((res) => (res.data && res.data.status === 0 ? res.data.result : null));
      if(name){
      let obj=[...holdingsDetails.holding]
      name=="A" && obj.sort((a, b) => (a.holdingsA > b.holdingsA) ? ((direction=="true") ? 1 :-1) : ((direction=="true") ? -1 :1))
      name=="B" && obj.sort((a, b) => (a.holdingsB > b.holdingsB) ? ((direction=="true") ? 1 :-1) : ((direction=="true") ? -1 :1))
      name=="asset" && obj.sort((a, b) => (Math.min(a.netAssetA,a.netAssetB) > Math.min(b.netAssetA,b.netAssetB)) ? ((direction=="true") ? 1 :-1) : ((direction=="true") ? -1 :1))
      holdingsDetails={holding:obj,vennDiagram:holdingsDetails.vennDiagram,overlapValue:holdingsDetails.overlapValue}
    }
    return { props: { holdingsDetails } };
  } catch (error) {
    console.error(error);
    return { props: { holdingsDetails: null } };
  }
}

export default function Index({holdingsDetails}){
  const [loading, setLoading] = useState(false)
  // const [holdingsDetails, setHoldingsDetails] = useState(holdingsDetails)
  const [clearInputA,setClearInputA] = useState(false)
  const [clearInputB,setClearInputB] = useState(false)
  const [dropdownA, setDropdownA] = useState(true)
  const [dropdownB, setDropdownB] = useState(true)
  const [schemeA, setSchemeA] = useState({})
  const [schemeB, setSchemeB] = useState({})
  const [mutualFunds, setMutualFunds] = useState('')
  const [debounce, setDebounce] = useState()
  const [sortTable,setSortTable]=useState({name:"",direction:2})
  const router = useRouter()
  const handleInputChange = (event, label) => {
    let debounceTimer = debounce
    clearTimeout(debounceTimer)
    const name = event.target.value
    console.log(name)
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
        setSchemeA({ scheme: name, id: 0 ,goButton:false})
        setClearInputA(true)
        break
      case "Scheme B":
        setSchemeB({ scheme: name, id: 0 ,goButton:false})
        setClearInputB(true)
        break
    }
  }

// {holdingsDetails && setSchemeA({ scheme: schemeA.scheme, id: schemeA.id ,goButton:true})}
  const handleSubmit = () => {
    // setLoading(true);
    // axios.get(`http://localhost:3000/getPortfolioOverlap`, { params: { schid1: schemeA.id, schid2: schemeB.id } })
    //   .then(res => {
    //     if (res.data && res.data.status == 0) {
    //       setHoldingsDetails(res.data.result)
    //       setLoading(false);
    //       setSortTable({name:"",direction:2})
    //     }
    //   })
    // setSchemeA({ scheme: schemeA.scheme, id: schemeA.id ,goButton:true})
    // setSchemeB({ scheme: schemeB.scheme, id: schemeB.id ,goButton:true})
    // const Router=useRouter()
    // Router.push(`http://localhost:3001/?schemeA=${schemeA.id}&schemeB=${schemeB.id}`)

  }
  
  const proceedDisable = () => {
    if (schemeA.id > 0 && schemeB.id > 0)
      return false
    else
      return true
  }


  const sort=(holding)=>{
    
    let obj=[...holdingsDetails.holding]
    holding=="A" && obj.sort((a, b) => (a.holdingsA > b.holdingsA) ? (sortTable.direction ? 1 :-1) : (sortTable.direction ? -1 :1))
    holding=="B" && obj.sort((a, b) => (a.holdingsB > b.holdingsB) ? (sortTable.direction ? 1 :-1) : (sortTable.direction ? -1 :1))
    holding=="asset" && obj.sort((a, b) => (Math.min(a.netAssetA,a.netAssetB) > Math.min(b.netAssetA,b.netAssetB)) ? (sortTable.direction ? 1 :-1) : (sortTable.direction ? -1 :1))
    // setHoldingsDetails({holding:obj,vennDiagram:holdingsDetails.vennDiagram,overlapValue:holdingsDetails.overlapValue})
   
    router.push(`http://localhost:3001/?schemeA=${schemeA.id}&schemeB=${schemeB.id}&name=${holding}&direction=${sortTable.direction}`)
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
          handleSubmit={handleSubmit}
          proceedDisable={proceedDisable}
          dropdownA={dropdownA}
          setDropdownA={setDropdownA}
          dropdownB={dropdownB}
          setDropdownB={setDropdownB}
          handleInputChange={handleInputChange}
        />
      </div>
      {loading ? <div className='loader' /> : <> 
     {holdingsDetails && <PortfolioOverlap holdingsDetails={holdingsDetails} />}   {holdingsDetails && <StocksTable holdingsDetails={holdingsDetails} schemeA={schemeA} schemeB={schemeB} sort={sort} sortTable={sortTable}/>} 
      </>}
    </div>
    </>
  )
}