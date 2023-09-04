import React,{ useEffect, useState }  from 'react'
import TabsContainer from "./shared/TabsContainer"
import CustomizedTabs from "./shared/CustomizedTabs"

const AssetManagement = () => {

    const [mFamilies, setMFamilies] = useState([]);

    const url = 'https://latest-mutual-fund-nav.p.rapidapi.com/fetchAllMutualFundFamilies';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ae45a5fae5msh317b7baf0c980a0p1b4c3ajsn37ee746f0c3f',
            'X-RapidAPI-Host': 'latest-mutual-fund-nav.p.rapidapi.com'
        }
    };

    const MutualFundFamilies = async () => {
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            setMFamilies(JSON.parse(result));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        MutualFundFamilies();
    }, []);

    const accessTabs = [
        {
            title: 'Mutual Funds Families',
            content: mFamilies ? <div>{mFamilies.map((mf, index) => (
                    <div>{mf}</div>
            ))}
            </div> : <div>No Data Available</div>
        },
        {
            title: 'Mutual Funds Historic Data',
            content: <div>No Data Available</div>
        },

    ]
    const favTabs = [
        {
            title: 'Analyse Documents',
            content: <div>No Data to Display</div>
        },
        {
            title: 'Your Documents',
            content: <div>No Data to Display</div>
        },
        {
            title: 'Future updates',
            content: <div>No Data to Display</div>
        },

    ]
    const notificationTabs = [
        {
            title: 'Top Stocks',
            content: <div>No Data to Display</div>
        },
        {
            title: 'Popular Stocks',
            content: <div>No Data to Display</div>
        },
        {
            title: 'Latest Stocks',
            content: <div>No Data to Display</div>
        },
        {
            title: 'Our Picks',
            content: <div>No Data to Display</div>
        },
        {
            title: 'Last 1 Year',
            content: <div>No Data to Display</div>
        },
        {
            title: 'Last 5 Years',
            content: <div>No Data to Display</div>
        }
    ]
    return (
        <div className="dashboard__content">

            <div className="dashboard__content__tabs-container">
                <div className='dashboard__content__tabs-container__top-content'>
                    <div className="dashboard__content__tabs-container__top-content__block">
                        <TabsContainer
                            header={<div style={{fontWeight:'bold', fontSize: '25px'}}>Top Performing</div>}
                        >
                            <CustomizedTabs tabsMenu={accessTabs} />
                        </TabsContainer>
                    </div>
                    <div className="dashboard__content__tabs-container__top-content__block">
                        <TabsContainer
                            header={<div style={{fontWeight:'bold',  fontSize: '25px'}}>Latest Picks</div>}
                        >
                            <CustomizedTabs tabsMenu={favTabs} />
                        </TabsContainer>
                    </div>
                </div>
                <div className='dashboard__content__tabs-container__bottom-content'>
                    <TabsContainer
                        header={<div style={{fontWeight:'bold',  fontSize: '25px'}}>Notifcations</div>}
                    >
                        <CustomizedTabs tabsMenu={notificationTabs} />
                    </TabsContainer>
                </div>
            </div>

        </div>
    )
}

export default AssetManagement