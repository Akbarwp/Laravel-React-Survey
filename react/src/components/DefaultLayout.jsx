import { useEffect } from "react";
import { Outlet, NavLink, Link, Navigate } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import Toast from "./Toast";

const navigation = [
    { name: 'Dashboard', to: '/' },
    { name: 'Surveys', to: '/surveys' },
];

export default function DefaultLayout() {

    const { currentUser, setCurrentUser } = useStateContext();
    const { userToken, setUserToken } = useStateContext();

    if (!userToken) {
        return <Navigate to='/login' />
    }

    async function logout(e) {
        e.preventDefault();
        // console.log('Logout');
        await axiosClient.post('/logout')
            .then(response => {
                setCurrentUser({});
                setUserToken(null);
            });
    }

    async function userInfo() {
        await axiosClient.post('/me')
        .then((response) => {
            setCurrentUser(response.data);
        })
    }
    useEffect(() => {
        userInfo();
    }, []);

    return (
        <>
            <div className="navbar bg-accent text-accent-content">
                {/* Awal Responsive */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <i className="ri-menu-4-fill ri-xl"></i>
                        </label>
                        {/* Awal Nav Item */}
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-accent text-accent-content rounded-box w-52 font-semibold">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <NavLink to={item.to} className="justify-between">{item.name}</NavLink>
                                </li>
                            ))}
                        </ul>
                        {/* Akhir Nav Item */}
                    </div>
                    <Link to="/" className="btn btn-ghost normal-case text-xl font-kurenaido">LaRea Survey</Link>
                </div>
                {/* Akhir Responsive */}

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <NavLink to={item.to}>{item.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="navbar-end">

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full border-2">
                                {currentUser.imageUrl && (
                                    <img src={currentUser.imageUrl} />
                                )}
                                {!currentUser.imageUrl && (
                                    <img src="https://source.unsplash.com/1000x1000?user" />
                                )}
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-accent text-accent-content rounded-box w-52 font-semibold">
                            <div className="px-3 py-2 leading-tight rounded-lg hover:bg-black hover:bg-opacity-10 transition-colors">
                                <div className="font-bold">{currentUser.name}</div>
                                <div className="text-slate-500 text-sm">{currentUser.email}</div>
                            </div>

                            <div className="my-2 border border-bottom border-white rounded-full"></div>

                            <li key="logout">
                                <button className="" onClick={(e) => logout(e)}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Outlet />
            <Toast />
        </>
    )
}
