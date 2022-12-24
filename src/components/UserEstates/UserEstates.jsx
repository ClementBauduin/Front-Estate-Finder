import { useContext } from 'react'
import { UserContext } from '../../App'
import { useQuery } from '@tanstack/react-query'
import getUserEstates  from '../../api/getUserEstate'
import PreviewCard from '../PreviewCard/PreviewCard'
import Style from './UserEstates.module.css'

export default function UserEstates() {
    const { userData } = useContext(UserContext)
    const { data:estates,isLoading,error,refetch} = useQuery({
        queryKey:['userEstates'],
        queryFn : () => getUserEstates(userData.username)}
    )

    const imgPreview = estates?.map(estate => {  
        return <PreviewCard key={estate._id} estate={estate} user={true} refetch={refetch}/>
    })
    
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    return (
        <>
            
            {estates &&
            <div className={Style.previewContainer}>{imgPreview}</div>}

        </>
    )
}