import React, {ChangeEvent, useState} from 'react';

interface CreateUserState {
}

const CreateUser: React.FC = () => {
    const [createUserState, setCreateUserState] = useState<CreateUserState>({});

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tab: string = event.target.name.split('-')[0];
        const key = event.target.name.split('-').filter((x, i) => i !== 0).join('-');

        switch (tab) {
            case 'create-user': {
                setCreateUserState(prevState => ({
                    ...prevState,
                    [key]: event.target.value,
                }));
            }
        }
    }


    return (
        <div>
            <h2 className="h2 mb-4">Delete document</h2>
            <form className="row">
                <div className="col-md-5 justify-content-center">
                    <label htmlFor="register-email" className="form-label">Email: </label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                        <input type="email" className="form-control" id="register-email"
                               name="registerEmail"
                            // onChange={handleOnChange}
                               placeholder="e.g. mario@example.com"/>
                    </div>
                </div>
                <div className="col-md-5 justify-content-center">
                    <label htmlFor="register-email" className="form-label">Email: </label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                        <input type="email" className="form-control" id="register-email"
                               name="registerEmail"
                            // onChange={handleOnChange}
                               placeholder="e.g. mario@example.com"/>
                    </div>
                </div>
                <div className="col-md-5 justify-content-center">
                    Password
                </div>
                <div className="col-md-5 justify-content-center">
                    Confirm Password
                </div>
                <div className="col-md-5 justify-content-center">
                    Name
                </div>
            </form>
        </div>
    );
};

export default CreateUser;