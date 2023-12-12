import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import img1 from "../../assets/icons/Frame 48097672.svg";
import img2 from "../../assets/icons/dasturlah.svg";
import img3 from "../../assets/icons/3dmodel.svg";
import img4 from "../../assets/icons/fanlar.svg";
import logo from "../../assets/icons/logo.svg";
import { serverDomain } from "../../utils/url";
import { Context } from "../../context/context";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const region = [
  {
    id: 1,
    name: "Andijon",
    name2: "ANDIJON",
  },
  {
    id: 2,
    name: "Buxoro",
    name2: "BUXORO",
  },
  {
    id: 3,
    name: "Farg’ona",
    name2: "FARGONA",
  },
  {
    id: 4,
    name: "Navoiy",
    name2: "NAVOIY",
  },
  {
    id: 5,
    name: "Namangan",
    name2: "NAMANGAN",
  },
  {
    id: 6,
    name: "Jizzax",
    name2: "JIZZAX",
  },
  {
    id: 7,
    name: "Sirdaryo",
    name2: "SIRDARYO",
  },
  {
    id: 8,
    name: "Surxandaryo",
    name2: "SURXANDARYO",
  },
  {
    id: 9,
    name: "Samarqand",
    name2: "SAMARQAND",
  },
  {
    id: 10,
    name: "Qashqadaryo",
    name2: "QASHQADARYO",
  },
  {
    id: 11,
    name: "Toshkent",
    name2: "TOSHKENT",
  },
  {
    id: 12,
    name: "Xorazm",
    name2: "XORAZM",
  },
  {
    id: 13,
    name: "Qoraqolpgiston",
    name2: "QORAQOLPOQ",
  },
];

const Header = () => {
  useEffect(() => setUrl(window.location.pathname), [window.location.pathname]);
  const navigate = useNavigate();
  const location = useLocation();
  const [url, setUrl] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [btnClass, setBtnClass] = useState({
    button1: false,
    button2: false,
    button3: false,
    button4: false,
  });
  const [selectedRegionName, setSelectedRegionName] = useState("");
  const [selectedRegionIndex, setSelectedRegionIndex] = useState(false);
  const { eduData, seteduData } = useContext(Context);

  //! SEARCH BY REGION FUNCTION
  const makeAPICall = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${serverDomain}/get/filter?region=${selectedRegionName}`,
        {
          headers: {
            Authorization: "Basic " + token,
          },
        }
      );
      const data = await response.json();
        seteduData(data.data);
    } catch (e) {
      console.error("Xatolik yuz berdi:", e);
    }
  };

  useEffect(() => {
    selectedRegionName && makeAPICall();
  }, [selectedRegionName]);

  //! SEARCH BY YONALISHLAR FUNCTION
  const handleYonalish = (yonalish) => {
    if (selectedRegionName) {
      const makeAPICall = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${serverDomain}/get/filter?region=${selectedRegionName}&courseType=${yonalish}`,
            {
              headers: {
                Authorization: "Basic " + token,
              },
            }
          );
          const data = await response.json();
          if (data?.data && data.data.length > 0) {
            seteduData(data.data);
          } else {
            Swal.fire(
              "Siz qidirgan regionda bu yo'nalish bo'yicha malumotlar yo'q"
            );
            
          }
        } catch (e) {
          console.log(e);
        }
      };
      makeAPICall();
    } else {
      Swal.fire("Siz avval regionni tanlang");
    }
  };
  


  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  //! SEARCH BY TITLE EDUCATION CENTER
  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${serverDomain}/search?educationCenter=${searchValue}`,
        {
          headers: {
            Authorization: "Basic " + token,
          },
        }
      );
      const data = await response.json();
      seteduData(data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedRegionName("");
      setSelectedRegionIndex(false);
    }
  }, [location.pathname]);


  return  (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__top-box">
            <div className="header__start-box">
              <Link to="/" className="header__logo">
                <img src={logo} alt="" className="logo" />
                NO NAME
              </Link>
              <span className="x-stolb"></span>
              {url !== "/home" && (
                <nav>
                  <Link className="mainlink" to="/">
                    Home
                  </Link>
                  <Link className="mainlink" to="/admin">
                    Admin
                  </Link>
                </nav>
              )}
            </div>
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                name="name"
                onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
              />
            <span className="header__user">sh</span>
          </div>
          {url === "/" && (
            <div className="header__bottom-box">
              <div className="header__region-button">
                {region.map((item, index) => (
                  <button
                    className={`header__region-btn ${
                      selectedRegionIndex === index ? "active" : ""
                    }`}
                    key={item.id}
                    onClick={() => {
                      setSelectedRegionName(item.name2);
                      setSelectedRegionIndex(index);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <p className="header__yonalishlar">Yo’nalishlar</p>
              <ul className="header__yonalishlar-box">
                <li className="header__yonalishlar-smallbox">
                  <label className="title" htmlFor="programming">
                    <img src={img1} className="header__yonalish-img" />
                    Dasturlash
                    <input
                      type="radio"
                      id="programming"
                      className="checkinput"
                      name="yonalish"
                      value="PROGRAMMING"
                      checked={btnClass.button1}
                      onChange={() => {
                        handleYonalish("PROGRAMMING");
                        setBtnClass((prevState) => ({
                          ...prevState,
                          button1: !prevState?.button1,
                          button2: false,
                          button3: false,
                          button4: false,
                        }));
                      }}
                    />
                  </label>
                </li>
                <li className="header__yonalishlar-smallbox">
                  <label className="title" htmlFor="computerScience">
                    <img src={img2} className="header__yonalish-img" />
                    Kompyuter savodhonligi
                    <input
                      type="radio"
                      id="computerScience"
                      name="yonalish"
                      value="COMPUTER_SCIENCE"
                      checked={btnClass.button2}
                      onChange={() => {
                        handleYonalish("COMPUTER_SCIENCE");
                        setBtnClass((prevState) => ({
                          ...prevState,
                          button1: false,
                          button2: !prevState?.button2,
                          button3: false,
                          button4: false,
                        }));
                      }}
                    />
                  </label>
                </li>
                <li className="header__yonalishlar-smallbox">
                  <label className="title" htmlFor="threeDModeling">
                    <img src={img3} className="header__yonalish-img" />
                    3D model
                    <input
                      type="radio"
                      id="threeDModeling"
                      name="yonalish"
                      value="THREE_D_MODELING"
                      checked={btnClass.button3}
                      onChange={() => {
                        handleYonalish("THREE_D_MODELING");
                        setBtnClass((prevState) => ({
                          ...prevState,
                          button1: false,
                          button2: false,
                          button3: !prevState?.button3,
                          button4: false,
                        }));
                      }}
                    />
                  </label>
                </li>
                <li className="header__yonalishlar-smallbox">
                  <label className="title" htmlFor="others">
                    <img src={img4} className="header__yonalish-img" />
                    Fanlar
                    <input
                      type="radio"
                      id="others"
                      name="yonalish"
                      value="OTHERS"
                      checked={btnClass.button4}
                      onChange={() => {
                        handleYonalish("OTHERS");
                        setBtnClass((prevState) => ({
                          ...prevState,
                          button1: false,
                          button2: false,
                          button3: false,
                          button4: !prevState?.button4,
                        }));
                      }}
                    />
                  </label>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
