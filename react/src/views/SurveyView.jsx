import { useEffect, useState } from 'react';
import axiosClient from '../axios';
import PageComponent from '../components/PageComponent';
import { Link, useNavigate, useParams } from "react-router-dom";
import SurveyQuestions from '../components/SurveyQuestions';
import { useStateContext } from '../contexts/ContextProvider';

import { Player } from '@lottiefiles/react-lottie-player';
import publicIcon from '../assets/lottie/network-icon.json';
import deleteButton from '../assets/lottie/button-delete.json';
import loadingImage from '../assets/lottie/loading.json';

export default function SurveyView() {

    const [survey, setSurvey] = useState({
        "title": "",
        "slug": "",
        "status": false,
        "description": "",
        "image": null,
        "image_url": null,
        "expire_date": "",
        "questions": [],
    });

    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const {showToast} = useStateContext();

    function onImageChoose(e) {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setSurvey({
                ...survey,
                image: file,
                image_url: reader.result,
            });
            e.target.value = "";
        }
        reader.readAsDataURL(file);
    }

    function onSubmit(e) {
        e.preventDefault();

        const payload = { ...survey };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;

        let res = null;
        if (id) {
            res = axiosClient.put(`survey/${id}`, payload);
        } else {
            res = axiosClient.post('/survey', payload);
        }
        
        res
            .then((response) => {
                // console.log(response);
                navigate('/surveys');
                if (id) {
                    showToast('The survey was updated');
                } else {
                    showToast('The survey was created');
                }
            })
            .catch((error) => {
                setError(error.response.data.errors);
            });
    }

    function onQuestionsUpdate(questions) {
        setSurvey({
            ...survey,
            questions,
        });
    }

    function onDelete(id) {
        if (window.confirm('Are you sure?')) {
            axiosClient.delete(`/survey/${id}`)
                .then(() => {
                    showToast('The survey was deleted');
                    navigate('/surveys');
                });
        }
    }

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/survey/${id}`)
                .then(({data}) => {
                    setSurvey(data.data);
                    setLoading(false);
                });
        }
    }, []);

    return (
        <>
            <PageComponent 
            title={!id ? "Create new survey" : "Update survey"}
            buttons={id && (
                <div className='flex items-center gap-2'>
                    <Link to={`/surveys/public/${survey.slug}`} target="_blank" className="btn btn-info text-success-content font-medium text-xs px-2 sm:text-sm sm:px-4">
                        <Player loop hover src={publicIcon} className="w-5 h-5 sm:w-7 sm:h-7" />
                        <h5 className="ml-1">Public Link</h5>
                    </Link>
                    <button type="button" className="btn btn-error text-xs px-2 sm:text-sm sm:px-4" onClick={(e) => onDelete(id)}>
                        <Player loop hover src={deleteButton} className="w-10 h-10 sm:w-12 sm:h-12" />
                        <h5 className="ml-1">Delete</h5>
                    </button>
                </div>
            )}>
                
                {loading && 
                    <div className="flex justify-center">
                        <Player autoplay loop src={loadingImage} />
                    </div>
                }
                
                {!loading &&
                    <form method="post" onSubmit={onSubmit} className="w-full xl:w-3/4 2xl:w-2/3 mx-auto">
                        <div className="shadow sm:overflow-hidden sm: rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                {/* Awal Gambar */}
                                <div>
                                    <label htmlFor="" className="block text-sm font-medium text-gray-700">Photo</label>
                                    <div className="mt-1 flex items-center">
                                        {survey.image_url && (
                                            <img src={survey.image_url} alt="" className="w-40 h-40 object-cover rounded-md shadow-md" />
                                        )}
                                        {!survey.image_url && (
                                            <span className="flex justify-center items-center text-gray-400 w-20 h-20 overflow-hidden rounded-full bg-gray-100 shadow-md">
                                                <i className="ri-image-2-line ri-xl"></i>
                                            </span>
                                        )}

                                        <input type="file" className="file-input file-input-bordered file-input-primary ml-3" onChange={(e) => onImageChoose(e)} />
                                    </div>
                                </div>
                                {/* Akhir Gambar */}

                                {/* Awal Title */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Survey Title</label>
                                    <input type="text" name="title" id="title" value={survey.title} onChange={(e) => setSurvey({ ...survey, title: e.target.value })} placeholder="Survey title" className="input input-primary mt-1 w-full" required />
                                </div>
                                {/* Akhir Title */}

                                {/* Awal Description */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Describe your survey</label>
                                    <textarea name="description" id="description" value={survey.description || ''} onChange={(e) => setSurvey({ ...survey, description: e.target.value })} placeholder="Survey title" className="textarea textarea-primary mt-1 w-full"></textarea>
                                </div>
                                {/* Akhir Description */}

                                {/* Awal Expire Date */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="expire_date" className="block text-sm font-medium text-gray-700">Expire Date</label>
                                    <input type="date" name="expire_date" id="expire_date" value={survey.expire_date} onChange={(e) => setSurvey({ ...survey, expire_date: e.target.value })} placeholder="Survey title" className="input input-primary mt-1 w-full" />
                                </div>
                                {/* Akhir Expire Date */}

                                {/* Awal Status */}
                                <div className="flex items-center">
                                    <div className="flex h-5 items-center">
                                        <input type="checkbox" name="status" id="status" checked={survey.status} onChange={(e) => setSurvey({ ...survey, status: e.target.checked })} className="checkbox checkbox-primary mt-1" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="status" className="font-medium text-gray-700">Active</label>
                                        <p className="text-gray-500">Wheter to make publicly available</p>
                                    </div>
                                </div>
                                {/* Akhir Status */}

                                <SurveyQuestions questions={survey.questions} onQuestionsUpdate={onQuestionsUpdate} />

                                <div className="bg-gray-50 px-4 py-3 text-left sm:px-6">
                                    <button className="btn btn-success">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                }
            </PageComponent>
        </>
    )
}
