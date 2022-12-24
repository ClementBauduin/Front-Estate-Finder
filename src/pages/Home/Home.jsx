import { getEstatesByFilter } from "../../api/getEstate"
import Header from "../../components/Header/Header"
import Style from "./Home.module.css"
import { useQuery } from "@tanstack/react-query"
import PreviewCard from "../../components/PreviewCard/PreviewCard"
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  type: yup.string(),
  price: yup.string().nullable().matches(/^\d*$/, 'Invalid number'),
  rooms: yup.string().nullable().matches(/^\d*$/, 'Invalid number'),
  size: yup.string().nullable().matches(/^\d*$/, 'Invalid number'),
  zip: yup.string().nullable(),

});

export default function Home() {

    let filter = {
        type: undefined,
        price: undefined,
        rooms: undefined,
        size: undefined,
        zip: undefined
    }
    
    const { data:estatesHome,isLoading,error,refetch} = useQuery({
        queryKey:['userEstates'],
        queryFn : () => getEstatesByFilter(filter),
        refetchOnWindowFocus: false,
        }
    )


    const imgPreview = estatesHome?.map(estate => {  
        return <PreviewCard key={estate._id} estate={estate} user={false}/>
    })

    const {register, handleSubmit, formState : {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        filter = data
        refetch()
    }
    
    const loadingDisplay = isLoading ? <p>Loading...</p> : null
    const errorDisplay = error ? <p>Error</p> : null

    return (
    <>
        <Header />
        <form className={Style.formContainer} onSubmit={handleSubmit(onSubmit)}>

            <div className={Style.inputWrapper}>
                <label htmlFor="type">Type :</label>
                <select name="type" id="type" {...register("type")}>
                    <option value={undefined}></option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                </select>
            
            </div>
            
            <div className={Style.inputWrapper}>
                <label htmlFor="price">Max Price :</label>
                <input type="text" id="price" inputMode="numeric"  {...register("price")}></input>
                {errors.price && <p className={Style.message}>{errors.price.message}</p>}
            </div>
            
            <div className={Style.inputWrapper}>
                <label htmlFor='rooms'>Min Rooms :</label>
                <input type="text" inputMode="numeric"  id="rooms" {...register("rooms")}></input>
                {errors.rooms && <p className={Style.message}>{errors.rooms.message}</p>}
            </div>
            
            <div className={Style.inputWrapper}>
                <label htmlFor="size">Min Size (in m²) :</label>
                <input type="text" inputMode="numeric"  id="size" {...register("size")}></input>
                {errors.size && <p className={Style.message}>{errors.size.message}</p>}
            </div>
            
            <div className={Style.inputWrapper}>
                <label htmlFor="zip">Zip Code :</label>
                <input type="text" id="zip" {...register("zip")}></input>
            </div>
            
            <button type="submit" style={{width:"auto"}}>Filter</button>
    
        </form>

        <main className={Style.main}>
            {loadingDisplay}
            {errorDisplay}
            <div className={Style.previewContainer}>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error</p>}
            {estatesHome && imgPreview}
            </div>
        </main>
    </> 
  )
}
