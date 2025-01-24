import "./CartPage.css";
import remove from "../../assets/remove.png";
import user from "../../assets/user.webp";
import QuantityInput from "../SingleProduct/QuantityInput";
import Table from "../Common/Table";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";

const CartPage = () => {
  // console.log(cart);
  const [subTotal, setSubTotal] = useState(0);
  const user = useContext(UserContext); // useContext로 UserContext 가져오기
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // console.log(user);
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubTotal(total);
  }, [cart]);
  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`http://localhost:5000/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">{user?.name}</p>
          <p className="user_email">{user?.email}</p>
        </div>
      </div>

      <Table headings={["상품", "가격", "구매수량", "총 금액", "상품삭제"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.price.toLocaleString("KO-KR")}원</td>
              <td className="align_center table_quantity_input">
                <QuantityInput quantity={quantity} stock={product.stock} />
              </td>
              <td>{(quantity * product.price).toLocaleString("KO-KR")}원</td>
              <td>
                <img
                  onClick={() => removeFromCart(product._id)}
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>총 금액</td>
            <td>{subTotal.toLocaleString("KO-KR")}원</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td>3,000 원</td>
          </tr>
          <tr className="cart_bill_final">
            <td>결제금액</td>
            <td>{(subTotal + 3000).toLocaleString("KO-KR")}원</td>
          </tr>
        </tbody>
      </table>

      <button className="search_button checkout_button">결제하기</button>
    </section>
  );
};

export default CartPage;
