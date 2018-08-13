/**
 * Created by ricgillams on 10/08/2018.
 */
import React from 'react';
import { connect } from 'react-redux'
import * as nglLoadActions from '../actions/nglLoadActions'
import * as apiActions from '../actions/apiActions'
import * as selectionActions from '../actions/selectionActions'
import { Button } from 'react-bootstrap'
import { getStore } from "../containers/globalStore";


export class SaveCheckpointButton extends React.Component {
    constructor(props) {
        super(props);
        this.postToServer = this.postToServer.bind(this);
    }

    postToServer() {
        for(var key in this.props.nglOrientations){
            this.props.setOrientation(key,"REFRESH")
        }
    }

    componentDidUpdate() {
        var hasBeenRefreshed = true
        if (this.props.uuid != "UNSET") {
            fetch("/api/viewscene/?uuid=" + this.props.uuid)
                .then(function (response) {
                    return response.json();
                }).then(json => this.handleJson(json.results[0]))
        }
        for (var key in this.props.nglOrientations) {
            if (this.props.nglOrientations[key] == "REFRESH") {
                hasBeenRefreshed = false;
            }
            if (this.props.nglOrientations[key] == "STARTED") {
                hasBeenRefreshed = false;
            }
        }
        if (hasBeenRefreshed == true) {
            var store = JSON.stringify(getStore().getState())
            var fullState = {"state": store}
            const uuidv4 = require('uuid/v4');
            var TITLE = 'need to define title';
            var formattedState = {
                uuid: uuidv4(),
                title: TITLE,
                scene: JSON.stringify(JSON.stringify(fullState))
            };
            fetch("/api/viewscene/", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedState)
            }).then(function (response) {
                return response.json();
            }).then(function (myJson) {
                alert("VIEW SAVED - send this link: " +
                    window.location.protocol + "//" + window.location.hostname + "/viewer/react/fragglebox/" + myJson.uuid.toString())
            });
        }
        for(var key in this.props.inViewList){
            if(key.startsWith("MOLLOAD_") && parseInt(key.split("MOLLOAD_")[[1]], 10)==this.props.data.id){
                this.setState(prevState => ({isToggleOn: true}));
            }
            if(key.startsWith("COMPLEXLOAD_") && parseInt(key.split("COMPLEXLOAD_")[[1]], 10)==this.props.data.id){
                this.setState(prevState => ({complexOn: true}));
            }
        }
    }

    render() {
        return <div>
            <Button bsSize="large" bsStyle="success" onClick={this.postToServer}>Save view in Fragglebox</Button>
           </div>
    }
}

function mapStateToProps(state) {
  return {
      uuid: state.nglReducers.uuid,
      nglOrientations: state.nglReducers.nglOrientations,
      objectsInView: state.nglReducers.objectsInView,
  }
}
const mapDispatchToProps = {
    reloadSelectionState: selectionActions.reloadselectionState,
    reloadApiState: apiActions.reloadApiState,
    loadObject: nglLoadActions.loadObject,
    setNGLOrientation: nglLoadActions.setNGLOrientation,
    setOrientation: nglLoadActions.setOrientation,
    setLoadingState: nglLoadActions.setLoadingState,
    setUuid: nglLoadActions.setUuid,
    setUpdateState: nglLoadActions.setUpdateState,
    setStageColor:nglLoadActions.setStageColor,
}
export default connect(mapStateToProps, mapDispatchToProps)(SaveCheckpointButton);