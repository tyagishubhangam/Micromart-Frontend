import { useEffect, useState } from "react"
import "./CategoriesPage.css"
import { getCategories } from "../../services/CategoryService";
import { Link } from "react-router";


    // Function to generate a unique HSL color
const getHSLColor = (index, total) => {
    const hue = (index * (360 / total)) % 360;
    return `hsl(${hue}, 80%, 60%)`;
    };

const CategoriesPage = ()=>{


    const [categories, setCategories] = useState([]);
     useEffect(() => {
            // Fetch categories data when the component mounts
            const fetchCategories = async () => {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
            };
            
            fetchCategories();
        }, []); // Empty dependency array ensures this runs only once

    return (
        <div className="categories-page">
           <div className="category-grid">
      {categories.map((cat, index) => (
        <Link to={`/categories/${cat.categoryName}`} key={cat.id} className="link-no-style"> 
        <div
          key={cat.id}
          className="category-card"
          style={{ backgroundColor: getHSLColor(index, categories.length) }}
        >
          {cat.categoryName}
        </div> </Link>
      ))}
    </div> 
        </div>
    )
}

export{
    CategoriesPage
}