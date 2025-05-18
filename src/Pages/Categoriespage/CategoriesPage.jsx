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
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        // optionally handle fetch error here
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-page">
      <h2 className="categories-title">Explore Categories</h2>

      {categories.length === 0 && (
        <div className="no-categories-container">
          <div className="no-categories-icon" aria-hidden="true">
            <div className="square" />
            <div className="square" />
            <div className="square" />
          </div>
          <div className="no-categories-message">
            No categories found. Please check back later.
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <div className="category-grid">
          {categories.map((cat, index) => (
            <Link
              to={`/categories/${cat.categoryName}`}
              key={cat.id}
              className="link-no-style"
            >
              <div
                className="category-card"
                style={{ backgroundColor: getHSLColor(index, categories.length) }}
              >
                {cat.categoryName}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export { CategoriesPage };
