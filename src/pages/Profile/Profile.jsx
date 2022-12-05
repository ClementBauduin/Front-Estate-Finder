import Header from "../../components/Header/Header"
import { UserContext } from "../../App"
import { useContext } from "react"

export default function Profile() {

  const {userData} = useContext(UserContext)

  return (
    <>
      <Header />
       {userData ?  
       (<div>You are connected as user : {userData.username} </div>) :
        (<div>You are not connected</div>)}
    </>
  )
}
