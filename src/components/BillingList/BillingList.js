import React,{Component} from 'react';
import './BillingList.css';

class BillingList extends Component{
  render(){

    return(
      <div>
        <div className="BillingDiv">
        <div className="Label">{this.props.label}</div>
        <div className="Label">{this.props.isImported}</div>
        <div className="Label">{this.props.count}</div>
        <div>
        <input type="radio" name={this.props.type}  
                value="0" 
                id = "Imported"
                checked={this.props.isImported?false:true} 
                onChange ={(event)=>this.props.importClick(event.target.value)}
                 />
                <label htmlFor="Imported">Imported{this.props.isImported}</label>
        </div>
        <div>
        <input type="radio" name={this.props.type} 
                value="1"
                id="Non-Imported"
                checked={this.props.isImported===1?true:false}
                onChange ={(event)=>this.props.importClick(event.target.value)} 
                 />
                <label htmlFor="Non-Imported">Non-Imported</label>
        </div>
        <button className="Less" disabled={this.props.count===0?true:false} 
        onClick ={this.props.removeQuantities} >-</button>
        <button className="More" onClick ={this.props.addQuantities} >+</button>
        <div className="Label">{this.props.count * this.props.price}</div>
        </div>
      </div>
    );
  }
}

export default BillingList;