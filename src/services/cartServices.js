import apiClient from "../utils/api-client";

//제품 id와 수량을 DB에 저장
export function addToCartAPI(id, quantity) {
  return apiClient.post(`cart/${id}`, { quantity });
}

//유저별로 저장된 카트정보를 가져오기
export function getCartAPI() {
  return apiClient.get("/cart");
}

//장바구니 삭제
export function removeFromCartAPI(id) {
  return apiClient.patch(`cart/remove/${id}`);
  // patch << 보통 업데이트할때 많이 사용 remove도 업데이트로 patch사용
}

// 장바구니 삼풍의 수량증가 +1
export function increaseProductAPI(id) {
  return apiClient.patch(`cart/increase/${id}`);
}

// 장바구니 삼풍의 수량감소 -1
export function decreaseProductAPI(id) {
  return apiClient.patch(`cart/decrease/${id}`);
}
