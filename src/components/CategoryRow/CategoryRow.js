import react from "react";
import { Link } from "react-router-dom";

function CategoryRow({ title, items }) {
  const handleDetails = (item) => {
    console.log(`Clicked ${item.item_name}`);
  };
  const loadItemCards = () => {
    return items.map((item, index) => {
      return (
        <div class="col-lg-3 col-md-6 mb-4">
          <div className="card">
            {/* <!--Card image--> */}
            <div className="view overlay" width="200">
              <img
                src={item.thumbnail_image_url}
                className="card-img-top"
                alt={item.item_name}
              />
              <a>
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>
            {/* <!--Card image--> */}

            {/* <!--Card content--> */}
            <div className="card-body text-center">
              <strong>
                <a href="" className="dark-grey-text">
                  <h5>{item.item_name}</h5>
                </a>
              </strong>
              <h5>
                <a href="" className="grey-text">
                  {item.description}
                </a>
              </h5>

              <h4 className="font-weight-bold black-text">
                <strong>${item.price}</strong>
              </h4>
              <button className="btn btn-primary btn-md my-0 p" type="submit">
                Add to cart
                <i className="fas fa-shopping-cart ml-1"></i>
              </button>
            </div>
            {/* <!--Card content--> */}
          </div>
        </div>
      );
    });
  };

  return (
    <section class="text-center mb-4">
      <h3 className="h3-responsive">{title}</h3>
      <div class="row wow fadeIn">{loadItemCards()}</div>
    </section>
  );
}
export default CategoryRow;
