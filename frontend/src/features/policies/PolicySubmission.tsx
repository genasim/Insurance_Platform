import React, {ChangeEvent, FormEvent, MouseEventHandler, useState} from 'react';

interface PolicySubmissionState {
    description: string
}

const PolicySubmission: React.FC = () => {
    const [state, setState] = useState<PolicySubmissionState>({
        description: "hello"
    })

    const handleSubmit = (event: FormEvent) => {
        // event.preventDefault();
        alert("Submit")
    }

    const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
        // event.preventDefault();
        // event.stopPropagation();
        alert("Click")
    }

    function handleFormClick() {
        alert("Form click")
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
        return;
    };

    return (
        <div className="container-md">
            <form  onClick={handleFormClick}>
                <label htmlFor="description" className="form-label">Description: </label>
                <input type="text" className="form-control" id="description"
                       name="description"
                       value={state.description}
                       onChange={handleOnChange}
                       placeholder="Description"/>
                <button type="submit" className="btn btn-primary">Create coefficient</button>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Click</button>
            </form>
        </div>
    );
};

export default PolicySubmission;