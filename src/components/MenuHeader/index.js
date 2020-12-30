import React, { useEffect } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllcategory } from '../../actions'
import { LinearProgress } from '@material-ui/core'

const MenuHeader = (props) => {

    const category = useSelector(state => state.category)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllcategory())
    }, [])
    if (category.loading === true) {
        return <><LinearProgress color="secondary" /></>
    }
    const rendercategories = (categories) => {
        const mycategories = [];
        for (const cat of categories) {
            mycategories.push(

                <li key={cat.name}>
                    {
                        cat.parentid ? <a href={`/${cat.slug}/?cid=${cat._id}&type=${cat.type}`}>{cat.name}</a> :
                            <span>{cat.name}</span>
                    }
                    {/* {cat.name} */}
                    {/* {console.log(cat)} */}
                    {cat.childern.length > 0 ? (<ul>{rendercategories(cat.childern)}</ul>) : null}
                </li>
            )
        }
        // console.log(mycategories)
        return mycategories;
    }
    const openMenu = () => {
        const menu = document.getElementById("menu-toggler2");


        const sidemenu = document.getElementById("menuheader2");
        if (sidemenu.style.left === "-100%") {
            sidemenu.style.left = "0";
            sidemenu.style.display="block"
            menu.classList.add('active')
        } else {
            sidemenu.style.left = "-100%";
            menu.classList.remove('active')
        }


    }
    return (
        <>
            <div className="menuheader">
                <ul>
                    {category.categories.length > 0 ? rendercategories(category.categories) : null}
                </ul>
            </div>
            <div clasName="mobilemenu">
            
                <div className="menu-toggler2" id="menu-toggler2" onClick={openMenu}>
               
                    <span></span>
                    <span></span>
                    <span></span>
                  
                </div>
                <p className="mobilecate">categories</p>
             
               
                <div className="menuheader2" id="menuheader2">
                    <ul>
                        {category.categories.length > 0 ? rendercategories(category.categories) : null}
                    </ul>
                </div>
                </div>
           
        </>
    )
}



export default MenuHeader
