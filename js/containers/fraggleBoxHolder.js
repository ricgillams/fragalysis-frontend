/**
 * Created by abradley on 14/04/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Grid, Well } from 'react-bootstrap';
import NGLView from '../components/nglComponents';
import NglViewerControls from '../components/nglViewerControls';
import { Route } from 'react-router-dom';
import * as nglLoadActions from '../actions/nglLoadActions';
import ModalLoadingScreen from '../components/modalLoadingScreen';


class FraggleBox extends Component {

    constructor(props) {
        super(props)
  }

    componentDidMount(){
        var uuid = this.props.match.params.uuid;
        this.props.setUuid(uuid);
    }

  render() {
      return (
          <Row >
              <Col xs={0} md={0}>
                  <MolGroupList />
              </Col>
              <Col xs={3} md={3}>
                  <NGLView div_id="summary_view" height="200px"/>
                  <MolGroupSlider />
                  <MoleculeList style={{overflow:scroll}}/>
              </Col>
              <Col xs={5} md={5} >
                  <NGLView div_id="major_view" height="600px"/>
                  <NglViewerControls />
              </Col>
              <Col xs={4} md={4}>
                  <SummaryView />
                  <HotspotList />
              </Col>
          </Row>
          <Row >
              <Col xs={3} md={3} >
                  <NGLView div_id="summary_view" height="400px"/>
              </Col>
              <Col xs={9} md={9} >
                  <NGLView div_id="major_view" height="800px"/>
              </Col>
              <NglViewerControls/>
              <ModalLoadingScreen/>
          </Row>
      )
    }
}

function mapStateToProps(state) {
  return {
  }
}
const mapDispatchToProps = {
    setUuid: nglLoadActions.setUuid,
}


export default connect(mapStateToProps, mapDispatchToProps)(FraggleBox)