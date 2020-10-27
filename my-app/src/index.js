import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './chefhero_logo_white.png';
import dateFormat from 'dateformat';



class SupplierComponent extends React.Component{
  constructor(props){
    super();

    this.state={
      value:"",
      listOfSuppliers:[],
      filteredTable:[],
      whoIsChecked:{
        allowDestroyAll: "placeHolder"
      }
    }
    
  }
 
  

  componentDidMount(){
    fetch("https://chefhero.free.beeceptor.com/").then(res=>res.json())
    //.then(({results:listOfSuppliers})=>this.setState({listOfSuppliers}))
  .then(
      result=>{
        this.setState({listOfSuppliers:result.data,filteredTable:result.data});
      }
    )    
  }


  handleChange(event){
    debugger;
    if(event.target.value=="placeHolder"){
    this.setState({filteredTable:this.state.listOfSuppliers});
    this.state.whoIsChecked.allowDestroyAll=event.target.value.trim();
    }
    else{
     this.setState({filteredTable:this.state.listOfSuppliers.filter(function(result){
     return result.vendorName.trim()===event.target.value.trim();
     })});
     this.state.whoIsChecked.allowDestroyAll=event.target.value.trim();
    }
     
     }
     resetFilter(event)
     {
      this.setState({filteredTable:this.state.listOfSuppliers});
      this.state.whoIsChecked.allowDestroyAll="placeHolder";
      
     }
  render(){         
    let vendorList=[];
    for(var data in this.state.listOfSuppliers)
    {
      var flag=false;
      if(vendorList.Count==0)
      flag=true;
      else
      for(var l in vendorList)
      {
        if(vendorList[l].vendorName.trim()==this.state.listOfSuppliers[data].vendorName.trim())
        flag=true;
      }
      if(!flag)
      vendorList.push({vendorName:this.state.listOfSuppliers[data].vendorName});
    }

    
    return (
      <div>
        <nav>
        <img src={logo} class="Logo"></img>
        </nav>
        <div class="filterDiv">
          <div class="filter">
            <div>Supplier<br/></div>
            <div>
            <br/><br/>
            <select value={this.state.whoIsChecked.allowDestroyAll} onChange={(e)=>this.handleChange(e)}>            
            <option value="placeHolder">All Suppliers</option> 
            {vendorList.map(sup=>(                             
                <option value={sup.vendorName}>{sup.vendorName}</option>
              ))}              
            </select>
            </div>
            <div><br/><br/><button onClick={(e)=>this.resetFilter(e)}>Reset Filter</button></div>
          </div>
        </div>
        <div class="tableDiv">
      <table>
        <thead>
          <tr>
            <td>STATUS</td>
            <td>DELIVERY DAY</td>
            <td>SUPPLIER</td>
            <td>TOTAL</td>
          </tr>
        </thead>
        <tbody>
          {this.state.filteredTable.map(sup=>(
            <tr>
              <td>
              {
              sup.orderBuyerStatus==="Paid"?<span class="paidClass">{sup.orderBuyerStatus}</span>:<span class="deliveredClass">{sup.orderBuyerStatus}</span>
              }
              </td>
              <td>{                
              dateFormat(sup.deliveryDay,'mmm. dd,yyyy')
              }</td>
              <td>{sup.vendorName}
              <span className={!sup.isBYOS?'market':'hidden'}>Market</span>
              <span className={sup.isPendingVendorOnboarding?'first':'hidden'}>1st</span>
              </td>
              <td>{sup.total==0?'':'$'+sup.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    );
  }
}



const element=<SupplierComponent></SupplierComponent>
ReactDOM.render(element, document.getElementById('root'));
