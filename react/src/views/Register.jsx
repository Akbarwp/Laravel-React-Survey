import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Register() {

    const {setCurrentUser, setUserToken} = useStateContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [error, setError] = useState([]);

    async function onSubmit(e) {
        e.preventDefault();

        await axiosClient.post('/register', {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
        })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token.original.access_token);
                // console.log(data);
            })
            .catch((error) => {
                setError(error.response.data.errors);
                // console.error(error);
            });;
    }

    return (
        <>
            <h2 className="card-title mx-auto mb-3">Registration</h2>
            <form method="post" onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="John Doe" className="input input-bordered input-accent w-full mt-1" id='name' required value={name} onChange={(e) => setName(e.target.value)} />
                    {error.name && (
                        <label className="label">
                            <span className="label-text-alt text-error text-sm">{error.name[0]}</span>
                        </label>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="email@example.com" className="input input-bordered input-accent w-full mt-1" id='email' value={email} required onChange={(e) => setEmail(e.target.value)} />
                    {error.email && (
                        <label className="label">
                            <span className="label-text-alt text-error text-sm">{error.email[0]}</span>
                        </label>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="*****" className="input input-bordered input-accent w-full mt-1" id='password' value={password} required onChange={(e) => setPassword(e.target.value)} />
                    {error.password && (
                        <label className="label">
                            <span className="label-text-alt text-error text-sm">{error.password[0]}</span>
                        </label>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="password-confirmation">Password Confirmation</label>
                    <input type="password" name="password_confirmation" placeholder="*****" className="input input-bordered input-accent w-full mt-1" id='password-confirmation' required value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                </div>

                <div className="card-actions items-center justify-end mb-3">
                    <Link to='/login' className="link link-accent ml-12">Already have an account?</Link>
                </div>

                <button type="submit" className="btn btn-secondary w-full">Submit</button>
            </form>
        </>
    )
}
