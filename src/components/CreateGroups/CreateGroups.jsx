import React, { useState, useEffect, useRef } from "react";
import styles from "./CreateGroups.module.css";

const CreateGroups = (props) => {
  const [formData, setFormData] = useState({ grpName: "", color: "" });
  const [error, setError] = useState("");
  const setGroups = props.setGroups;
  const groups = props.groups;
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.closeModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, props]);

  const colorOptions = {
    purple: "#B38BFA",
    pink: "#FF79F2",
    blue: "#43E6FC",
    orange: "#F19576",
    darkBlue: "#0047FF",
    lightBlue: "#6691FF",
  };

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", Screen);
    return () => {
      window.removeEventListener("resize", Screen);
    };
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeColor = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.getAttribute("color"),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.grpName.trim() === "") {
      setError("Please enter a group name.");
      return;
    }

    const isGroupExists = groups.some(
      (group) => group.groupName === formData.grpName
    );

    if (isGroupExists) {
      setError("Group name already exists.");
      return;
    }

    if (formData.color === "") {
      setError("Please select a color.");
      return;
    }

    let newGroup = [
      ...groups,
      {
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
        id: groups.length,
      },
    ];
    setGroups(newGroup);
    localStorage.setItem("groups", JSON.stringify(newGroup));
    props.closeModal(false);
  };

  return (
    <>
      {screenSize.width < 990 ? (
        <div className={styles.mobile__modal__background}>
          <div ref={modalRef} className={styles.mobile__modal__container}>
            <h2 className={styles.mobile__modal__heading}>Create New Group</h2>
            <label className={styles.mobile__modal__group}>Group Name</label>
            <input
              type="text"
              className={styles.mobile__modal__inputtext}
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            <br />
            <label className={styles.mobile__modal__color}>Choose Colour</label>
            {Object.entries(colorOptions).map(([key, color]) => (
              <button
                className={`${styles.colorButton} ${
                  formData.color === color ? "selected" : ""
                }`}
                name="color"
                color={color}
                key={key}
                id={key}
                style={{
                  height: "18px",
                  width: "18px",
                  background: color,
                  borderRadius: "25px",
                  border: "none",
                  marginRight: "10px",
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            {error && <p className={styles.mobile__modal__error}>{error}</p>}
            <button
              className={styles.mobile__create__modal}
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.desktop__modal__background}>
          <div ref={modalRef} className={styles.desktop__modal__container}>
            <h2 className={styles.desktop__modal__heading}>Create New Group</h2>
            <label className={styles.desktop__modal__group}>Group Name</label>
            <input
              type="text"
              className={styles.desktop__modal__inputtext}
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            <label className={styles.desktop__modal__color}>
              Choose Colour
            </label>
            {Object.entries(colorOptions).map(([key, color]) => (
              <button
                className={`${styles.colorButton}  ${
                  formData.color === color ? "selected" : ""
                }`}
                name="color"
                color={color}
                key={key}
                id={key}
                style={{
                  height: "38px",
                  width: "38px",
                  background: color,
                  borderRadius: "25px",
                  border: "none",
                  marginRight: "10px",
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            {error && <p className={styles.error}>{error}</p>}
            <button
              className={styles.desktop__create__modal}
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroups;
