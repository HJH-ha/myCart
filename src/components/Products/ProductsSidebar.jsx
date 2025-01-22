import "./ProductsSidebar.css";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import useData from "../../Hook/useData";
import { NavLink } from "react-router-dom";

const ProductsSidebar = () => {
  // : << data의 이름을 바꿔주는거
  const { data: categories, error } = useData("category");

  return (
    <aside className="products_sidebar">
      <h2>카테고리</h2>

      <div className="category_links">
        <NavLink to="/products">
          <p className="all-section">전체보기</p>
        </NavLink>
        {error && <em className="form_error">{error}</em>}
        {categories &&
          categories.map((category) => (
            <LinkWithIcon
              key={category._id}
              title={category.name}
              link={`/products?category=${category.name}`}
              emoji={`http://localhost:5000/category/${category.image}`}
              sidebar={true}
            />
          ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
