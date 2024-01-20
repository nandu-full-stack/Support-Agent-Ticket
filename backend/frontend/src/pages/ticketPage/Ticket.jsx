import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Ticket = () => {

    const naviagte = useNavigate();

    const [topic, setTopic] = useState("");
    const [severity, setSeverity] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");

    const ticketData = { topic, severity, description, type };

    const navigateToCreateAgent = () => {
        naviagte('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!topic) {
            alert('Please fill in the Topic field.');
            return;
        }

        if (!severity) {
            alert('Please fill in the Severity field.');
            return;
        }

        if (!type) {
            alert('Please fill in the Type field.');
            return;
        }

        if (!description) {
            alert('Please fill in the Description field.');
            return;
        }


        try {
            const response = await fetch(`${window.location.origin}/api/support-tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticketData),
            });

            const data = await response.json();
            console.log(data)

            if (response.ok) {
                alert(data.message);
                setDescription("");
                setSeverity("");
                setTopic("");
                setType("");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <div className='container'>

            <h2>Ticket Entry</h2>

            <input type="text" placeholder='Topic' name="topic" value={topic} onChange={e => setTopic(e.target.value)} />

            <input type="text" placeholder='Description' name="description" value={description} onChange={e => setDescription(e.target.value)} />

            <input type="text" placeholder='Severity' name="severity" value={severity} onChange={e => setSeverity(e.target.value)} />

            <input type="text" placeholder='Type' name="type" value={type} onChange={e => setType(e.target.value)} />

            <div className="buttons">
                <div className="button" onClick={handleSubmit}>Submit</div>
                <div className="button" onClick={navigateToCreateAgent}>Create Agent</div>
            </div>
        </div>
    );
}

export default Ticket
