import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {

    const { userToken } = useStateContext();

    if (userToken) {
        return <Navigate to='/' />
    }

    return (
        <>
            <div className="container mx-auto px-4">
                <div className="flex justify-center mt-52">
                    <div className="card w-full md:w-3/4 lg:w-1/2 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
