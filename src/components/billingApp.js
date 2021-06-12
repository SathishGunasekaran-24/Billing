import React,{Component} from 'react';
import BillingList from './BillingList/BillingList';

const items = [
  { label: 'Food', type: 'food', price:200 },
  { label: 'Book', type: 'book', price:200 } ,
  { label: 'Drink', type: 'drink', price:200 },
  { label: 'Medicine', type: 'medicine' , price:200}
]
const itemscount = {
        food:0,
        book:0,
        drink:0,
        medicine:0
}
const items_type = {
        food:0,
        book:0,
        drink:0,
        medicine:0
}

class BillingApp extends Component{ 
  state = {
    billing_items:items,
    itemsCount:itemscount,
    itemsType:items_type,
    totalPrice: 0,
    totalTax:0
  }
  
  totalPrice(){
    var totalItemsPrice = 0;
    var totalItemsTax = 0;
    console.log(totalItemsPrice);
    for(let i=0;i<items.length;i++){
      totalItemsPrice += (items[i].price  * this.state.itemsCount[items[i].type])
    }

    for(let i=0;i<items.length;i++){
      //console.log(items[i])
      let importedTax = !this.state.itemsType[items[i].type]?0.05:0
      console.log(items[i].type,importedTax)
      if(items[i].type==='food' || items[i].type==='medicine')
      {
        totalItemsTax += (items[i].price  * this.state.itemsCount[items[i].type] * importedTax)
      }
      else{
        totalItemsTax += (items[i].price  * this.state.itemsCount[items[i].type] * (importedTax+0.10))
      }
    }

    this.setState(
      {
        totalPrice:totalItemsPrice,
        totalTax:totalItemsTax
      }
    )
    console.log(this.state.totalPrice);
  }

  addQuantities(type ,count){
    console.log(this.state.itemsType);
    //console.log(type ,count);
    const updatedCount = count+1;
    const updatedbilling_items = {
    ...this.state.itemsCount
    }
    updatedbilling_items[type]=updatedCount;
    //this.totalPrice();
    this.setState(
      {
        itemsCount:updatedbilling_items
      },
      this.totalPrice
    )//console.log(this.state.itemsCount);
  }
  
  removeQuantities(type ,count){
    console.log(type ,count);
    const updatedCount = count-1;
    const updatedbilling_items = {...this.state.itemsCount}
    updatedbilling_items[type]=updatedCount;
    this.setState(
      {
        itemsCount:updatedbilling_items
      },
      this.totalPrice
    )//console.log(this.state.itemsCount);

  }
  
  importClick(type,isImport){
    const updatedbilling_items = {
    ...this.state.itemsType
    }
    updatedbilling_items[type] = +isImport
    this.setState(
      {
        itemsType:updatedbilling_items
      }
    )
  }
  render(){
    return(
      <div>
        <h1>Market Simplified Billing App</h1>
        <p>Price: <strong>{this.state.totalPrice}</strong> </p>
        <p>Tax : <strong>{this.state.totalTax}</strong> </p>
        {
          items.map((item)=>(
            <BillingList 
              key = {item.type}
              label = {item.label}
              type = {item.type} 
              price ={item.price}
              count = {this.state.itemsCount[item.type]}
              isImported ={this.state.itemsType[item.type]}
              addQuantities={()=>this.addQuantities(item.type,this.state.itemsCount[item.type])} 
              removeQuantities={()=>this.removeQuantities(item.type,this.state.itemsCount[item.type])}
              importClick={(isImport)=>this.importClick(item.type,isImport)}/>
          ))
        }

      </div>
    );
  }
}

export default BillingApp;