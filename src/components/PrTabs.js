import React from 'react';
import PrList from './PrList';
import { Tabs, Tab } from 'react-bootstrap';

class PrTabs extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-12">
            <Tabs defaultActiveKey="all_prs" id="uncontrolled-tab-example">
              <Tab eventKey="all_prs" title="All PR">
                <PrList PrData={this.props.pr_data} />
              </Tab>
              <Tab eventKey="peer_review" title="Peer Review">
                <div>
                  Make a Component of Peer Review and use here
                </div>
              </Tab>
              <Tab eventKey="merge_review" title="Merge Review">
                <div>
                  Make a Component of Merge Review and use here
                </div>
              </Tab>
              <Tab eventKey="final_review" title="Final Review">
                <div>
                  Make a Component of Final Review and use here
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PrTabs;