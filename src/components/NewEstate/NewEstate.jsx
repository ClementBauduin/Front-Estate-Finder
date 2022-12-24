import {useForm} from 'react-hook-form';
import Style from './NewEstate.module.css';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import newEstate  from '../../api/newEstate';

const schema = yup.object().shape({
    type: yup.string().required("Type is required"),
    price: yup.number().required("Price is required").typeError("Price is required must be a number").positive("Price must be positive").integer("Price must be an integer"),
    rooms: yup.number().required("Number of rooms is required").typeError("Room number is required and must be a number").positive("Room number must be positive").integer("Room number must be an integer"),
    size: yup.number().required("Size is required").typeError("Size is required and must be a number").positive("Size must be positive").integer("Size must be an integer"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zip: yup.string().required("Zip code is required"),
    images: yup.mixed().required("You must upload at least one image")
    .test("file","You need to upload at least one image", (value) => {
        if (value.length > 0) return true;
        return false;
    })
    .test("fileSize", "The file is too large, please upload file under 2Mb, we suggest you to use an image compressor online.", (value) => {
        for (let i=0; i<value.length; i++){
            if (value[i].size > 2000000){
                return false;
            }   
        }
        return true;
    })
    .test("fileType", "The file is not an image", (value) => {
        for (let i=0; i<value.length; i++){
            if (!value[i].type.includes("image")) return false;
        } 
        return true;
    }),

}).required();

export default function NewEstate() {

    const {register, handleSubmit, formState : {errors},reset} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("type", data.type);
        formData.append("price", data.price);
        formData.append("rooms", data.rooms);
        formData.append("size", data.size);
        formData.append("address", data.address);
        formData.append("city", data.city);
        formData.append("state", data.state);
        formData.append("zip", data.zip);
        for (let i=0; i<data.images.length; i++){
            formData.append("images", data.images[i]);
        }
        newEstate(formData);
        reset();
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={Style.newEstateForm}>

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

        <label htmlFor="images">Images :</label>
        <input multiple type="file" id="images" name="images" {...register("images")}></input>
        {errors.images && <p className={Style.message}>{errors.images.message}</p>}

        <button type="submit">Submit</button>
    </form>
  )
}
