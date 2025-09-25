import { useEffect, useState } from "react";

import axios from "axios";

function Panel() {

    const [status, setStatus] = useState(0);

    async function onConnectClick() {
        const response = await axios.get('http://localhost:3000/api/enable');
        setStatus(response.data.status);
    }

    async function onDisconnectClick() {
        const response = await axios.get('http://localhost:3000/api/disable');
        setStatus(response.data.status);
    }

    const getBotStatus = async () => {
        const response = await axios.get('http://localhost:3000/api/status');
        setStatus(response.data.status);
    }

    useEffect(() => {
        getBotStatus();
    }, []);

    return (
        <div className="space-x-5">

            <button onClick={onConnectClick}    className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 font-bold w-32" disabled={status == 1 }>Start</button>
            <button onClick={onDisconnectClick} className="px-4 py-2 rounded bg-red-800 hover:bg-red-900 font-bold w-32" disabled={status == 0 }>Stop</button>

            <div>
                <p>
                    Bot Status: {status == 1 ?
                    <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 my-2 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20">Connected</span>
                    : 
                    <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 my-2 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20">Disconnected</span>}
                </p>
            </div>

        </div>
    );
}

export default Panel