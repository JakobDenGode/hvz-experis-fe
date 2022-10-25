import React, { useEffect, useState, useLayoutEffect } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from 'react-router-dom';
import { usePlayer, useSquad } from '../context/PlayerContext';

let stompClient =null;
let gameId = 1; 
let human = false; 
let squadId = 1; 
let playerId = 2; 
//let nickname = "sondre.mahre"
const ChatPage = () => {

  //const gameId = useParams(); 
  const { player, setPlayer } = usePlayer();
  const { squad, setSquad } = useSquad();
  const nickname = "sondre.mahre"

    const {
        getAccessTokenSilently
      } = useAuth0();
    const [privateChats, setPrivateChats] = useState([]);     
    const [globalChats, setGlobalChats] = useState([]);
    const [publicChats, setPublicChats] = useState([]);
    const [humanChats, setHumanChats] = useState([]); 
    const [zombieChats, setZombieChats] = useState([]); 
    const [squadChats, setSquadChats] = useState([]); 
    const [loading, setLoading] = useState(true); 

    const [tab,setTab] = useState("GLOBAL");
    const [userData, setUserData] = useState({
        username: nickname,
        receivername: '',
        connected: false,
        message: ''
      });
    
      useEffect(() => {
      console.log(userData);
    }, [userData]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }
    

    /*useEffect(() => {
      setUserData({...userData, "username": nickname})
      connect(); 
    }, [])*/

    useEffect(() => { 
        //connect(); 
        
        const findGames = async () => {
            const accessToken = await getAccessTokenSilently(); 
            console.log(accessToken); 
            try {
                console.log("HER DA!!!!")
              const config = {
                method: "GET",
                headers: {
                  "content-type": "application/json",
                  Authorization: `Bearer ${accessToken}`, 
                },
              };
              const response = await fetch(`http://localhost:8080/api/v1/games/${gameId}/chat/${playerId}/global`, config);
              //if (!response.ok) throw new Error("Could not complete request");
              console.log(response);
              const data = await response.json();
              console.log(data);
              
              //setGames2(data);
              /*const test = []
              data.forEach(element => {
                test.push(element.body)
              });*/
              setPublicChats(data); 
              console.log(publicChats); 
              return [null, data];
            } catch (error) {
                return [error.message, []];
            }
        };

        const findFactionChats = async () => {
          const accessToken = await getAccessTokenSilently(); 
          console.log(accessToken); 
          try {
              console.log("HER DA!!!!")
            const config = {
              method: "GET",
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`, 
              },
            };
            const response = await fetch(`http://localhost:8080/api/v1/games/${gameId}/chat/${playerId}/faction`, config);
            //if (!response.ok) throw new Error("Could not complete request");
            console.log(response);
            const data = await response.json();
            console.log(data);
            
            //setGames2(data);
            /*const test = []
            data.forEach(element => {
              test.push(element.body)
            });*/
            if (human) {
              setHumanChats(data); 
            } else {
              setZombieChats(data); 
            }
            console.log(publicChats); 
            return [null, data];
          } catch (error) {
              return [error.message, []];
          }
      };
        
        //setPublicChats(findGames[1]); 
        //console.log(publicChats); 
        
        findGames();
        findFactionChats();
         
          
    }, [])
    
    /*useEffect(() => {
        const findFactionChats = async () => {
            const accessToken = await getAccessTokenSilently(); 
            console.log(accessToken); 
            try {
                console.log("HER DA!!!!")
              const config = {
                method: "GET",
                headers: {
                  "content-type": "application/json",
                  Authorization: `Bearer ${accessToken}`, 
                },
              };
              const response = await fetch(`http://localhost:8080/api/v1/games/${gameId}/chat/${playerId}/faction`, config);
              //if (!response.ok) throw new Error("Could not complete request");
              console.log(response);
              const data = await response.json();
              console.log(data);
              
              //setGames2(data);
              /*const test = []
              data.forEach(element => {
                test.push(element.body)
              });
              if (human) {
                setHumanChats(data); 
              } else {
                setZombieChats(data); 
              }
              console.log(publicChats); 
              return [null, data];
            } catch (error) {
                return [error.message, []];
            }
        };
        
        //setPublicChats(findGames[1]); 
        //console.log(publicChats); 
        findFactionChats(); 
    }, [])*/

    /*useEffect(() => {
      connect(); 
    }, [!loading])*/

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/'+gameId, onMessageReceived);

    
        if (human) {
            stompClient.subscribe('/chatroom/'+gameId+'/human', onHumanMessage);
        } else {
            stompClient.subscribe('/chatroom/'+gameId+'/zombie', onZombieMessage);
        }

        stompClient.subscribe('/chatroom/'+gameId+'/'+squadId, onSquadMessage);

        userJoin();
        
    }

    const userJoin=()=>{
          const chatMessage = {
            senderName: userData.username,
            status:"JOIN", 
            human: human, 
            global: true, 
            game: gameId, 
            player: playerId
          };
          stompClient.send(`/app/chat/${gameId}/addUser`, {}, JSON.stringify(chatMessage));
          stompClient.send(`/app/chat/${gameId}/sendMessage`, {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        console.log(publicChats); 
        let payloadData = JSON.parse(payload.body);
        console.log("PAYLOAD: "+ payloadData.status)
        switch(payloadData.status){
            case "JOIN":
                console.log(payloadData.senderName + "joined ")
                break;
            default:
                console.log(publicChats); 
                publicChats.push(payloadData);
                console.log(publicChats); 
                //setPublicChats([...publicChats,[payloadData]]);
                setPublicChats([...publicChats])
                break;
        }
    }
    
    const onHumanMessage = (payload)=>{
        console.log(payload);
        let payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                console.log(payloadData.senderName + "joined ")
                break;
            default:
                humanChats.push(payloadData);
                setHumanChats([...humanChats]);
                break;
        }
    }

    const onZombieMessage = (payload)=>{
        console.log(payload);
        let payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                console.log(payloadData.senderName + "joined ")
                break;
            default:
                zombieChats.push(payloadData);
                setZombieChats([...zombieChats]);
                break;
        }
    }
    
    const onSquadMessage = (payload)=>{
        console.log(payload);
        let payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                console.log(payloadData.senderName + "joined ")
                break;
            default:
                squadChats.push(payloadData);
                setSquadChats([...squadChats]);
                break;
        }
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }

    const sendValue=()=>{
            if (stompClient) {
              const chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE",
                human: human, 
                global: true, 
                game: gameId, 
                player: playerId
              };
              console.log(chatMessage);
              //setPublicChats([...publicChats])
              console.log(publicChats);
              stompClient.send(`/app/chat/${gameId}/sendMessage`, {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendHumanValue=()=>{
        if (stompClient) {
            const chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE",
                human: human, 
                global: false, 
                game: gameId, 
                player: playerId
              };
          stompClient.send(`/app/chat/${gameId}/human/sendMessage`, {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const sendZombieValue=()=>{
        if (stompClient) {
            const chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE",
                human: human, 
                global: false, 
                game: gameId, 
                player: playerId
              };
          stompClient.send(`/app/chat/${gameId}/zombie/sendMessage`, {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const sendSquadValue=()=>{
        if (stompClient) {
            const chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE",
                human: human, 
                global: false, 
                game: gameId, 
                player: playerId
              };
          stompClient.send(`/app/chat/${gameId}/${squadId}/sendMessage`, {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    
    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }

    const registerUser2=()=>{
      setUserData({...userData, "username": nickname})
      connect();
  }

    return (
    <div className="container">
        {userData.connected?
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("GLOBAL")}} className={`member ${tab==="GLOBAL" && "active"}`}>Global</li>
                    {!human ? <li onClick={()=>{setTab("ZOMBIE")}} className={`member ${tab==="ZOMBIE" && "active"}`}>Zombie</li>:
                    <li onClick={()=>{setTab("HUMAN")}} className={`member ${tab==="HUMAN" && "active"}`}>Human</li>}
                    
                    {squadId !== 0 && <li onClick={()=>{setTab("SQUAD")}} className={`member ${tab==="SQUAD" && "active"}`}>Squad</li>}

                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            {tab==="GLOBAL" && <div className="chat-content">
                
                <ul className="chat-messages">
                <div >
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data"> <b>{chat.message} </b>{chat.chatTime}  </div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                    </div>
                </ul>
                
                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>}
            {tab==="ZOMBIE" && <div className="chat-content">
                <ul className="chat-messages">
                <div >
                    {zombieChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data"><b>{chat.message} </b>{chat.chatTime}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                    </div>
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendZombieValue}>send</button>
                </div>
            </div>}
            {tab==="HUMAN" && <div className="chat-content">
                <ul className="chat-messages">
                <div >
                    {humanChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data"><b>{chat.message} </b>{chat.chatTime}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                    </div>
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendHumanValue}>send</button>
                </div>
            </div>}
            {tab==="SQUAD" && <div className="chat-content">
                <ul className="chat-messages">
                <div >
                    {squadChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data"><b>{chat.message} </b>{chat.chatTime}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                    </div>
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendSquadValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="register">
           
              <button type="button" onClick={registerUser}>
                    connect
              </button> 
        </div>}
        
        
    </div>
    )
}

export default ChatPage
