import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SideBarData from "../Data/SidebarData";

function SideBar() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const activeItem = SideBarData.findIndex(
      (item) => item.path === location.pathname
    );
    setActiveIndex(activeItem);
  }, [location]);

  return (
    <div className="fixed top-[100px] left-0 h-full w-[18%] z-[100]">
      <div className="w-full">
        <ul className="list-none p-0 m-0 gap-2">
          {SideBarData.map((item, index) => {
            const isActive = activeIndex === index;
            const isHovered = hoverIndex === index;

            return (
              <li
                key={index}
                className={`flex items-center h-[52px] p-0 px-2 cursor-pointer ${
                  isActive
                    ? "bg-[#274C77] text-[#E7ECEF] rounded-r-[20px] shadow-lg"
                    : isHovered
                    ? "bg-[#4275ae] text-[#E7ECEF] rounded-r-[20px]"
                    : "hover:bg-[#4275ae] hover:text-[#E7ECEF] hover:rounded-r-[20px]"
                }`}
                onMouseEnter={() => setHoverIndex(index)} // Set hover state
                onMouseLeave={() => setHoverIndex(null)} // Reset hover state
              >
                <Link to={item.path} className="w-full h-full no-underline">
                  <button
                    onClick={() => setActiveIndex(index)}
                    className="flex items-center gap-5 w-full h-full border-none bg-transparent p-0"
                  >
                    <span
                      className={`text-lg font-semibold leading-6 ${
                        isActive || isHovered
                          ? "text-[#E7ECEF]"
                          : "text-[#274C77]"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
