import React, { useState, useEffect } from "react";
import styles from "./NotesContent.module.css";
import send1 from "../../assets/send.png";
import send2 from "../../assets/bluesend.png";
import back from "../../assets/back.png";

const NotesContent = ({ groupSelect, groups, setGroups }) => {
  const [note, setNote] = useState("");

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
  }, []);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = () => {
    let newGroup = [...groups];

    let currentGroup = newGroup[groupSelect.id];

    let time = `${new Date().toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;

    let date = ` ${new Date().toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;

    currentGroup["notes"].push({ date, time, note });
    localStorage.setItem("groups", JSON.stringify(newGroup));
    setGroups(newGroup);
    setNote("");
  };

  const keypress = (e) => {
    if (e.code === "Enter") {
      handleSubmit();
    }
  };
  const isContentEmpty = !note.trim();
  const sendButtonImage = isContentEmpty ? send1 : send2;
  return (
    <>
      {screenSize.width < 990 ? (
        <div className={styles.mobile__notes__container}>
          <div className={styles.mobile__notes__header}>
            <img
              src={back}
              alt={back}
              className={styles.mobile__backbtn}
              onClick={() => {
                window.location.reload();
              }}
            />

            <div
              className={styles.mobile__notes__group}
              style={{ background: groupSelect.color }}
            >
              {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
            </div>
            <h2 className={styles.mobile__group__name}>
              {groupSelect.groupName}
            </h2>
          </div>
          <div className={styles.mobile__notes__content}>
            {groupSelect.notes.map((note, index) => (
              <div className={styles.mobile__notes__area} key={index}>
                <p className={styles.Text}>{note.note}</p>
                <div className={styles.mobile__date__time}>
                  <p className={styles.Date}>{note.date}</p>
                  <p style={{ fontSize: "13px", fontWeight: "900" }}>.</p>
                  <p className={styles.Time}>{note.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.mobile__textarea}>
            <textarea
              className={styles.mobile__textarea__input}
              type="text"
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..."
              onKeyDown={isContentEmpty ? null : keypress}
            ></textarea>
            <img
              src={sendButtonImage}
              alt="SendImg"
              className={`${styles.mobile__send} ${
                isContentEmpty ? " " : styles.enabled
              }`}
              onClick={handleSubmit}
            />
          </div>
        </div>
      ) : (
        <div className={styles.desktop__notes__container}>
          <div className={styles.desktop__notes__header}>
            <div
              className={styles.desktop__notes__group}
              style={{ background: groupSelect.color }}
            >
              {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
            </div>
            <h2 className={styles.desktop__group__name}>
              {groupSelect.groupName}
            </h2>
          </div>
          <div className={styles.desktop__notes__content}>
            {groupSelect.notes.map((note, index) => (
              <div className={styles.desktop__notes__area} key={index}>
                <p className={styles.Text}>{note.note}</p>
                <div className={styles.desktop__date__time}>
                  <p className={styles.Date}>{note.date}</p>
                  <p style={{ fontSize: "20px", fontWeight: "900" }}>.</p>
                  <p className={styles.Time}>{note.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.desktop__notes__textarea}>
            <textarea
              className={styles.desktop__textarea__input}
              type="text"
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..."
              onKeyDown={isContentEmpty ? null : keypress}
            ></textarea>
            <img
              src={sendButtonImage}
              className={`${styles.desktop__send} ${
                isContentEmpty ? " " : styles.enabled
              }`}
              alt="Send"
              onClick={handleSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NotesContent;
