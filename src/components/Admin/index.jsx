import React, { useContext, useEffect, useState } from "react";
import "./Admin.css";
import { Link, useNavigate } from "react-router-dom";
import plus from "../../assets/icons/plus.png";
import edit from "../../assets/icons/edit-2.svg";
import delet from "../../assets/icons/trash.svg";
import img from "../../assets/icons/eduimg.svg";
import phone from "../../assets/icons/phone.svg";
import location from "../../assets/icons/location 1.svg";
import { Context } from "../../context/context";
import { serverDomain } from "../../utils/url";
import Swal from "sweetalert2";
import LoadingSpinner from "../LoadingSpinner";

const Admin = () => {
  const { eduData, seteduData, setEditData } = useContext(Context);
  const [modalStates, setModalStates] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ! DELET FUNCTION
  const deletItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${serverDomain}/delete/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + token,
        },
      });

      if (response.ok) {
        Swal.fire("Ma'lumot muvoffaqiyatli ochirildi ?");
        seteduData((prevData) => prevData.filter((item) => item.id !== itemId));
        makeAPICall()
      } else {
        console.error("Error deleting item");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  // !GET ALL  DATA FUNCTION
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
        console.log(e);
        setLoading(false);
      }
    };
    makeAPICall();
  }, []);
  
  //! OPEN MODAL FUNCTION
  const toggleModal = (itemId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };
  //! EDIT FUNCTION
  const editItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${serverDomain}/get/one/${itemId}`, {
        headers: {
          Authorization: "Basic " + token,
        },
      });

      const data = await response.json();
      setEditData(data);
      navigate("/add-info");
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <section className="admin-section">
      <div className="admin-top-box">
        <p className="barcha-malumotlar">Barcha listlar</p>
        <Link to="/add-info" className="linkadd">
          Malumot qo'shsih
          <img src={plus} alt="" className="pluss" />
        </Link>
      </div>
      <ul className="admin-bottom-box">
        {eduData?.map((items, index) => (
          <li className="admin-bottom-items" key={index}>
            <div className="items-title-box">
              <div className="edu-yonalish-boxs">
                <p className="admin-name-edu">{items?.name}</p>
                <p className="regions">{items?.region}</p>
              </div>
              <button
                className="del-edit-btn"
                type="button"
                onClick={() => toggleModal(items.id)}
              >
                <span className="rounded"></span>
                <span className="rounded"></span>
                <span className="rounded"></span>
              </button>
              {modalStates[items.id] && (
                <div className="modal-content">
                  <button
                    className="modal-btn"
                    onClick={() => deletItem(items.id)}
                  >
                    <img src={delet} alt="" className="edit-modal" />
                    Delete
                  </button>
                  <span className="modal-line"></span>
                  <button
                    className="modal-btn"
                    onClick={() => editItem(items.id)}
                  >
                    <img src={edit} alt="" className="edit-modal" />
                    Edit
                  </button>
                  <span className="modal-line"></span>

                  <button
                    className="close-btn"
                    onClick={() => {
                      toggleModal(items.id);
                    }}
                  >
                    &times; Close
                  </button>
                </div>
              )}
            </div>
            <div className="admin-info-box">
              <div className="img-box">
                <img src={img} alt="" className="img-figma" />
              </div>
              <div className="yonalishlar-boksi">
                {items?.courses?.slice(0, 7).map((cours, i) => (
                  <p className="yonalishlarni-nomi" key={i}>
                    {cours?.subCourse}
                  </p>
                ))}
              </div>
              <div className="contact-box">
                <div className="phone-box">
                  <img src={phone} alt="" />
                  <a
                    href={`tel:${items?.phone.toString().slice(1)}`}
                    className="phone-style"
                  >
                    {items?.phone}
                  </a>
                </div>
                <div className="phone-box">
                  <img src={location} alt="" className="" />
                  <address>
                    {items?.region}, {items?.location}
                  </address>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Admin;
