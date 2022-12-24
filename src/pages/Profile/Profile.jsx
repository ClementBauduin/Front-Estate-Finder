import Header from "../../components/Header/Header"
import Style from "./Profile.module.css"
import { useState } from "react"
import NewEstate from "../../components/NewEstate/NewEstate"
import UserEstates from "../../components/UserEstates/UserEstates"

export default function Profile() {

  const [app,setApp] = useState("yourEstates")


  return (
    <>
      <Header />
      <div className={Style.buttonContainer}>
          <div className={Style.buttonEstates} onClick={() => setApp("yourEstates")}>MY ESTATES</div>
          <div className={Style.buttonAdd} onClick={() => setApp("newEstate")}>ADD AN ESTATE</div>
      </div>
       <main className={Style.appContainer}>

          {app === "yourEstates" && 
            <UserEstates/> }
          

          {app === "newEstate" && 
            <NewEstate/> }
          
       </main>
    </>
  )
}
