import { useState } from 'react';
import './Form.css'
import { Link } from 'react-router-dom';

const FormReg = ({ title, handleClick }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className='auth-menu'>
            <div className='auth-menu__box'>
                <h1>Регистрация</h1>
                <input className='emailbox'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='  Email...'
                />
                <input className='passwordbox'
                    type='password'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder='  Password...'
                />
                {/* Confirm password И СДЕЛАТЬ ЧТОБЫ КЛИК ОТОБРАЖАЛСЯ ЧУТЬ ПРАВЕЕ
                <input className='passwordbox'
                    type='password'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder='password'
                />
                */}
                <button className='buttonbox'
                    onClick={() => handleClick(email, pass)}
                >
                    {title}
                </button>
            </div>
            <div className='registerlink'>
                <p>
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    )
}

export { FormReg }