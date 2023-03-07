export default function PublicQuestionView({question, index, answerChanged}) {

    let selectedOptions = [];

    function onCheckboxChange(option, e) {
        if (e.target.checked) {
            selectedOptions.push(option.text);

        } else {
            selectedOptions = selectedOptions.filter((op) => op != option.text);
        }
        answerChanged(selectedOptions);
    }

    return (
        <>
            <fieldset className="mb-4">
                <div>
                    <legend className="text-base font-medium text-slate-700">
                        {index + 1}. {question.question}
                    </legend>
                    <p className="text-slate-500">
                        {question.description}
                    </p>
                </div>

                <div className="mt-3">
                    {question.type === "text" && (
                        <div>
                            <input type="text" className="input input-primary mt-1 w-full" onChange={(e) => answerChanged(e.target.value)} />
                        </div>
                    )}
                    {question.type === "select" && (
                        <select className="select select-primary w-full mt-1 py-2 px-3" onChange={(e) => answerChanged(e.target.value)}>
                            <option>Please Select</option>
                            {question.data.options.map((option, index) => (
                                <option value={option.text} key={option.uuid}>{option.text}</option>
                            ))}
                        </select>
                    )}
                    {question.type === "radio" && (
                        <div>
                            {question.data.options.map((option, index) => (
                                <div key={option.uuid} className="flex items-center mb-1">
                                    <input type="radio" name={"question" + question.id} id={option.uuid} className="radio radio-primary" value={option.text} onChange={(e) => answerChanged(e.target.value)} />
                                    <label htmlFor={option.uuid} className="ml-3 block text-sm font-medium text-slate-700">{option.text}</label>
                                </div>
                            ))}
                        </div>
                    )}
                    {question.type === "checkbox" && (
                        <div>
                            {question.data.options.map((option, index) => (
                                <div key={option.uuid} className="flex items-center mb-1">
                                    <input type="checkbox" name={"question" + question.id} id={option.uuid} className="checkbox checkbox-primary" value={option.text} onChange={(e) => onCheckboxChange(option, e)} />
                                    <label htmlFor={option.uuid} className="ml-3 block text-sm font-medium text-slate-700">{option.text}</label>
                                </div>
                            ))}
                        </div>
                    )}
                    {question.type === "textarea" && (
                        <div>
                            <textarea className="textarea textarea-primary mt-1 w-full" rows="5" onChange={(e) => answerChanged(e.target.value)}></textarea>
                        </div>
                    )}
                </div>
            </fieldset>
            <hr className="mb-4" />
        </>
    );
}
