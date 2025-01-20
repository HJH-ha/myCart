import "./HeroSection.css";
import iphone from "../../assets/iphone-14-pro.webp";

const HeroSection = () => {
  return (
    <section className="hero_section">
      <div className="align_center">
        <h2 className="hero_title">아이폰 14 구매하세요</h2>
        <p className="hero_subtitle">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          quibusdam.
        </p>
        <a href="#" className="hero_link">
          바로구매
        </a>
      </div>

      <div className="align_center">
        <img src={iphone} alt="" className="hero_image" />
      </div>
    </section>
  );
};

export default HeroSection;
