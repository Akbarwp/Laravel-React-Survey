import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    surveys: [],
    questionTypes: [],
    toast: {
        message: null,
        show: false,
    },

    setCurrentUser: () => {},
    setUserToken: () => {},
});

const tmpSurveys = [
    {
        id: 1,
        image_url: "https://source.unsplash.com/1920x1080?keyboard+mechanical",
        title: "",
        slug: "",
        status: "",
        description: "",
        created_at: "",
        updated_at: "",
        expire_date: "",
        questions: [
            {
                id: 1,
                type: "text",
                question: "",
                description: "",
                data: [],
            },
            {
                id: 2,
                type: "checkbox",
                question: "",
                description: "",
                data: {
                    options: [
                        {
                            uuid: "",
                            text: "",
                        },
                    ],
                },
            },
            {
                id: 3,
                type: "select",
                question: "",
                description: "",
                data: {
                    options: [
                        {
                            uuid: "",
                            text: "",
                        },
                    ],
                },
            },
            {
                id: 4,
                type: "radio",
                question: "",
                description: "",
                data: {
                    options: [
                        {
                            uuid: "",
                            text: "",
                        },
                    ],
                },
            },
            {
                id: 5,
                type: "textarea",
                question: "",
                description: "",
                data: [],
            },
        ],
    },
    {
        id: 2,
        image_url:
            "https://source.unsplash.com/1920x1080?keyboard+mechanical+1",
        title: "",
        slug: "",
        status: "",
        description: "",
        created_at: "",
        updated_at: "",
        expire_date: "",
        questions: [
            {
                id: 1,
                type: "text",
                question: "",
                description: "",
                data: [],
            },
            {
                id: 2,
                type: "checkbox",
                question: "",
                description: "",
                data: {
                    options: [
                        {
                            uuid: "",
                            text: "",
                        },
                    ],
                },
            },
            {
                id: 3,
                type: "select",
                question: "",
                description: "",
                data: {
                    options: [
                        {
                            uuid: "",
                            text: "",
                        },
                    ],
                },
            },
            {
                id: 4,
                type: "radio",
                question: "",
                description: "",
                data: {
                    options: [
                        {
                            uuid: "",
                            text: "",
                        },
                    ],
                },
            },
            {
                id: 5,
                type: "textarea",
                question: "",
                description: "",
                data: [],
            },
        ],
    },
    {
        id: 3,
        image_url:
            "https://source.unsplash.com/1920x1080?keyboard+mechanical+2",
        title: "",
        slug: "",
        status: "",
        description: "",
        created_at: "",
        updated_at: "",
        expire_date: "",
        questions: [
            {
                id: 1,
                type: "text",
                question: "",
                description: "",
                data: [],
            },
            {
                id: 2,
                type: "checkbox",
                question: "",
                description: "",
                data: {
                    options: [
                        {
                            uuid: "",
                            text: "",
                        },
                    ],
                },
            },
            {
                id: 3,
                type: "select",
                question: "",
                description: "",
                data: {
                    options: [
                        {
                            uuid: "",
                            text: "",
                        },
                    ],
                },
            },
            {
                id: 4,
                type: "radio",
                question: "",
                description: "",
                data: {
                    options: [
                        {
                            uuid: "",
                            text: "",
                        },
                    ],
                },
            },
            {
                id: 5,
                type: "textarea",
                question: "",
                description: "",
                data: [],
            },
        ],
    },
];

export function ContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem("TOKEN") || "");
    const [surveys, setSurveys] = useState(tmpSurveys);
    const [questionTypes] = useState([
        "text",
        "select",
        "radio",
        "checkbox",
        "textarea",
    ]);
    const [toast, setToast] = useState({message: '', show: false});

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem("TOKEN", token);
        } else {
            localStorage.removeItem("TOKEN");
        }

        _setUserToken(token);
    };

    const showToast = (message) => {
        setToast({message, show: true});
        setTimeout(() => {
            setToast({message: '', show: false});
        }, 5000);
    }

    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken,
                surveys,
                questionTypes,
                toast,
                showToast,
            }}
        >
            {children}
        </StateContext.Provider>
    );
}

export function useStateContext() {
    return useContext(StateContext);
}
