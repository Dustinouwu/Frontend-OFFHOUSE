import React from 'react'
import './SubscriptionBar.css'
import { Link } from 'react-router-dom'
function SubscriptionBar() {
  return (
    <div>
      <div className="subscriptionbarcontainer">
        <div className="col-sbar"></div>
        <div className='txt-sbar'>
          
          <h4>Para que tus producto sean visibles dentro de la plataforma contrata una suscripción </h4>
          <div className="col2-sbar"></div>
          <Link to='/' className='btn-sbar'>Ver más</Link>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionBar