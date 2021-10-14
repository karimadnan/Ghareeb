import React, { useEffect, useState } from 'react';
import useStore from '../store/store';
import { onMatched } from '../shared/functions';
import { io } from 'socket.io-client';

const SocketHandler = () => {
    const socket = useStore(state => state.socket);
    const [constructorHasRun, setConstructor] = useState(false);
    const setSocket = useStore(state => state.setSocket);

    const constructor = () => {
        if (constructorHasRun) return;
        setSocket(io('http://192.168.1.102:4000/', { transports: ['websocket'] }));
        setConstructor(true);
    };

    constructor();

    useEffect(() => {
        socket.on(`match-to-peer`, (msg, data, id, time) => {
            onMatched(msg, data, id, time);
        });
    }, [])

    return (null);
};

export default SocketHandler;
