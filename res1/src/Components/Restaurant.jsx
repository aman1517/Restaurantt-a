import React, { useEffect, useState } from 'react';
import "./Restaurant.css"
import { nanoid } from 'nanoid';
// import NAvbar from './NAvbar';

export const RestaurantPage = () => {

  const [Data,setData] = useState([])
  
  const RestaurantData=async()=>{
    let res =await fetch("http://localhost:3001/ReataurantData");
    let data = await res.json();
    setData(data)
  }
  useEffect(()=>{
    RestaurantData();
  },[])
  
  const handleStar=async(star)=>{
    let res =await fetch("http://localhost:3001/ReataurantData");
    let data = await res.json();
    let newData = data.filter(el=>el.Rating>=star && el.Rating<star+1)
    setData(newData)
  }
  const handlePaymentMethod=async(method)=>{
    let res =await fetch("http://localhost:3001/ReataurantData");
    let data = await res.json();
    let newData = data.filter(el=>el.PaymentMethod===method)
    setData(newData)
  }
  const handleReverseSorting=async()=>{
    let res =await fetch("http://localhost:3001/ReataurantData");
    let data = await res.json();
    data.sort((a,b)=>{
      return b.Cost-a.Cost
    })
    let newData = data.filter(el=>el.Rating>=4)
    setData(newData)
  }
  const handleSorting=async()=>{
    let res =await fetch("http://localhost:3001/ReataurantData");
    let data = await res.json();
    data.sort((a,b)=>{
      return a.Cost-b.Cost
    })
    let newData = data.filter(el=>el.Rating>=4)
    setData(newData)
  }
  const [formData,setFormData] = useState([]);


  const handleInputChange=(e)=>{
    e.preventDefault()
    let a = e.target.name

    setFormData({
      ...formData,
      id: nanoid(),
      [a]: e.target.value
    })
  }
  
  const handleSubmit=async(event)=>{

    event.preventDefault();
    let data = JSON.stringify(formData);
    let res = await fetch("http://localhost:3001/ReataurantData",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:data
    });
    let res2 =await fetch("http://localhost:3001/ReataurantData");
    let data2 = await res2.json();
    setData(data2)
  };
  return (
    <>
  <div id="mainContainer">
  <div>
    <div id='Container1'>
        Sort by Star:
        <button onClick={()=>handleStar(1)}>1 Star</button>
        <button onClick={()=>handleStar(2)}>2 Star</button>
        <button onClick={()=>handleStar(3)}>3 Star</button>
        <button onClick={()=>handleStar(4)}>4 Star</button>
      {/* </div>
    <div  id='Container2'> */}
        Payment Method:
        <button onClick={()=>handlePaymentMethod("C")}>Cash</button>
        <button onClick={()=>handlePaymentMethod("O")}>Card</button>
        <button onClick={()=>handlePaymentMethod("A")}>All</button>
   {/* </div> */}
      {/* <div id='Container3'> */}
        Sort By Price:
        <button onClick={handleReverseSorting}>High to Low</button>
        <button onClick={handleSorting}>Low to High</button>
      </div>
    </div>
  </div> 

  <div id='RestaurantPage'>
      {Data.map((el)=>{
        return (
          <>
          <div>
            <div><img src={el.url}/></div>
            <div>
              <h2>{el.Name}</h2>
              <div>{el.DishType}</div>
              <div>Cost Rs.{el.Cost} for one</div>
              <div>Min Rs.50 <div></div>  Up to 30 min</div>
              <div>{el.PaymentMethod==="C" ? "Accepts Cash Payments Only":el.PaymentMethod==="A" ? "Accepts All Payments Options":"Accepts Online Payments Only" }</div>
            </div>
            <div>
              <div>{el.Rating}</div>
              <div>{el.Votes} votes</div>
              <div>{el.Review} reviews</div>
            </div>
          </div>
          </>
        )
      })}
</div>
    <div id='form'>
      <form id='RestaurantPageForm' onSubmit={handleSubmit}>
      <h2>Here You can Add restaurant Just Fill Details</h2>
      <div id="one">
        {/* <input onChange={handleInputChange} type="text" name="id" placeholder='Id (Optional)'/> */}
        <input onChange={handleInputChange} type="text" name="Name" placeholder='Restaurant Name' required/>
        <input onChange={handleInputChange} type="text" name="url" placeholder='Image URL' required/>
        <input onChange={handleInputChange} type="text" name="DishType" placeholder='Dish Type' required/>
        <input onChange={handleInputChange} type="number" name="Cost" placeholder='Cost' required/>
        
        <input onChange={handleInputChange} name="Rating" type="number" placeholder='Give Rating' required/>
        <input onChange={handleInputChange} name="Review" type="number" placeholder='Review' required/>
        <input onChange={handleInputChange} name="Votes" type="number" placeholder='Votes' required/>
        <div id="payment">
         <h3>Payment Method :</h3> 
        <select id="select" onChange={handleInputChange} name="PaymentMethod" >
          <option value="C">Cash</option>
          <option value="O">Card</option>
          <option value="A">All</option>
        </select>
        </div>
        <input className='submit' type="submit"/>

    </div>
      </form>
    </div>
   </>
  )
}