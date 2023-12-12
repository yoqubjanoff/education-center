import React, { useContext, useEffect, useState } from "react";
import "./EduComponent.css";
import eduImg from "../../assets/images/figmalogo.png";
import nodata from "../../assets/images/nodatas.jpg";
import { Link, useNavigate } from "react-router-dom";
import { serverDomain } from "../../utils/url";
import { Context } from "../../context/context";
import LoadingSpinner from "../LoadingSpinner";
import Swal from "sweetalert2";

const EduComponent = () => {
  const navigate = useNavigate();
  const { eduData, seteduData, setSingleData, singleData } =
    useContext(Context);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(9);

  //! GET ALL DATA FUNCTION
  useEffect(() => {
    const makeAPICall = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${serverDomain}/get/all`, {
          headers: {
            Authorization: "Basic " + token,
          },
        });
        const data = await response.json();
        setLoading(false);
        seteduData(data?.data);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };
    makeAPICall();
  }, []);

  const loadMoreItems = () => {
    setItemsToShow(itemsToShow + 9);
  };

  const clickCard = (id) => {
    const selectedId = eduData?.find((item) => item.id === id);
    if (selectedId) {
      navigate(`/singlepage/${selectedId.id}`);
    } else {
      Swal.fire("Tanlangan element topilmadi");
    }
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <div className="home-smallbox">
        {eduData?.length === 0 ? (
          <div className="nodata-box">
            <h2 className="text-nodata">Ma'lumotlar mavjud emas !</h2>
            <img src={nodata} alt="" className="nodata-img" />
          </div>
        ) : (
          eduData?.slice(0, itemsToShow).map((item, index) => (
            <div className="education-mainbox" key={index}>
              <div className="education-box">
                <div className="education-name-box">
                  <div className="name-box">
                    <p className="education-name1">{item?.name}</p>
                    <p className="education-name2">{item?.region}</p>
                  </div>
                  <img src={eduImg} alt="" className="education-img" />
                </div>
                <div className="edu-items-box">
                  {item?.courses.slice(0, 4).map((cours, i) => (
                    <p className="edu-items" key={i}>
                      {cours?.subCourse}
                    </p>
                  ))}
                </div>
                <span className="under-line-edu"></span>
                <button
                  className="edu-boshladik-box"
                  onClick={() => clickCard(item?.id)}
                  type="button"
                >
                  <p className="boshladik">Batafsil</p>
                  <svg
                    className="arrow-img"
                    width="67"
                    height="18"
                    viewBox="0 0 67 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 9H65M65 9L57 1M65 9L57 17"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {eduData.length === 0 ? (
        ""
      ) : (
        <button
          className="load-more-button"
          onClick={loadMoreItems}
          type="button"
        >
          Yana
        </button>
      )}
    </div>
  );
};

export default EduComponent;
