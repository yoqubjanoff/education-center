import React, { useContext, useEffect, useState } from "react";
import "./SinglePage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import arrow from "../../assets/icons/arrowleft.svg";
import eduImg from "../../assets/icons/eduimg.svg";
import phone from "../../assets/icons/phone.svg";
import location from "../../assets/icons/location 1.svg";
import { Context } from "../../context/context";
import { serverDomain } from "../../utils/url";
import LoadingSpinner from "../LoadingSpinner";

const SinglePage = () => {
  const navigate = useNavigate();
  const { singleData, setSingleData } = useContext(Context);
  const [loading, setLoading] = useState(true)
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${serverDomain}/get/one/${id}`, {
      headers: {
        Authorization: "Basic " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSingleData(data?.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Malumotlarni olishda xatolik:", error);
      });
  }, [id]);

  console.log(singleData);
  return loading ? <LoadingSpinner/> : (
    <div>
      <section className="single-page">
        <div className="container">
          <div className="single-page-wrap">
            <Link to="/" className="back-admin">
              <img src={arrow} alt="" className="back-arrow" />
            </Link>
            <div className="single-mainbox">
              <div className="single-name-box">
                <div className="name-box">
                  <p className="education-name1">{singleData?.companyName}</p>
                </div>
                <img src={eduImg} alt="" className="education-img" />
              </div>
              <ul className="single-lists">
                {singleData?.courses?.map((courseObject, index) => (
                  <li className="single-items" key={index}>
                    <p className="edu-title-main">
                      {courseObject?.coursesType
                        .toUpperCase()
                        .replace(/_/g, " ")}
                    </p>
                    <ul className="nested-list">
                      {courseObject.subCourse.map((subCourseItem, subIndex) => (
                        <li key={subIndex}>
                          <p className="edu-title">{subCourseItem}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              <div className="single-phonebox">
                <img src={phone} alt="" className="single-phoneImg" />
                <a
                  href={`tel:${singleData?.phone}`}
                  className="edu-phone-number"
                >
                  {singleData?.phone}
                </a>
              </div>
              <div className="single-phonebox">
                <img src={location} alt="" className="single-phoneImg" />
                <address className="edu-phone-number">
                  {singleData?.location}
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SinglePage;
