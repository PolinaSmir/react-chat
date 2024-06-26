import React, { useState, useReducer, useEffect } from "react";
import DialogList from "../DialogList/DialogList";
import Chat from "../Chat/Chat";
import MessageArea from "../MessageArea/MessageArea";
import styles from "./Dashboard.module.css";
import UserContext from "../../contexts/UserContext";
import MessageContext from "../../contexts/MessageContext";
import { getMessages } from "../../api";
import CONSTANTS from "../../constants/index";
import { messageReducer } from "../../reducers/messageReducer";
const { ACTIONS } = CONSTANTS;

const initialState = {
  messages: [],
  error: null,
  isLoading: true,
};

const Dashboard = () => {
  const [user, setUser] = useState({
    id: 1,
    username: "Main Admin 24",
    imageSrc: "https://robohash.org/main-admin-24?set=set4",
  });

  const [state, dispatch] = useReducer(messageReducer, initialState);

  useEffect(() => {
    getMessages()
      .then((messages) => {
        dispatch({
          type: ACTIONS.MESSAGE_LOAD_SUCCESS,
          payload: messages,
        });
      })
      .catch((error) => {
        dispatch({
          type: ACTIONS.MESSAGE_LOAD_ERROR,
          payload: error,
        });
      });
  }, []);

  const createMessage = (text) => {
    const newMessage = {
      body: text,
      id: state.messages.length + 1,
      user,
    };

    dispatch({
      type: ACTIONS.ADD_NEW_MESSAGE,
      payload: newMessage,
    });
  };

  const deleteMessage = (id) => {
    dispatch({
      type: ACTIONS.DELETE_MESSAGE,
      payload: id,
    });
  };

  return (
    <MessageContext.Provider value={{ messageState: state, deleteMessage }}>
      <UserContext.Provider value={user}>
        <main className={styles.container}>
          <DialogList />
          <section className={styles.wrapper}>
            <Chat dashboardState={state} />
            <MessageArea sendMessage={createMessage} />
          </section>
        </main>
      </UserContext.Provider>
    </MessageContext.Provider>
  );
};

export default Dashboard;
