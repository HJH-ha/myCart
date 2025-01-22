import ProductCard from "./ProductCard";
import "./ProductsList.css";
import useData from "../../Hook/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";

const ProductsList = () => {
  const [search, setSearch] = useSearchParams(); // 요청주소 뒤의 쿼리스트링
  const category = search.get("category"); // category = 값 을 가져옴
  const { data, error, isLoading } = useData(
    "products",
    {
      params: {
        // category: category, < 원래 이문장처럼 사용해야함 이게 기본. 앞에가 키값 뒤에가 벨류값
        //  우리는 키값, 벨류값이 같은 category라서 생략하고 하나만적음

        category,
      },
    },
    [category]
  );
  // console.log(data);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>상품목록</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">정렬방법</option>
          <option value="price desc">가격높은순</option>
          <option value="price asc">가격낮은순</option>
          <option value="rate desc">평점높은순</option>
          <option value="rate asc">평점낮은순</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}

        {data.products &&
          data.products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.images[0]}
              price={product.price}
              rating={product.reviews.rate}
              ratingCounts={product.reviews.counts}
              stock={product.stock}
            />
          ))}
      </div>
    </section>
  );
};

export default ProductsList;
