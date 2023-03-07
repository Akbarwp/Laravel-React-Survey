import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { v4 as uuidv4 } from "uuid";

export default function QuestionEditor({index = 0, question, addQuestion, deleteQuestion, questionChange}) {
    
    const [model, setModel] = useState({...question});
    const {questionTypes} = useStateContext();

    function upperCaseFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function shouldHaveOptions(type = null) {
        type = type || model.type;
        return ['select', 'radio', 'checkbox'].includes(type);
    }

    function onTypeChange(e) {
        const newModel = {
            ...model,
            type: e.target.value
        };
        if (!shouldHaveOptions(model.type) && shouldHaveOptions(e.target.value)) {
            if (!model.data.options) {
                newModel.data = {
                    options: [
                        {uuid: uuidv4(), text: ''}
                    ]
                };
            }
        }
        setModel(newModel);
    }

    function addOption() {
        model.data.options.push({
            uuid: uuidv4(),
            text: '',
        });
        setModel({...model});
    }

    function deleteOption(op) {
        model.data.options = model.data.options.filter(option => option.uuid != op.uuid);
        setModel({...model});
    }

    useEffect(() => {
        questionChange(model);
    }, [model]);

    return (
        <>
            <div className="flex justify-between mb-3">
                <h4>{index+1}. {model.question}</h4>
                <div className="flex items-center">
                    <button type="button" className="btn btn-secondary flex items-center text-xs py-1 px-3 mr-2 rounded-md" onClick={() => addQuestion(index+1)}>
                        <i className="ri-add-fill ri-xl mr-1"></i>
                        add
                    </button>

                    <button type="button" className="btn btn-error flex items-center text-xs text-white py-1 px-3 mr-2 rounded-md" onClick={() => deleteQuestion(question)}>
                        <i className="ri-delete-bin-5-line ri-xl mr-1"></i>
                        delete
                    </button>
                </div>
            </div>

            <div className="flex gap-3 justify-between mb-3">
                {/* Question Text */}
                <div className="flex-1">
                    <label htmlFor="question" className="mb-2 block text-sm font-medium text-slate-700">Question</label>
                    <input type="text" name="question" id="question" className="input input-primary w-full" value={model.question} onChange={(e) => setModel({...model, question: e.target.value})} />
                </div>
                {/* Question Text */}

                {/* Question Type */}
                <div className="">
                    <label htmlFor="questionType" className="mb-1 block text-sm font-medium text-slate-700 w-40">Question Type</label>
                    <select name="questionType" id="questionType" className="select select-primary w-full mt-1" value={model.type} onChange={onTypeChange}>

                        {questionTypes.map((type) => (
                            <option value={type} key={type}> 
                                {upperCaseFirst(type)}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Question Type */}
            </div>

            {/* Description */}
            <div>
                <label htmlFor="questionDescription" className="block text-sm font-medium text-slate-700">
                    Description
                </label>
                <textarea name="questionDescription" id="questionDescription" rows="5" onChange={(e) => setModel({...model, description: e.target.value})} className="mt-1 textarea textarea-primary w-full"></textarea>
            </div>
            {/* Description */}

            {/* Type */}
            <div>
                {shouldHaveOptions() && (
                    <div>
                        <h4 className="text-sm font-bold mb-3 flex justify-between items-center">
                            Options
                            <button type="button" className="btn btn-info btn-sm text-xs" onClick={addOption}>Add</button>
                        </h4>

                        
                        {model.data.options.length === 0 && (
                            <div className="py-3 text-sm text-slate-700 text-center">You don't have any options defined</div>
                        )}

                        {model.data.options.length > 0 &&
                            <div>
                                {model.data.options.map((op, index) => (
                                    <div className="flex items-center mb-2" key={op.uuid}>
                                        <span className="w-6 text-sm">{index + 1}.</span>
                                        <input type="text" className="input input-accent input-sm w-full py-1 px-2 text-sm" value={op.text} onInput={(e) => {op.text = e.target.value; setModel({...model});}} />
                                        <button type="button" className="btn btn-ghost btn-sm" onClick={(e) => deleteOption(op)}>
                                            <i className="ri-delete-bin-line ri-lg mr-1 text-error"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                )}
                {model.type === 'select' && <div></div>}
            </div>
            {/* Type */}
            <hr />
        </>
    );
}
