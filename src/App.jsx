import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { addToCartAPI, getCartAPI } from "./services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";

//만약에 토큰이 있으면 axios 설정에 추가됨
setAuthToken(localStorage.getItem("token"));

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // 장바구니
  const addToCart = (product, quantity) => {
    const updatedCart = [...cart]; // 장바구니 복사
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product, quantity }); // product: product, quantity: quantity
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);
    // DB에 아이디 별로 저장
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("상품 추가 성공!");
      }) // then은 axios로 성공했을때
      .catch((err) => {
        toast.error("상품 추가에 실패했습니다!");
      }); //catch는 axios로 실패했을때
  };

  const removeFromCart = (id) => {
    const oldCart = [...cart]; // 카트복사
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);
  };

  //서버에서 장바구니 정보 가져옴
  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("카트 가져오기에 실패했습니다.");
      });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload(); // 재시작(새로고침) , 제일 앞에 window. 생략가능
      } else {
        setUser(jwtUser);
      }
    } catch (error) {} // 토근이 없는거지 에러는 아님, 그냥 실행
  }, []);

  return (
    <>
      <UserContext.Provider value={user}>
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
          <div className="app">
            <Navbar user={user} cartCount={cart.length} />
            <main>
              <ToastContainer position="bottom-right" autoClose={2000} />
              <Routing />
            </main>
          </div>
        </CartContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
