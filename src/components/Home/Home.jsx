import React, { useState, useEffect, useCallback } from "react";
import CreateGroups from "../CreateGroups/CreateGroups";
import NotesContent from "../NotesContent/NotesContent";
import styles from "./Home.module.css";
import home from "../../assets/home.png";
import lock from "../../assets/lock.png";

const Home = () => {
  const getScreen = useCallback(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  const [screenSize, setScreenSize] = useState(getScreen);
  const [openModal, setOpenModal] = useState(false);
  const [groupSelect, setGroupSelect] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreen());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getScreen]);

  useEffect(() => {
    const fetchGroups = async () => {
      const storedGroups = localStorage.getItem("groups");
      if (storedGroups) {
        setGroups(JSON.parse(storedGroups));
      }
    };
    fetchGroups();
  }, []);

  const handleClick = (group) => {
    setGroupSelect(group);
  };

  const renderMobileSidebar = () => (
    <div className={styles.mobile__sidebar__container}>
      {groupSelect ? (
        <NotesContent
          groupSelect={groupSelect}
          groups={groups}
          setGroups={setGroups}
        />
      ) : (
        <>
          <h1 className={styles.mobile__heading}>Pocket Notes</h1>
          {groups?.length === 0 && (
            <p className={styles.mobile__create__group__msg}>
              Please create a group
            </p>
          )}
          <button
            className={styles.mobile_create__group__button}
            onClick={() => setOpenModal(true)}
          >
            +
          </button>
          <div className={styles.mobile_groupList}>
            {groups.map((group) => (
              <div
                key={group.id}
                className={`${styles.mobile__groupItem} ${
                  groupSelect === group ? styles.selected : ""
                }`}
                onClick={() => handleClick(group)}
              >
                <div
                  className={styles.mobile__groupIcon}
                  style={{ background: group.color }}
                >
                  {(group.groupName || "").slice(0, 2).toUpperCase()}
                </div>
                <h2 className={styles.mobile__groupName}>{group.groupName}</h2>
              </div>
            ))}
          </div>
        </>
      )}

      {openModal && (
        <CreateGroups
          closeModal={setOpenModal}
          setGroups={setGroups}
          groups={groups}
        />
      )}
    </div>
  );

  const renderDesktopSidebar = () => (
    <>
      <div className={styles.desktop__sidebar__container}>
        <h1 className={styles.desktop__heading}>Pocket Notes</h1>
        {groups?.length === 0 && (
          <p className={styles.desktop__create__group__msg}>
            Please create a group
          </p>
        )}
        <button
          className={styles.desktop__create__group__button}
          onClick={() => setOpenModal(true)}
        >
          +
        </button>
        <div className={styles.desktop__groupList}>
          {groups.map((group) => (
            <div
              key={group.id}
              className={`${styles.desktop__groupItem} ${
                groupSelect === group ? styles.selected : ""
              }`}
              onClick={() => handleClick(group)}
            >
              <div
                className={styles.desktop__groupIcon}
                style={{ background: group.color }}
              >
                {(group.groupName || "").slice(0, 2).toUpperCase()}
              </div>
              <h2 className={styles.desktop__groupName}>{group.groupName}</h2>
            </div>
          ))}
        </div>
      </div>
      {openModal && (
        <CreateGroups
          closeModal={setOpenModal}
          setGroups={setGroups}
          groups={groups}
        />
      )}
      <div className={styles.message__container}>
        {groupSelect ? (
          <NotesContent
            groupSelect={groupSelect}
            groups={groups}
            setGroups={setGroups}
          />
        ) : (
          <>
            <div className={styles.message__area__text}>
              <img src={home} alt="PocketNotes Banner" />
              <h2 className={styles.message__area__heading}>PocketNotes</h2>
              <p className={styles.message__area__description}>
                Send and receive messages without keeping your phone online.
                <br /> Use Pocket Notes on up to 4 linked devices and 1 mobile
                phone
              </p>
            </div>
            <footer className={styles.message__area__footer}>
              <img src={lock} alt="End-to-End Encryption" />
              end-to-end encrypted
            </footer>
          </>
        )}
      </div>
    </>
  );

  return screenSize.width < 990
    ? renderMobileSidebar()
    : renderDesktopSidebar();
};
export default Home;
