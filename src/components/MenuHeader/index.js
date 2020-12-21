import React, { useEffect } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllcategory } from '../../actions'

const MenuHeader=(props)=> {

    const category =useSelector(state=>state.category)
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getAllcategory())
    },[])

    const rendercategories = (categories) => {
            const mycategories = [];
            for (const cat of categories) {
                mycategories.push(

                    <li key={cat.name}>
                    {
                        cat.parentid?<a href={`/${cat.slug}/?cid=${cat._id}&type=${cat.type}`}>{cat.name}</a>:
                        <span>{cat.name}</span>
                    }
                        {/* {cat.name} */}
                       {/* {console.log(cat)} */}
                       {cat.childern.length>0 ? (<ul>{rendercategories(cat.childern)}</ul>):null}
                    </li>
                )
            }
            // console.log(mycategories)
            return mycategories;
        }

    return (
        <>
           <div className="menuheader">
            <ul>
                {category.categories.length>0?rendercategories(category.categories):null}
            </ul>      
           </div> 
        </>
    )
}



export default MenuHeader
