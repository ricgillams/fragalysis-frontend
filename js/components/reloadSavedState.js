/**
 * Created by ricgillams on 13/06/2018.
 */
import React from 'react';
import { connect } from 'react-redux'
import * as nglLoadActions from '../actions/nglLoadActions'
import * as apiActions from '../actions/apiActions'
import * as selectionActions from '../actions/selectionActions'
import { Button, Image } from 'react-bootstrap'
import {getStore, saveStore} from "../containers/globalStore";
import apiReducers from "../reducers/apiReducers";


export class ReloadSavedState extends React.Component {
    constructor(props) {
        super(props);
        this.postToServer = this.postToServer.bind(this);
        this.handleRenderState = this.handleRenderState.bind(this);
        this.handleJson = this.handleJson.bind(this);
        this.handleRenderOrientation = this.handleRenderOrientation.bind(this);
    }
    
    handleJson(myJson){
        if(myJson.scene==undefined){
            return;
        }
        var jsonOfView = JSON.parse(JSON.parse(JSON.parse(myJson.scene)).state);
        // saveStore(jsonOfView)
        this.props.reloadSelectionState(jsonOfView.selectionReducers);
        this.props.reloadApiState(jsonOfView.apiReducers);
        this.props.setStageColor(jsonOfView.nglReducers.stageColor);
        var myOrientDict = jsonOfView.nglReducers.nglOrientations;
        for(var div_id in myOrientDict) {
            var orientation = myOrientDict[div_id]["orientation"];
            var components = myOrientDict[div_id]["components"];
            for (var component in components) {
                this.props.loadObject(components[component]);
            }
            this.props.setNGLOrientation(div_id, orientation);
        }
    };

    handleRenderState(){
        var pk = document.getElementById("state_selector").value;
        fetch("/api/viewscene/"+pk)
        .then(function(response) {
            return response.json();
        }).then(json => this.handleJson(json))
    }

    handleRenderOrientation(){
        var pk = document.getElementById("state_selector").value;
        fetch("/api/viewscene/"+pk)
        .then(function(response) {
            return response.json();
        }).then(json => this.handleJson(json))
    }

    postToServer() {
        for(var key in this.props.nglOrientations){
            this.props.setOrientation(key,"REFRESH")
        }
    }

    componentDidUpdate() {
        if (this.props.uuid != "UNSET") {
            fetch("/api/viewscene/?uuid=" + this.props.uuid)
                .then(function (response) {
                    return response.json();
                })
                .then(json => this.handleJson(json.results[0]))
                .then(this.setUuid("UNSET"));
        }
        for(var key in this.props.objectsInView){
            if(key.startsWith("MOLLOAD_") && parseInt(key.split("MOLLOAD_")[[1]], 10)==this.props.data.id){
                this.setState(prevState => ({isToggleOn: true}));
            }
            if(key.startsWith("COMPLEXLOAD_") && parseInt(key.split("COMPLEXLOAD_")[[1]], 10)==this.props.data.id){
                this.setState(prevState => ({complexOn: true}));
            }
        }
    }

    render() {
        return(
            <div>
                <Image src={'../img/Fragglebox_logo_v0.2.png'} responsive rounded />
            </div>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(ReloadSavedState);