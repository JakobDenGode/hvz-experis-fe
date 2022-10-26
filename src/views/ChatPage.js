import React, { useEffect, useState, useLayoutEffect } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { usePlayer, useSquad } from "../context/PlayerContext";
import MobileNavBar from "../components/nav/MobileNavBar";

let stompClient = null;
const ChatPage = () => {
  
  const game = useParams();
  const gameId = game.gameId;
  const { player, setPlayer } = usePlayer();
  const { squad, setSquad } = useSquad();

  const { getAccessTokenSilently } = useAuth0();
  const [privateChats, setPrivateChats] = useState([]);
  const [globalChats, setGlobalChats] = useState([]);
  const [publicChats, setPublicChats] = useState([]);
  const [humanChats, setHumanChats] = useState([]);
  const [zombieChats, setZombieChats] = useState([]);
  const [squadChats, setSquadChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState("GLOBAL");
  const [userData, setUserData] = useState({
    username: player.nickname,
    receivername: "",
    connected: false,
    message: "",
  });


  const connect = () => {
    let Sock = new SockJS(`https://hvz-api-noroff.herokuapp.com/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };


  useEffect(() => {

    const findGlobal = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const config = {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER_URL}games/${gameId}/chat/${player.id}/global`,
          config
        );
        //if (!response.ok) throw new Error("Could not complete request");
        
        const data = await response.json();
        setPublicChats(data);
        return [null, data];
      } catch (error) {
        return [error.message, []];
      }
    };

    const findFactionChats = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const config = {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER_URL}games/${gameId}/chat/${player.id}/faction`,
          config
        );
        //if (!response.ok) throw new Error("Could not complete request");
        const data = await response.json();

        if (player.human) {
          setHumanChats(data);
        } else {
          setZombieChats(data);
        }
        return [null, data];
      } catch (error) {
        return [error.message, []];
      }
    };

      const findSquadChats = async () => {
        const accessToken = await getAccessTokenSilently();  
        try {
          const config = {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${accessToken}`, 
            },
          };
          const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}games/${gameId}/squad/${squad.id}/chat`, config);
          //if (!response.ok) throw new Error("Could not complete request");
          const data = await response.json();
        setSquadChats(data);
        return [null, data];
      } catch (error) {
        return [error.message, []];
      }
    };

    findGlobal();
    findFactionChats(); 
    if (squad) {
      findSquadChats();
    }
  }, []);

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/" + gameId, onMessageReceived);

    if (player.human) {
      stompClient.subscribe("/chatroom/" + gameId + "/human", onHumanMessage);
    } else {
      stompClient.subscribe("/chatroom/" + gameId + "/zombie", onZombieMessage);
    }

    if (squad) {
      stompClient.subscribe(
        "/chatroom/" + gameId + "/" + squad.id,
        onSquadMessage
      );
    }
    userJoin();
  };

  const userJoin = () => {
    const chatMessage = {
      senderName: userData.username,
      status: "JOIN",
      human: player.human,
      global: true,
      game: gameId,
      player: player.id,
    };
    stompClient.send(
      `/app/chat/${gameId}/addUser`,
      {},
      JSON.stringify(chatMessage)
    );
    stompClient.send(
      `/app/chat/${gameId}/sendMessage`,
      {},
      JSON.stringify(chatMessage)
    );
  };

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        break;
      default:
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onHumanMessage = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        break;
      default:
        humanChats.push(payloadData);
        setHumanChats([...humanChats]);
        break;
    }
  };

  const onZombieMessage = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        break;
      default:
        zombieChats.push(payloadData);
        setZombieChats([...zombieChats]);
        break;
    }
  };

  const onSquadMessage = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        break;
      default:
        squadChats.push(payloadData);
        setSquadChats([...squadChats]);
        break;
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
        human: player.human,
        global: true,
        game: gameId,
        player: player.id,
      };
      stompClient.send(
        `/app/chat/${gameId}/sendMessage`,
        {},
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: "" });
    }
  };

  const sendHumanValue = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
        human: player.human,
        global: false,
        game: gameId,
        player: player.id,
      };
      stompClient.send(
        `/app/chat/${gameId}/human/sendMessage`,
        {},
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: "" });
    }
  };

  const sendZombieValue = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
        human: player.human,
        global: false,
        game: gameId,
        player: player.id,
      };
      stompClient.send(
        `/app/chat/${gameId}/zombie/sendMessage`,
        {},
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: "" });
    }
  };

  const sendSquadValue = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
        human: player.human,
        global: false,
        game: gameId,
        player: player.id,
      };
      stompClient.send(
        `/app/chat/${gameId}/${squad.id}/sendMessage`,
        {},
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  return (
    <>
      <div className="container">
        {userData.connected ? (
          <div className="chat-box w-100 d-flex flex-column">
            <div className="member-list">
              <ul className="d-flex">
                <li
                  onClick={() => {
                    setTab("GLOBAL");
                  }}
                  className={`member ${tab === "GLOBAL" && "active"}`}
                >
                  Global
                </li>
                {!player.human ? (
                  <li
                    onClick={() => {
                      setTab("ZOMBIE");
                    }}
                    className={`member ${tab === "ZOMBIE" && "active"}`}
                  >
                    Zombie
                  </li>
                ) : (
                  <li
                    onClick={() => {
                      setTab("HUMAN");
                    }}
                    className={`member ${tab === "HUMAN" && "active"}`}
                  >
                    Human
                  </li>
                )}

                {squad && squad.id !== 0 && (
                  <li
                    onClick={() => {
                      setTab("SQUAD");
                    }}
                    className={`member ${tab === "SQUAD" && "active"}`}
                  >
                    Squad
                  </li>
                )}

                {[...privateChats.keys()].map((name, index) => (
                  <li
                    onClick={() => {
                      setTab(name);
                    }}
                    className={`member ${tab === name && "active"}`}
                    key={index}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
            {tab === "GLOBAL" && (
              <div className="chat-content">
                <ul className="chat-messages">
                  <div>
                    {publicChats.map((chat, index) => (
                      <li
                        className={`message ${
                          chat.senderName === userData.username && "self"
                        }`}
                        key={index}
                      >
                        {chat.senderName !== userData.username && (
                          <div className="avatar">{chat.senderName}</div>
                        )}
                        <div className="message-data">
                          {" "}
                          <b>{chat.message} </b>
                          {chat.chatTime}{" "}
                        </div>
                        {chat.senderName === userData.username && (
                          <div className="avatar self">{chat.senderName}</div>
                        )}
                      </li>
                    ))}
                  </div>
                </ul>

                <div className="send-message">
                  <input
                    type="text"
                    className="input-message"
                    placeholder="enter the message"
                    value={userData.message}
                    onChange={handleMessage}
                  />
                  <button
                    type="button"
                    className="send-button"
                    onClick={sendValue}
                  >
                    send
                  </button>
                </div>
              </div>
            )}
            {tab === "ZOMBIE" && (
              <div className="chat-content">
                <ul className="chat-messages">
                  <div>
                    {zombieChats.length > 0 &&
                      zombieChats.map((chat, index) => (
                        <li
                          className={`message ${
                            chat.senderName === userData.username && "self"
                          }`}
                          key={index}
                        >
                          {chat.senderName !== userData.username && (
                            <div className="avatar">{chat.senderName}</div>
                          )}
                          <div className="message-data">
                            <b>{chat.message} </b>
                            {chat.chatTime}
                          </div>
                          {chat.senderName === userData.username && (
                            <div className="avatar self">{chat.senderName}</div>
                          )}
                        </li>
                      ))}
                  </div>
                </ul>

                <div className="send-message">
                  <input
                    type="text"
                    className="input-message"
                    placeholder="enter the message"
                    value={userData.message}
                    onChange={handleMessage}
                  />
                  <button
                    type="button"
                    className="send-button"
                    onClick={sendZombieValue}
                  >
                    send
                  </button>
                </div>
              </div>
            )}
            {tab === "HUMAN" && (
              <div className="chat-content">
                <ul className="chat-messages">
                  <div>
                    {humanChats.length > 0 &&
                      humanChats.map((chat, index) => (
                        <li
                          className={`message ${
                            chat.senderName === userData.username && "self"
                          }`}
                          key={index}
                        >
                          {chat.senderName !== userData.username && (
                            <div className="avatar">{chat.senderName}</div>
                          )}
                          <div className="message-data">
                            <b>{chat.message} </b>
                            {chat.chatTime}
                          </div>
                          {chat.senderName === userData.username && (
                            <div className="avatar self">{chat.senderName}</div>
                          )}
                        </li>
                      ))}
                  </div>
                </ul>

                <div className="send-message">
                  <input
                    type="text"
                    className="input-message"
                    placeholder="enter the message"
                    value={userData.message}
                    onChange={handleMessage}
                  />
                  <button
                    type="button"
                    className="send-button"
                    onClick={sendHumanValue}
                  >
                    send
                  </button>
                </div>
              </div>
            )}
            {tab === "SQUAD" && (
              <div className="chat-content">
                <ul className="chat-messages">
                  <div>
                    {squadChats.length > 0 &&
                      squadChats.map((chat, index) => (
                        <li
                          className={`message ${
                            chat.senderName === userData.username && "self"
                          }`}
                          key={index}
                        >
                          {chat.senderName !== userData.username && (
                            <div className="avatar">{chat.senderName}</div>
                          )}
                          <div className="message-data">
                            <b>{chat.message} </b>
                            {chat.chatTime}
                          </div>
                          {chat.senderName === userData.username && (
                            <div className="avatar self">{chat.senderName}</div>
                          )}
                        </li>
                      ))}
                  </div>
                </ul>

                <div className="send-message">
                  <input
                    type="text"
                    className="input-message"
                    placeholder="enter the message"
                    value={userData.message}
                    onChange={handleMessage}
                  />
                  <button
                    type="button"
                    className="send-button"
                    onClick={sendSquadValue}
                  >
                    send
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="register">
            <button
              className="chat-button"
              type="button"
              onClick={registerUser}
            >
              Open chat
            </button>
          </div>
        )}
      </div>
      <MobileNavBar />
    </>
  );
};

export default ChatPage;
