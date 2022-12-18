import React from 'react'
import './CreateProduct.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Form from '../../components/Form/Form'

function CreateProduct() {
  return (
    <div>
        <Header />
        <div className="create-product">
            <Form />
        
        </div>
        <Footer />
    </div>
  )
}

export default CreateProduct