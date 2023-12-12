import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Addinfo.css";
import arrow from "../../assets/icons/arrowleft.svg";
import eduName from "../../assets/icons/edit-2.svg";
import dasturlash from "../../assets/icons/dasturlah.svg";
import code from "../../assets/icons/Frame 48097672.svg";
import triangle from "../../assets/icons/triangle.svg";
import hemlet from "../../assets/icons/hemlet.svg";
import phone from "../../assets/icons/call.svg";
import locationimg from "../../assets/icons/location2.svg";
import del from "../../assets/icons/del.svg";
import { Context } from "../../context/context";
import Swal from "sweetalert2";
import { serverDomain } from "../../utils/url";
import { region } from "../Header";

const Addinfo = () => {
  const { editData,setEditData } = useContext(Context);
  const navigate = useNavigate()
  const initialCourses = editData?.data?.courses
    ? editData.data.courses
        .filter((course) => course.coursesType === "PROGRAMMING")
        .flatMap((course) => course.subCourse)
    : [];
  const initialCompSciens = editData?.data?.courses
    ? editData.data.courses
        .filter((course) => course.coursesType === "COMPUTER_SCIENCE")
        .flatMap((course) => course.subCourse)
    : [];
  const initialThreD = editData?.data?.courses
    ? editData.data.courses
        .filter((course) => course.coursesType === "THREE_D_MODELING")
        .flatMap((course) => course.subCourse)
    : [];
  const initialoThers = editData?.data?.courses
    ? editData.data.courses
        .filter((course) => course.coursesType === "OTHERS")
        .flatMap((course) => course.subCourse)
    : [];

  const [coursevalue, setCoursevalue] = useState(initialCourses || []);

  const [kompScine, setKompScine] = useState(initialCompSciens || []);
  const [threDvalue, setThreDvalue] = useState(initialThreD || []);
  const [subjectValue, setSubjectValue] = useState(initialoThers || []);
  const [location, setLocation] = useState(editData?.data?.location || "");
  const [phoneNumber, setPhoneNumber] = useState(
    editData?.data?.phone || "+998"
  );
  const [regionName, setRegionName] = useState(editData?.data?.regions || null);
  const [companyName, setCompanyName] = useState(
    editData?.data?.companyName || ""
  );
  const [courseType, setCourseType] = useState("");
  const [selectedRegionIndex, setSelectedRegionIndex] = useState(null);
    console.log(editData, "ewjvweivqeiu");

  //! POST FUNCTION
  const handleSave = async () => {
    if (!companyName || !phoneNumber || !location || !regionName) {
      Swal.fire("Ogohlantirish", "Barcha maydonlarni to'ldiring", "warning");
      return;
    }
    if (editData?.data?.id) {
      const dataToSend = {
        data: {
          id: editData?.data?.id,
          companyName: companyName,
          phone: phoneNumber,
          location: location,
          regions: regionName,
          courses: [
            {
              coursesType: "PROGRAMMING",
              subCourse: coursevalue,
            },
            {
              coursesType: "COMPUTER_SCIENCE",
              subCourse: kompScine,
            },
            {
              coursesType: "THREE_D_MODELING",
              subCourse: threDvalue,
            },
            {
              coursesType: "OTHERS",
              subCourse: subjectValue,
            },
          ],
        },
      };
    }
    const dataToSend = {
      data: {
        id: editData?.data?.id,
        companyName: companyName,
        phone: phoneNumber,
        location: location,
        regions: regionName,
        courses: [
          {
            coursesType: "PROGRAMMING",
            subCourse: coursevalue,
          },
          {
            coursesType: "COMPUTER_SCIENCE",
            subCourse: kompScine,
          },
          {
            coursesType: "THREE_D_MODELING",
            subCourse: threDvalue,
          },
          {
            coursesType: "OTHERS",
            subCourse: subjectValue,
          },
        ],
      },
    };

    try {
      const token = localStorage.getItem("token");
      let url = `${serverDomain}/add`;

      if (editData?.data?.id) {
        url = `${serverDomain}/edite/info`;
      }

      const response = await fetch(url, {
        method: editData?.data?.id ? "PUT" : "POST",
        headers: {
          Authorization: "Basic " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setCoursevalue([]);
        setKompScine([]);
        setThreDvalue([]);
        setSubjectValue([]);
        setLocation("");
        setPhoneNumber("");
        setRegionName(null);
        setCompanyName("");
        setCourseType("");
        setSelectedRegionIndex(null);
        navigate('/')
        setEditData('')
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.message ||
          "Server bilan ulanishda xatolik yuz berdi yoki boshqa xatolik.";
        Swal.fire("Xatolik", errorMessage, "error");
      }
    } catch (error) {
      Swal.fire(
        "Xatolik",
        "Server bilan ulanishda xatolik yuz berdi.",
        "error"
      );
      console.error("An error occurred", error);
    }
  };

  //! CANSEL FUNCTION
  const handleCansel = () => {
    setCoursevalue([]);
    setKompScine([]);
    setThreDvalue([]);
    setSubjectValue([]);
    setLocation("");
    setPhoneNumber("");
    setRegionName(null);
    setCompanyName("");
    setCourseType("");
    setSelectedRegionIndex(null);
    navigate('/')
  };

  //! INPUT CHECK FUNCTION
  const handleChange = (e) => {
    let inputPhoneNumber = e.target.value.replace(/[^0-9+]/g, "");

    if (inputPhoneNumber.length <= 13) {
      const phoneRegex = /^998([378]{2}|(9[013-57-9]))\d{7}$/;

      if (phoneRegex.test(inputPhoneNumber)) {
        setPhoneNumber(inputPhoneNumber);
      } else {
        setPhoneNumber(inputPhoneNumber);
      }
    } 
  };

  return (
    <section className="add-info">
      <div className="container">
        <Link to="/admin" className="back-admin">
          <img src={arrow} alt="" className="back-arrow" />
        </Link>
        <div className="admin-top-box">
          <p className="barcha-malumotlar">Barcha listlar</p>
        </div>
        <div className="addinfo-top-box">
          <div className="input-wrap">
            <div className="pre-input-box">
              <img src={eduName} alt="" className="education-img2" />
              <span className="y-line"></span>
            </div>
            <input
              type="text"
              className="input-name-edu"
              placeholder="IT Live style birnarsa Education"
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value.toUpperCase())}
              required
            />
          </div>
          <div className="input-wrap">
            <div className="pre-input-box">
              <img src={phone} alt="" className="education-img2" />
            </div>
            <input
              type="text"
              className="input-name-edu "
              name="phone"
              value={phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-wrap">
            <div className="pre-input-box">
              <img src={locationimg} alt="" className="education-img2" />
              <span className="y-line"></span>
            </div>
            <textarea
              className="text-area"
              name="location"
              placeholder="Manzil"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <div className="add-info-secodbox">
          <p className="addinfo-yonalishlar">Viloyatni tanlang</p>
          <span className="under-line-addinfo"></span>
          <div className="addinfo__button-box">
            {region.map((items, index) => (
              <button
                className={`header__region-btn ${
                  selectedRegionIndex === index ||
                  (editData?.data?.id &&
                    editData?.data?.regions === items.name2)
                    ? "active"
                    : ""
                }`}
                key={index}
                onClick={() => {
                  setRegionName(items.name2);
                  setSelectedRegionIndex(index);
                }}
              >
                {items.name}
              </button>
            ))}
          </div>
          <p className="addinfo-yonalishlar">Yo’nalishlar</p>
          <span className="under-line"></span>
          <div className="addinfo-inputs-boxs">
            <div className="inputstop-boxs">
              <img src={code} alt="" className="icon-way" />
              <span className="way-name">Dasturlash</span>
            </div>
            <div className="input-boxs">
              {coursevalue &&
                coursevalue.map((item, index) => (
                  <button className="yonalish-btn" key={index}>
                    {item}
                    <img
                      src={del}
                      alt=""
                      className="delet-btn"
                      onClick={() => {
                        setCoursevalue((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    />
                  </button>
                ))}
              <input
                className="addinfos-input"
                type="text"
                placeholder="Add course"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (e.target.value.trim() !== "") {
                      setCoursevalue([...coursevalue, e.target.value.trim()]);
                      setCourseType("");
                      e.target.value = "";
                    }
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>
          <div className="addinfo-inputs-boxs">
            <div className="inputstop-boxs">
              <img src={dasturlash} alt="" className="icon-way" />
              <span className="way-name">Kompyuter savodxonlik</span>
            </div>
            <div className="input-boxs">
              {coursevalue &&
                kompScine.map((item, index) => (
                  <button className="yonalish-btn" key={index}>
                    {item}
                    <img
                      src={del}
                      alt=""
                      className="delet-btn"
                      onClick={() => {
                        setKompScine((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    />
                  </button>
                ))}
              <input
                className="addinfos-input"
                type="text"
                placeholder="Add course"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (e.target.value.trim() !== "") {
                      setKompScine([...kompScine, e.target.value.trim()]);
                      e.target.value = "";
                    }
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>
          <div className="addinfo-inputs-boxs">
            <div className="inputstop-boxs">
              <img src={triangle} alt="" className="icon-way" />
              <span className="way-name">3D Model</span>
            </div>
            <div className="input-boxs">
              {threDvalue.map((item, index) => (
                <button className="yonalish-btn" key={index}>
                  {item}
                  <img
                    src={del}
                    alt=""
                    className="delet-btn"
                    onClick={() => {
                      setThreDvalue((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                  />
                </button>
              ))}
              <input
                className="addinfos-input"
                type="text"
                placeholder="Add course"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (e.target.value.trim() !== "") {
                      setThreDvalue([...threDvalue, e.target.value.trim()]);
                      e.target.value = "";
                    }
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>
          <div className="addinfo-inputs-boxs">
            <div className="inputstop-boxs">
              <img src={hemlet} alt="" className="icon-way" />
              <span className="way-name">Fanlar</span>
            </div>
            <div className="input-boxs">
              {subjectValue.map((item, index) => (
                <button className="yonalish-btn" key={index}>
                  {item}
                  <img
                    src={del}
                    alt=""
                    className="delet-btn"
                    onClick={() => {
                      setSubjectValue((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                  />
                </button>
              ))}
              <input
                className="addinfos-input"
                type="text"
                placeholder="Add course"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (e.target.value.trim() !== "") {
                      setSubjectValue([...subjectValue, e.target.value.trim()]);
                      e.target.value = "";
                    }
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>
          <div className="save-ignor-btnbox">
            <button className="save-and-ignore-btn" onClick={handleCansel}>
              Bekor qilish
            </button>
            <button className="save-and-ignore-btn" onClick={handleSave}>
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Addinfo;
