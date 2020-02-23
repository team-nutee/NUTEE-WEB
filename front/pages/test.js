import React from 'react';

const Test = () => {
    return(
        <>
            <div className="hell">
                what the hell
            </div>
            <style jsx>
                {`
                    .hell {
                        font-weight: bold;
                        color: #0063ce;
                    }
                `}
            </style>
        </>
    );
};
export default Test;