import { useEffect, useState } from "react";
import axiosClient from "../axios";
import DashboardCard from "../components/DashboardCard";
import PageComponent from "../components/PageComponent";
import { Link } from "react-router-dom";

import { Player } from '@lottiefiles/react-lottie-player';
import empty from '../assets/lottie/shake-a-empty-box.json';
import loadingImage from '../assets/lottie/loading.json';

export default function Dashboard() {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/dashboard`)
            .then((response) => {
                setLoading(false);
                setData(response.data);
                return response;
            })
            .catch((error) => {
                setLoading(false);
                return error;
            });
    }, []);


    return (
        <>
            <PageComponent title="Dashboard">
                {loading && 
                    <div className="flex justify-center items-center">
                        <Player autoplay loop src={loadingImage} />
                    </div>
                }

                
                {!loading && 
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-slate-700">
                        {/* Total Survey */}
                        <DashboardCard title="Total Surveys" className="order-1 lg:order-2">
                            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                                {data.totalSurveys}
                            </div>
                        </DashboardCard>

                        {/* Total Answer */}
                        <DashboardCard title="Total Answers" className="order-2 lg:order-4">
                            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                                {data.totalAnswers}
                            </div>
                        </DashboardCard>

                        {/* Latest Survey */}
                        <DashboardCard title="Latest Survey" className="order-3 lg:order-1 row-span-2">
                            {data.latestSurveys && (
                                <div>
                                    {data.latestSurveys.image_url && (
                                        <img src={data.latestSurveys.image_url} className="w-full mx-auto rounded shadow-md mb-3" />
                                    )}
                                    {!data.latestSurveys.image_url && (
                                        <img src={"https://source.unsplash.com/1920x1080?" + data.latestSurveys.slug} className="w-full max-w-lg mx-auto rounded shadow-md mb-3" />
                                    )}

                                    <h3 className="font-bold text-xl mb-3">{data.latestSurveys.title}</h3>
                                    <div className="flex justify-between text-sm mb-3">
                                        <div>Create Date:</div>
                                        <div>{data.latestSurveys.created_at}</div>
                                    </div>
                                    <div className="flex justify-between text-sm mb-3">
                                        <div>Expire Date:</div>
                                        <div>{data.latestSurveys.expire_date}</div>
                                    </div>
                                    <div className="flex justify-between text-sm mb-3">
                                        <div>Status:</div>
                                        <div>{data.latestSurveys.status}</div>
                                    </div>
                                    <div className="flex justify-between text-sm mb-3">
                                        <div>Questions:</div>
                                        <div>{data.latestSurveys.questions}</div>
                                    </div>
                                    <div className="flex justify-between text-sm mb-5">
                                        <div>Answers:</div>
                                        <div>{data.latestSurveys.answers}</div>
                                    </div>

                                    <div className="flex justify-center gap-2">
                                        <Link to={`/surveys/${data.latestSurveys.id}`} className="btn btn-warning">
                                            <i className="ri-pencil-line text-lg mr-1"></i>
                                            E<p className='lowercase'>dit</p>
                                        </Link>

                                        <Link to={`/surveys/public/${data.latestSurveys.slug}`} target="_blank" className="btn btn-primary">
                                            <i className="ri-external-link-line ri-xl mr-1"></i>
                                            V<p className='lowercase'>iew <span className="uppercase">S</span>urvey</p>
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {!data.latestSurveys && (
                                <div>
                                    <div className="w-80 h-80 mx-auto">
                                        <Player autoplay loop src={empty} />
                                    </div>
                                    <div className="text-base mt-5 text-center text-slate-700 font-bold">
                                        You don't have surveys yet
                                    </div>
                                </div>
                            )}
                        </DashboardCard>

                        {/* Latest Answers */}
                        <DashboardCard title="Latest Answers" className="order-4 lg:order-3 row-span-2">
                            {data.latestAnswers.length && (
                                <div className="text-left">
                                    {data.latestAnswers.map((answer) => (
                                        <a key={answer.id} className="block p-2 hover:bg-slate-100/90 rounded">
                                            <div className="text-lg font-semibold">{answer.survey.title}</div>
                                            <p className="text-sm">
                                                Answer Made at:
                                                <i className="font-semibold"> {answer.end_date}</i>
                                            </p>
                                        </a>
                                    ))}
                                </div>
                            )}
                            {!data.latestAnswers.length && (
                                <div>
                                    <div className="w-80 h-80 mx-auto">
                                        <Player autoplay loop src={empty} />
                                    </div>
                                    <div className="mt-5 text-center text-slate-700 font-bold">
                                        You don't have answers yet
                                    </div>
                                </div>
                            )}
                        </DashboardCard>
                    </div>
                }
            </PageComponent>
        </>
    )
}
