import Background from "../Components/Background";

function AboutUs() {
  return (
    <Background className="car-gallery w-full">
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="">
          <span className="font-lato text-[#274c77] text-[22px] font-bold">
            About Us
          </span>
          <p className="text-justify">
            Welcome to the Second-Hand Car Value Predictor, a cutting-edge
            platform designed to help car owners and buyers accurately estimate
            the value of used cars. With the growing demand for transparency in
            the second-hand car market, we aim to simplify the valuation process
            using advanced machine learning models.
          </p>
        </div>
        <div>
          <span className="font-lato text-[#274c77] text-[22px] font-bold">
            Our Mission
          </span>
          <p className="text-justify">
            Our mission is to make car buying and selling more transparent and
            accessible for everyone. Whether you are looking to sell your car or
            purchase one, our platform provides reliable price predictions that
            reflect the true market value. We focus on offering users the
            ability to quickly and easily determine the fair price of a vehicle
            based on essential details such as make, model, year, and more.
          </p>
        </div>
        <div>
          <span className="font-lato text-[#274c77] text-[22px] font-bold">
            What We Do
          </span>
          <p className="text-justify">
            We leverage a robust machine learning model trained on a
            comprehensive dataset of over 426,000 used cars from the U.S.
            market. By analyzing key features such as mileage, manufacturer,
            condition, fuel type, and transmission, our platform generates an
            accurate price estimate that helps users make informed decisions.
          </p>
        </div>
        <div>
          <span className="font-lato text-[#274c77] text-[22px] font-bold">
            Our Technology
          </span>
          <p className="text-justify">
            We use sophisticated machine learning algorithms such as Random
            Forest and XGBoost to deliver high predictive accuracy. These models
            are selected for their ability to handle complex data and provide
            insights into which factors most impact car prices. With built-in
            mechanisms to prevent overfitting, we ensure that our price
            estimates remain reliable across various car types and conditions.
          </p>
        </div>
        <div>
          <span className="font-lato text-[#274c77] text-[22px] font-bold">
            Our Vision
          </span>
          <p className="text-justify">
            In the future, we aim to expand our platform to support the Sri
            Lankan car market and fine-tune our model to enhance prediction
            accuracy. Our ongoing improvements will continue to make the
            second-hand car market more transparent and user-friendly.
          </p>
        </div>
      </div>
      <div>
        <p className="text-justify">
          Thank you for choosing the Second-Hand Car Value Predictor. We’re here
          to help you make the best decision, whether you're buying or selling a
          car.
        </p>
      </div>
    </Background>
  );
}
export default AboutUs;
