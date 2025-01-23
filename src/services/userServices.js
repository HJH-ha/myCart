import apiClient from "../utils/api-client";

//가입하기 함수
export async function signup(user, profile) {
  const body = new FormData(); // 자바스크립트로 폼데이터를 보낼때
  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.deliveryAddress);
  body.append("profilePic", profile);

  const { data } = await apiClient.post("user/signup", body);
  localStorage.setItem("token", data.token);
}

//로그인 함수
export async function login(user) {
  const { data } = await apiClient.post("user/login", user);
  localStorage.setItem("token", data.token);
}
