import Header from '../../components/Header/Header'
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import editEstate from '../../api/editEstate';
import Style from './EditEstate.module.css'
import { useParams } from 'react-router-dom';

const schema = yup.object().shape({
    type: yup.string().required("Type is required"),
    price: yup.number().required("Price is required").typeError("Price is required must be a number").positive("Price must be positive").integer("Price must be an integer"),
    rooms: yup.number().required("Number of rooms is required").typeError("Room number is required and must be a number").positive("Room number must be positive").integer("Room number must be an integer"),
    size: yup.number().required("Size is required").typeError("Size is required and must be a number").positive("Size must be positive").integer("Size must be an integer"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zip: yup.string().required("Zip code is required"),

}).required();

export default function EditEstate() {

    const {register, handleSubmit, formState : {errors},reset} = useForm({
        resolver: yupResolver(schema)
    });

    const {id} = useParams();

    const onSubmit = (data) => {
        
        editEstate(id,data);
        reset();
    }

    return (
    <>
        <Header />
        <form onSubmit={handleSubmit(onSubmit)} className={Style.editEstateForm}>

            <label htmlFor="type">Type :</label>
                <select name="type" id="type" {...register("type")}>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                </select>
            {errors.type && <p className={Style.message}>{errors.type.message}</p>}

            <label htmlFor="price">Price :</label>
            <input type="text" id="price" inputMode="numeric"  {...register("price")}></input>
            {errors.price && <p className={Style.message}>{errors.price.message}</p>}

            <label htmlFor='rooms'>Room number :</label>
            <input type="text" inputMode="numeric"  id="rooms" {...register("rooms")}></input>
            {errors.rooms && <p className={Style.message}>{errors.rooms.message}</p>}

            <label htmlFor="size">Size (in square meters m²) :</label>
            <input type="text" inputMode="numeric"  id="size" {...register("size")}></input>
            {errors.size && <p className={Style.message}>{errors.size.message}</p>}

            <label htmlFor="address">Address :</label>
            <input type="text" id="address" {...register("address")}></input>
            {errors.address && <p className={Style.message}>{errors.address.message}</p>}

            <label htmlFor="city">City :</label>
            <input type="text" id="city" {...register("city")}></input>
            {errors.city && <p className={Style.message}>{errors.city.message}</p>}

            <label htmlFor="state">State :</label>
            <input type="text" id="state" {...register("state")}></input>
            {errors.state && <p className={Style.message}>{errors.state.message}</p>}

            <label htmlFor="zip">Zip Code :</label>
            <input type="text" id="zip" {...register("zip")}></input>
            {errors.zip && <p className={Style.message}>{errors.zip.message}</p>}

            <button type="submit">Submit</button>

        </form>
    </>
  )
}
