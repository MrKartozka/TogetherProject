import { useState } from 'react';
import './Form.css'
import { Link } from 'react-router-dom';

const Form = ({ title, handleClick }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className='auth-menu'>
            <div className='auth-menu__box'>
            <h1>Авторизация</h1>
                <input className='emailbox'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=' Email...'
                />
                <input className='passwordbox'
                    type='password'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder=' Password...'
                />
                <button className='buttonbox'
                    onClick={() => handleClick(email, pass)}
                >
                    {title}
                </button>
            </div>
            <div className='registerlink'>
            <p>
              Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
            </p>
            </div>
        </div>
    )
}

export { Form }