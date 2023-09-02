import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import React, { useState } from 'react'

const MutualFunds = () => {
  const [visible, setVisible] = useState(false);

  return (<div>
    <Button icon="pi pi-th-large" onClick={() => setVisible(true)} />

    {visible === true && <div className="card flex justify-content-center">
      <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
        <div style={{ width: '100%', height: '100%' }} >
          <iframe
            className="custombar1"
            title="Option chain"
            src="https://mrhx9x-3000.csb.app/" // Replace with the URL of the website you want to embed
            width="100%"
            height="100%"
          />
        </div>
      </Sidebar>
    </div>}

    <div style={{ width: '100%', height: '100vh' }} >
      <iframe
        className="custombar1"
        title="Option chain"
        src="https://mrhx9x-3000.csb.app/" // Replace with the URL of the website you want to embed
        width="100%"
        height="500px"
        border='none'
        overflow='auto'
      />
    </div>
  </div>)
}

export default MutualFunds