import React from 'react'
import TabsContainer from "./shared/TabsContainer"
import CustomizedTabs from "./shared/CustomizedTabs"

const AssetManagement = () => {

    const accessTabs = [
        {
            title : 'Document recents',
            content : <div>hello 1</div>
        },
        {
            title : 'Derniers recherche',
            content :  <div>hello 2</div>
        },
        
    ]
    const favTabs = [
        {
            title : 'Tout',
            content :  <div>hello 1</div>
        },
        {
            title : 'Documents',
            content :  <div>hello 2</div>
        },
        {
            title : 'Dossier',
            content :  <div>hello 3</div>
        },
        
    ]
    const notificationTabs = [
        {
            title : 'Tout',
            content : <div>hello 1</div>
        },
        {
            title : 'Documents',
            content :  <div>hello 2</div>
        },
        {
            title : 'Dossier',
            content :  <div>hello 3</div>
        },
        {
            title : 'Commentaires',
            content : <div>hello 4</div>
        },
        {
            title : 'Rappels',
            content :  <div>hello 5</div>
        },
        {
            title : 'Workflow',
            content :  <div>hello 6</div>
        }
    ]
  return (
    <div className="dashboard__content">

    <div className="dashboard__content__tabs-container">
        <div className='dashboard__content__tabs-container__top-content'>
            <div className ="dashboard__content__tabs-container__top-content__block">
            <TabsContainer 
       header = {<div>Top Performing</div>}
       >
             <CustomizedTabs tabsMenu={accessTabs} />
         </TabsContainer>
            </div>
            <div className ="dashboard__content__tabs-container__top-content__block">
            <TabsContainer 
       header = {<div>Latest Picks</div>}
       >
             <CustomizedTabs tabsMenu={favTabs} />
         </TabsContainer>
            </div>
        </div>
        <div className='dashboard__content__tabs-container__bottom-content'>
        <TabsContainer 
       header = {<div>Notifcations</div>}
       >
              <CustomizedTabs tabsMenu={notificationTabs} />
         </TabsContainer>
        </div>
    </div>

</div>
  )
}

export default AssetManagement