import { Link } from 'react-router-dom'

export default function SurveyListItem({survey, onDeleteClick}) {
    return (
            <div className="flex flex-col mx-4 py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
                {survey.image_url && (
                    <img src={survey.image_url} alt={survey.title} className="w-full h-3/4 object-cover rounded-md" />
                )}
                {!survey.image_url && (
                    <img src={"https://source.unsplash.com/1920x1080?" + survey.slug} alt={survey.title} className="w-full h-3/4 object-cover rounded-md" />
                )}
                <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
                <div dangerouslySetInnerHTML={{ __html: survey.description }} className="overflow-hidden flex-1"></div>

                <div className="flex justify-between items-center mt-3">
                    <Link to={`/surveys/${survey.id}`} className="btn btn-warning">
                        <i className="ri-pencil-line text-lg mr-1"></i>
                        E<p className='lowercase'>dit</p>
                    </Link>

                    <div className="flex items-center">
                        <Link to={`/surveys/public/${survey.slug}`} target="_blank" className="p-2 text-primary rounded-md hover:bg-black hover:bg-opacity-10">
                            <i className="ri-external-link-line ri-xl mr-1"></i>
                        </Link>
                    
                        {survey.id && (
                            <button onClick={() => onDeleteClick()} className="p-2 text-error rounded-md hover:bg-black hover:bg-opacity-10">
                                <i className="ri-delete-bin-line ri-xl mr-1"></i>
                            </button>
                        )}
                    </div>
                </div>
            </div>
    )
}
