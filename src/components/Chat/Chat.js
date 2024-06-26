import React, { useContext } from "react";
import MessageContext from "../../contexts/MessageContext";
import styles from "./Chat.module.css";
import ChatItem from "./ChatItem";

const Chat = (props) => {
  const {
    messageState: { messages, error, isLoading },
  } = useContext(MessageContext);

  const messageCardsArray = messages.map((currentMessage) => {
    const {
      id,
      body,
      user,
      user: { username },
    } = currentMessage;
    return <ChatItem key={id} messageId={id} user={user} username={username} body={body} />;
  });

  return (
    <div className={styles.container}>
      {isLoading && <h1>Dialog loading...</h1>}
      {error && <h1>ERROR =(</h1>}
      {messageCardsArray}
    </div>
  );
};

export default Chat;
