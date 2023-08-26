import React from 'react';
// import './tabContainer.scss'
const TabsContainer = ({children , header}) => {
    return (
        <div className ='tabs-container'>
            <div className ="tabs-container__header">{header}</div>
            {children}
        </div>
    );
}

export default TabsContainer;
