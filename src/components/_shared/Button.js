import React from 'react';

const Button = ({ type, name }) => {
    return (
        <button
            type={type}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded text-white"
        >
            {name}
        </button>
    );
};

export default Button;
