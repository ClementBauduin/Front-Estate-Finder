import Style from './PreviewCard.module.css'
import { Link } from 'react-router-dom'
import deleteEstate from '../../api/deleteEstate'

export default function PreviewCard({estate,user,refetch}) {

    const handleDelete = async (id) => {
        await deleteEstate(id)
        refetch()
    }

    return (
        <div className={Style.previewCard}>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"100%"}}>
                    <Link to={`/estate/${estate._id}`} style={{textDecoration:"none",color:"black"}}>
                        <div>
                            <img style={{minHeight:"43vh",width:"100%"}} src={`http://localhost:5000/${estate.images[0].img1}`} alt="preview of the first estate img"></img>
                            <p style={{display:"inline-block",padding:"0 0.8rem 0 0.8rem",color:"white",borderRadius:"1.2rem",backgroundColor:"rgba(0, 0, 0, 0.5)",position: "relative",bottom:"2rem",left:"0.5rem"}}>{estate.images.length}</p>
                        </div>
                    </Link>
                    <div className={Style.infoWrapper} style={{lineHeight:"2rem"}}>
                        <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"start"}}>
                            <h1 style={{color:"#4e9850"}}>{estate.price}€</h1>
                            <h2 style={{color:"#8191a0"}}>{Math.round(estate.price / estate.size)}€/m²</h2>
                        </div>
                        <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                            <h2 style={{textTransform:"capitalize"}}>{estate.type}</h2>
                            <h2 style={{textTransform:"capitalize"}}>{estate.rooms} rooms</h2>
                            <h2>{estate.size}m²</h2>
                        </div>
                        <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <h2>{estate.city}</h2>
                            <h2>{estate.zip}</h2>
                        </div>
                        {user && <div style={{display:"flex",justifyContent:'space-between',lineHeight:"1rem"}}>
                            <p onClick={() => handleDelete(estate._id)} style={{padding:"0.5rem",color:"white",borderRadius:"0.5rem",backgroundColor:"rgba(255, 0, 0,1)"}}>Delete</p>
                            <Link to={`/editEstate/${estate._id}`} style={{padding:"0.5rem",color:"white",borderRadius:"0.5rem",backgroundColor:"rgba(0, 255, 0,1)"}}>Edit</Link>
                        </div>}
                    </div>
                </div>
        </div>
    )
}