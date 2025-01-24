import "./ProductCard.css";
import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  return (
    <article className="product_card">
      <div className="product_image">
        <NavLink to={`/product/${product?._id}`}>
          <img
            src={`http://localhost:5000/products/${product?.images[0]}`}
            alt="product image"
          />
        </NavLink>
      </div>

      <div className="product_details">
        <p className="product_title">{product?.title}</p>
        <h3 className="product_price">
          {product?.price.toLocaleString("ko-KR")}원
        </h3>

        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <img src={star} alt="star" /> {product?.reviews.rate}
            </p>
            <p className="product_review_count">{product?.reviews.counts}</p>
          </div>

          {/* 제품에 재고수가 1개 이상일때만 장바구니 가능 */}
          {product?.stock > 0 && user && (
            <button
              className="add_to_cart"
              onClick={() => addToCart(product, 1)}
            >
              <img src={basket} alt="basket button" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
