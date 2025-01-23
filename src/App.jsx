import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // 장바구니
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
      <div className="app">
        <Navbar user={user} cartCount={cart.length} />
        <main>
          <Routing />
        </main>
      </div>
    </>
  );
}

export default App;
