import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import PublicQuestionView from "../components/PublicQuestionView";

import { Player } from '@lottiefiles/react-lottie-player';
import loadingImage from '../assets/lottie/loading.json';
import thanksCat from '../assets/lottie/loader-cat.json';

export default function SurveyPublicView() {

    const [survey, setSurvey] = useState({
        questions: []
    });
    const answers = {};
    const [surveyFinished, setSurveyFinished] = useState(false);

    const {slug} = useParams();
    const [loading, setLoading] = useState(false);

    function getSurveyPublic() {
        setLoading(true);
        axiosClient.get(`survey/get-by-slug/${slug}`)
            .then(({data}) => {
                setSurvey(data.data);
                setLoading(false);
            });
    }

    function answerChanged(question, value) {
        answers[question.id] = value;
        // console.log(question, value);
    }

    function onSubmit(e) {
        e.preventDefault();

        // console.log(answers);

        axiosClient.post(`/survey/${survey.id}/answer`, {
            answers,
        })
            .then((response) => {
                setSurveyFinished(true);
            });
    }

    useEffect(() => {
        getSurveyPublic();
    }, []);

    return (
        <>
            {loading && 
                <div className="flex justify-center items-center">
                    <Player autoplay loop src={loadingImage} />
                </div>
            }

            {!loading &&
                <form className="w-full mb-5" onSubmit={(e) => onSubmit(e)}>
                    <div className="bg-local bg-center bg-slate-100 pb-3">
                        {survey.img_url && (
                            <img src={survey.img_url} alt="Survey Photo" />
                        )}
                        {!survey.img_url && (
                            <img src={"https://source.unsplash.com/1920x300?" + survey.slug} />
                        )}
                        <div className="mt-3 px-4 container mx-auto">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{survey.title}</h1>
                            <p className="mt-1 text-slate-500">Expire Date: {survey.expire_date}</p>
                        </div>
                    </div>
                    <div className="px-4 mt-3 container mx-auto">
                        <h3 className="font-semibold text-slate-700">Description:</h3>
                        <p className="mb-3 text-base text-slate-500">{survey.description}</p>

                        {surveyFinished && (
                            <div>
                                <Player autoplay loop src={thanksCat} className="w-[430px] h-[430px]" />
                                <h4 className="text-center font-bold">Thank you for participating in the survey</h4>
                            </div>
                        )}

                        {!surveyFinished && (
                            <>
                                <h3 className="font-semibold text-slate-700">Questions:</h3>
                                {survey.questions.map((question, index) => (
                                    <PublicQuestionView key={question.id} question={question} index={index} answerChanged={(val) => answerChanged(question, val)} />
                                ))}
                                <button type="submit" className="btn btn-success">Submit</button>
                            </>
                        )}
                    </div>
                        {/* <pre>{JSON.stringify(survey.questions, undefined, 2)}</pre> */}
                </form>
            }
        </>
    );
}
