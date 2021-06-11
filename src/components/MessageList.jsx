import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import MessageCard from './MessageCard';

const MessageList = () => {
  const [messagesList, setMessagesList] = useState([]);
  useEffect(() => {
    db.collection('posts').onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map(doc => {
        const id = doc.id;
        return { id, ...doc.data() };
        // return { id: id, ...doc.data() }; // との違いは？
      });
      console.log(data);
      setMessagesList(data);
      // const sortList = data.sort((a, b) => b.sendAt - a.sendAt);
      // setMessagesList(sortList);
    });
  }, []);
  return (
    <div>
      <h2>Message List</h2>
      <hr />
      {
        messagesList.sort((a, b) => b.sendAt - a.sendAt),
        messagesList.map(message => (
          <>
            <MessageCard key={message.id} message={message} />
            <hr />
          </>))
      }
    </div>
  );
};

export default MessageList;
