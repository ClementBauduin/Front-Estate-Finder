import Header from "../../components/Header/Header"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {getEstate} from "../../api/getEstate"
import { useState } from "react"
import Style from "./EstateDetail.module.css"

const url = process.env.REACT_APP_API_URL;
export default function EstateDetail() {
  
  const[index,setIndex] = useState(0);
  let { id } = useParams()
  const {data:estate,isLoading,error} = useQuery({
    queryKey:['estate'],
    queryFn: () => getEstate(id)
  })

  console.log(estate)

  if(isLoading) return <p>Loading...</p>
  if(error) return <p>Error</p>
  
  let length = estate?.images.length;

  //convert this 2022-12-12T14:39:55.215Z to Monday, 12 December 2022, 14:39:55
  const date = new Date(estate?.createdAt)
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const createdAt = date.toLocaleDateString('en-GB', options)

  

  return (
    <>
      <Header />
      <main className={Style.main}>
        <div className={Style.container}>
          <div className={Style.estateWrapper}>
            <p className={Style.prevArrow} onClick={() => setIndex(index === 0 ? length - 1 : index - 1)}>&lt;</p>
            <img src={url + '/' + estate.images[index][`img${index+1}`]} alt="estate pictures"></img>
            <p className={Style.nextArrow} onClick={() => setIndex(index === length - 1 ? 0 : index + 1)}>&gt;</p>
          </div>

          <div className={Style.infoContainer}>
            <div className={Style.announceWrapper}>
              <h1 className={Style.seller}>Seller : {estate.seller}</h1>
              <h2>Available since : {createdAt}</h2>
            </div>
            <div className={Style.detail}>
              <p>Type : {estate.type}</p>
              <p>Price : {estate.price}€</p>
              <p>Size : {estate.size}m²</p>
              <p>Rooms : {estate.rooms}</p>
              <p>Address : {estate.address}</p>
              <p>City : {estate.city}</p>
              <p>State : {estate.state}</p>
              <p>Zip : {estate.zip}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
