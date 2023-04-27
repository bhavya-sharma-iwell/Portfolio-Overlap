
import React from 'react'
import { PieChart, Pie, Label,ResponsiveContainer } from "recharts"


export default function DonutChart(props) {
    
  const percentage=  props.values
  const leftPercentage=100-percentage
  const data = [
    { name: "Group C", value: percentage, fill: "#4FC9A2" },
    { name: "Group A", value: leftPercentage, fill: "#F2F2F2" },
]

    return (
        <>
            <ResponsiveContainer>
            <PieChart >

                <Pie
                    data={data}
                    cx={220}
                    cy={110}
                    innerRadius={45}
                    outerRadius={60}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={0}
                    dataKey="value"
                    >
                    
                    <Label width={30} position="center" fontWeight= '550' dx={-8} fontSize="26px">{props.values}</Label>
                    <Label width={30} position="center" fontWeight= '550' dx={20} dy={3} fontSize="20px">%</Label>

                    <Label
                    value="portfolio overlap percentage"
                    dy={20}
                    style={{
                    textAnchor: "middle",
                    fontSize: "100%",
                    fontWeight :'500',
                    fill: "rgba(0, 0, 0, 0.56)",
                    }}></Label>


                </Pie>
                
            </PieChart>
          
            </ResponsiveContainer >
            
        </>

    )
}