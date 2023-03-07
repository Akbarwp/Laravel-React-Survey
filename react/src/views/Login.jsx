import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {

    const { setCurrentUser, setUserToken } = useStateContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const [error, setError] = useState([]);

    async function onLogin(e) {
        e.preventDefault();

        await axiosClient.post('/login', {
            email: email,
            password: password,
            // remember: remember,
        })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token.original.access_token);
                // console.log(data);
            })
            .catch((error) => {
                setError(error.response.data);
                // console.error(error);
            });
    }

    return (
        <>
            <h2 className="card-title mx-auto mb-3">Welcome Back!</h2>
            <form method="post" onSubmit={onLogin}>

                {error.errors && (
                    <div className="alert alert-error shadow-lg mb-3">
                        <div>
                            <i className="ri-close-circle-line ri-xl"></i>
                            <span>{error.message}</span>
                        </div>
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="example@email.com" className="input input-bordered input-secondary w-full mt-1" id='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                    {error.email && (
                        <label className="label">
                            <span className="label-text-alt text-error text-sm">{error.email[0]}</span>
                        </label>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="*****" className="input input-bordered input-secondary w-full mt-1" id='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error.password && (
                        <label className="label">
                            <span className="label-text-alt text-error text-sm">{error.password[0]}</span>
                        </label>
                    )}
                </div>

                <div className="card-actions items-center justify-between mb-3">
                    <label className="cursor-pointer label">
                        <input type="checkbox" name="remember" className="checkbox checkbox-secondary mr-2" onChange={(e) => setRemember(e.target.value)} />
                        <span className="label-text">Remember me</span>
                    </label>
                    <Link to='/register' className="link link-secondary ml-12">Haven't an account?</Link>
                </div>

                <button type="submit" className="btn btn-primary  w-full">Login</button>
            </form>
        </>
    )
}
