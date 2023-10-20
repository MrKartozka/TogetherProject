import {Form} from './Form';
import { useNavigate } from 'react-router-dom'; // Change this import
import {useDispatch} from 'react-redux';
import {setUser} from 'store/slices/userSlice';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Change this line

    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                navigate('/'); // Change this line
            })
            .catch(console.error)
    }

  return (
    <Form
        title='Принять'
        handleClick={handleRegister}
    />
  )
}

export {SignUp}