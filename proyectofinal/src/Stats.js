import { useState, useEffect } from "react"

import "./Stats.css"


const Stats = () => {
    const [sales, setSales] = useState([])

    useEffect(() => {
        fetch("/sales")
          .then((res) => res.json())
          .then((res) => {
            setSales(res)
          })
      }, [])
  
    const showStats = sales.map((item) => {
      return (
        <div className="statsItem">
                <div>
                    <img src={item.productImg} alt="" />
                </div>
                <div className="statsItemText">

                    <div>
                        <h1>{item.productName}</h1>
                        <p>{item.productDescription}</p>
                        <p>{item.productPrize}€</p>
                        <p>Total vendidos: {item.cantidad}</p>
                    </div>
                </div>
            </div>
      )
    })
  
    return (
      <div className="Stats">
        <div className="statsCards">
          {showStats}
        </div>
      </div>
    )
  }
  
  export default Stats;