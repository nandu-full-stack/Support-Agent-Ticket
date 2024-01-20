import React, { useState } from 'react';
import './Agent.css';
import { useNavigate } from 'react-router-dom';

const Agent = () => {

    const naviagte = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");

    const agentData = { name, email, phoneNumber, description };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = () => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };
    
    const navigateToCreateTicket =() =>{
        naviagte('/createTicket')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            alert('Please fill in the Name field.');
            return;
        }

        if (!email) {
            alert('Please fill in the Email field.');
            return;
        }

        if (!phoneNumber) {
            alert('Please fill in the PhoneNumber field.');
            return;
        }

        if (!validateEmail()) {
            alert('Invalid email address');
            return;
        }

        if (!validatePhoneNumber()) {
            alert('Please give valid phone number');
            return;
        }

        try {
            const response = await fetch(`${window.location.origin}/api/support-agents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agentData),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert(data.message);
                setName("");
                setEmail("");
                setPhoneNumber("");
                setDescription("");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='container'>

            <h2>Support Agent</h2>

            <input type="text" placeholder='Name' name="name" value={name} onChange={e => setName(e.target.value)} />

            <input type="email" placeholder='Email' name="email" value={email} onChange={e => setEmail(e.target.value)} />

            <input type="tel" placeholder='Phone Number' name="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />

            <input type="text" placeholder='Description' name="description" value={description} onChange={e => setDescription(e.target.value)} />

            <div className="buttons">
                <div className="button" onClick={handleSubmit}>Submit</div>
                <div className="button" onClick={navigateToCreateTicket}>Create Ticket</div>
            </div>
        </div>
    );

}

export default Agent
