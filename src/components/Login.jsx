import {Form} from './Form';
import {useDispatch} from 'react-redux';
import {setUser} from 'store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useHistory} from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const {push} = useHistory();
    
    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
              console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                push('/')
            })
            .catch(console.error)
    }

  return (
    <Form
        title='sign in'
        handleClick={handleLogin}
    />
  )
}

export {Login}