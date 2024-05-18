import React from 'react';
import {useParams} from "react-router-dom";

const UpdateUser: React.FC = () => {
    const { userId } = useParams();
    alert("Hello")
    return (
        <div>
            {userId}
        </div>
    );
};

export default UpdateUser;