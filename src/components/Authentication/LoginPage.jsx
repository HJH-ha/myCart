import { useRef, useState } from "react";
import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { login } from "../../services/userServices";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [formError, setFormError] = useState("");

  const submitData = async (formData) => {
    try {
      await login(formData);
      window.location = "/";
    } catch (err) {
      setFormError(err.response.data.message);
    }
  };

  //  const passwordRef = useRef(null);
  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(user); // 후에 서보로 로그인으로 바꾸며됨
  //   setUser({ email: "", password: "" });
  // };

  return (
    <section className="align_center form_page">
      <form onSubmit={handleSubmit(submitData)} className="authentication_form">
        <h2>로그인 폼</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              // onChange={(e) => setUser({ ...user, email: e.target.value })}
              // value={user.email}
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "이메일 형식에 맞게 입력해주세요",
                },
              })}
              // type="email"
              id="email"
              className="form_text_input"
              placeholder="이메일 입력"
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              // onChange={(e) => setUser({ ...user, password: e.target.value })}
              // value={user.password}
              {...register("password", {
                required: "패스워드를 입력해주세요",
                minLength: {
                  value: 4,
                  message: "패스워드는 최소 4자 이상입니다",
                },
              })}
              // type="password"
              // ref={passwordRef}
              id="password"
              className="form_text_input"
              placeholder="패스워드"
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
            {/* <button
              type="button"
              onClick={() => (passwordRef.current.type = "password")}
            >
              비밀번호 숨기기
            </button>
            // passwordRef.current = input password 태그가됨
            <button
              type="button"
              onClick={() => (passwordRef.current.type = "text")}
            >
              비밀번호 보이게
            </button> */}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="search_button form_submit">
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
