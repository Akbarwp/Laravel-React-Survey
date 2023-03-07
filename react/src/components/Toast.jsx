import { useStateContext } from "../contexts/ContextProvider"

export default function Toast() {
    const {toast} = useStateContext();


    return (
    <>
        {toast.show && 
            <div className="w-96 py-2 px-3 toast toast-end animate-fade-in-down">
                <div className="alert alert-success">
                    {toast.message}
                </div>
            </div>
        }
    </>)
}
