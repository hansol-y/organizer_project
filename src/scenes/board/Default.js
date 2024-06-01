
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import user_img from '../../assets/user.png'

import './Board.css';

const Default = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId, password, username, email, token } = location.state;

    const signOut = () => {
        navigate('/', {state: null});
    }

    const navigateMyPage = () => {
        navigate('/MyPage', {state: {userId: userId, password: password, username: username, email: email, token: token}});
    }

    const navigateDashboard = () => {
        navigate('/Dashboard', {state: {userId: userId, password: password, username: username, email: email, token: token}});
    }

    const navigateCoord = () => {
        navigate('/Coord', {state: {userId: userId, password: password, username: username, email: email, token: token}});
    }

    const navigateHistory = () => {
        navigate('/History', {state: {userId: userId, password: password, username: username, email: email, token: token}});
    }

    const navigateSuggestion = () => {
        navigate('/Suggestion', {state: {userId: userId, password: password, username: username, email: email, token: token}});
    }

    return (
        <div className="default">
            <div className='sidebar'>
                <nav>
                    <ul className='sidemenu'>
                        <li onClick={navigateDashboard}>
                            Dashboard
                        </li>
                        <li onClick={navigateCoord}>
                            Coordinate
                        </li>
                        <li onClick={navigateHistory}>
                            Mood History
                        </li>
                        <li onClick={navigateSuggestion}>
                            Suggestion
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='my-info-side'>
                <ul>
                    <li className='menu-hover' onClick={navigateMyPage}>
                        My Page
                    </li>
                    <li className='menu-hover' onClick={signOut}>
                        Sign Out
                    </li>
                    <li>
                        <img src={user_img} className='user-img-info-side' />
                    </li>
                    <li>
                        Hello, {username}!
                    </li>
                </ul>
            </div>
            <div className='content'>
                {children}
            </div>
        </div>
    );
}

export default Default;
