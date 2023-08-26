import React from 'react';
import {TabView,TabPanel} from 'primereact/tabview';

const CustomizedTabs = ({tabsMenu}) => {
    return (
        <TabView renderActiveOnly={false}>
                    {tabsMenu.map(element => {
                        return (
                            <TabPanel header= {element.title}>
                                {element.content}
                            </TabPanel>
                        )
                    })}  
                    </TabView>
    );
}

export default CustomizedTabs;
