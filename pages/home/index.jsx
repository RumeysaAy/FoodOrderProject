import React from 'react';
import About from '../../components/About';
import Campaigns from '../../components/Campaigns';
import Carousel from '../../components/Carousel';
import Customers from '../../components/customers/Customers';
import MenuWrapper from '../../components/products/MenuWrapper';
import Reservation from '../../components/Reservation';

const Index = ( { kategoriList, productList } ) => {
  
  return  (
 
<React.Fragment>
      
      <Carousel />
      <Campaigns/>
      <MenuWrapper kategoriList={kategoriList} productList={productList}/>
      <About/>
      <Reservation/>
      <Customers/>

</React.Fragment>
   
      
    

  );
};




export default Index;
