import React, { useEffect, useState } from "react";
import "../../css/card.css";
import Loader from "../loader/Loader";
import { GiCrossedSwords } from "react-icons/gi";
import { CiMedicalCross } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const Card = ({ quitedata }) => {
  const navigate = useNavigate();
  const deleteData = async (datas) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/deleteuserQuites/${datas}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        window.location.reload();
        console.log(data.message);  
      }
    } catch (err) {
      console.log(err);
    }
  };

  return quitedata.length === 0 ? (
    <Loader />
  ) : (
    <div className="flex-post">
      {quitedata?.map((item, index) => (
        <div key={index} className="card-main">
          <p
            onClick={() => {
              navigate("/api/user/upload-post")
            }}
            className="iconst-add">
            {<CiMedicalCross className="iconst-ss" />}
          </p>
          <p
            onClick={() => {
              deleteData(item._id);
            }}
            className="card-iconst">
            {<GiCrossedSwords className="iconst-card" />}
          </p>
          <div className="inner-card">
            <h4>{item?.title}</h4>
            <p>{item?.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
