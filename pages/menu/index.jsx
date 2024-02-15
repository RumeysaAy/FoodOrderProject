import axios from 'axios';

import React from 'react'
import MenuWrapper from '../../components/products/MenuWrapper'

const Index = ({ kategoriList, productList }) => {
  // console.log(productList);
  return (
    <div className="pt-10">
   
        <MenuWrapper kategoriList={kategoriList} productList={productList}/>
      
    </div>
  )
}

export const getServerSideProps = async () => {
  const ktgr = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/kategoriler`)
  const prdct = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)

  return {
    props: {
      kategoriList: ktgr.data ? ktgr.data : [],
      productList: prdct.data ? prdct.data : [],
    },
  }
}


export default Index