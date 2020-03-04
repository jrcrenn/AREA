import React from 'react';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import facebookLogo from 'Assets/facebook.png';
import '../TrelloButton/TrelloButton.css';

function LogForm(props) {
    function connect() {
        Axios('http://localhost:3000/link/auth/facebook', {
            method: 'GET'
        })
            .then(res => {
                console.log(res.data);
                localStorage.setItem('service', 'Facebook');
                window.open(res.data.url, '_blank');
            })
            .catch(e => {
                console.log(e.toString());
            });
    }

    return (
        <Button className={'TrelloButton'} onClick={connect}>
            <img className={'ConnectionLogo'} src={facebookLogo} alt=""/>
            Facebook
        </Button>
    )
}

export default LogForm;