import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import PageComponent from "../components/PageComponent";
import PaginationLinks from "../components/PaginationLinks";
import SurveyListItem from "../components/SurveyListItem";
import { useStateContext } from "../contexts/ContextProvider";

import { Player } from '@lottiefiles/react-lottie-player';
import empty from '../assets/lottie/shake-a-empty-box.json';
import loadingImage from '../assets/lottie/loading.json';
import add from '../assets/lottie/add-new.json';

export default function Surveys() {

    // const {surveys} = useStateContext();
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState({});
    const {showToast} = useStateContext();

    function onDelete(id) {
        if (window.confirm('Are you sure?')) {
            axiosClient.delete(`/survey/${id}`)
                .then(() => {
                    getSurveys();
                    showToast('The survey was deleted');
                });
        }
    }

    function onPageClick(link) {
        getSurveys(link.url);
    }

    function getSurveys(url) {
        url = url || '/survey';

        setLoading(true);
        axiosClient.get(url)
            .then(({data}) => {
                setSurveys(data.data);
                setMeta(data.meta);
                setLoading(false);
            });
    }

    useEffect(() => {
        getSurveys();
    }, []);

    return (
        <>
            <PageComponent title="Surveys"
            buttons={(
                <Link to="/surveys/create" className="btn btn-success text-success-content font-medium">
                    <Player loop hover src={add} className="w-10 h-10" />
                    Create new
                </Link>
            )}>
                
                {loading && 
                    <div className="flex justify-center">
                        <Player autoplay loop src={loadingImage} />
                    </div>
                }

                {!loading &&
                    <div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            {surveys.length === 0 && 
                                <div className="col-span-12">
                                    <div className="w-96 h-96 mx-auto">
                                        <Player autoplay loop src={empty} />
                                    </div>
                                    <div className="mt-5 text-center text-slate-700 font-bold">
                                        You don't have surveys created
                                    </div>
                                </div>
                            }
                            {surveys.map(survey => (
                                <SurveyListItem survey={survey} key={survey.id} onDeleteClick={() => onDelete(survey.id)} />
                            ))}
                        </div>
                        {surveys.length > 0 && 
                            <PaginationLinks meta={meta} onPageClick={onPageClick} />
                        }
                    </div>
                }

            </PageComponent>
        </>
    )
}
