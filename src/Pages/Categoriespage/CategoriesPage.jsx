import { useEffect, useState } from "react";
import "./CategoriesPage.css";
import { getCategories } from "../../services/CategoryService";
import { Link } from "react-router";

const getHSLColor = (index, total) => {
  const hue = (index * (360 / total)) % 360;
  return `hsl(${hue}, 80%, 60%)`;
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-page">
      <h2 className="categories-title">Explore Categories</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <Link to={`/categories/${cat.categoryName}`} key={cat.id} className="link-no-style">
            <div
              className="category-card"
              style={{ backgroundColor: getHSLColor(index, categories.length) }}
            >
              {cat.categoryName}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { CategoriesPage };
