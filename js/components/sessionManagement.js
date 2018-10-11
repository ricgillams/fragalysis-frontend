/**
 * Created by ricgillams on 13/06/2018.
 */

import React from "react";
import {connect} from "react-redux";
import * as nglLoadActions from "../actions/nglLoadActions";
import * as apiActions from "../actions/apiActions";
import {Button} from "react-bootstrap";
import { css } from 'react-emotion';
import { RingLoader } from 'react-spinners';
import {getStore} from "../containers/globalStore";
import * as selectionActions from "../actions/selectionActions";
import {withRouter} from "react-router-dom";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export class SessionManagement extends React.Component {
    constructor(props) {
        super(props);
        this.updateFraggleBox = this.updateFraggleBox.bind(this);
        this.deployErrorModal = this.deployErrorModal.bind(this);
        this.postToServer = this.postToServer.bind(this);
        this.handleJson = this.handleJson.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this.generateUuid = this.generateUuid.bind(this);
        this.newSession = this.newSession.bind(this);
        this.saveSession = this.saveSession.bind(this);
        this.saveSnapshot = this.saveSnapshot.bind(this);
        this.state = {
            saveType: ""
        };
    }

    generateUuid(){
        const uuidv4 = require('uuid/v4');
        return uuidv4();
    }

    updateFraggleBox(myJson){
        this.props.setLatestFraggleBox(JSON.stringify(myJson.uuid));
    }

    deployErrorModal(error) {
        this.props.setErrorMessage(error);
    }

    newSession(){
        var newSessionUuid = this.generateUuid();
        this.props.setSessionUuid(newSessionUuid);
        this.setState(prevState => ({saveType: "session"}));
        this.postToServer();
    }

    saveSession(){
        this.setState(prevState => ({saveType: "session"}));
        this.postToServer();
    }

    saveSnapshot(){
        var newSnapshotUuid = this.generateUuid();
        this.props.setSnapshotUuid(newSnapshotUuid);
        this.setState(prevState => ({saveType: "snapshot"}));
        this.postToServer();
    }

    postToServer() {
        this.props.setSavingState(true);
        this.props.setLatestFraggleBox(undefined);
        for(var key in this.props.nglOrientations){
            this.props.setOrientation(key,"REFRESH")
        }
    }

    getCookie(name) {
        if (!document.cookie) {
            return null;
        }
        const xsrfCookies = document.cookie.split(';')
            .map(c => c.trim())
            .filter(c => c.startsWith(name + '='));
        if (xsrfCookies.length === 0) {
            return null;
        }
        return decodeURIComponent(xsrfCookies[0].split('=')[1]);
    }

    handleJson(myJson){
        if(myJson.scene==undefined){
            return;
        }
        var jsonOfView = JSON.parse(JSON.parse(JSON.parse(myJson.scene)).state);
        // saveStore(jsonOfView)
        this.props.reloadApiState(jsonOfView.apiReducers.present);
        this.props.reloadSelectionState(jsonOfView.selectionReducers.present);
        var myOrientDict = jsonOfView.nglReducers.present.nglOrientations;
        for(var div_id in myOrientDict){
            var orientation = myOrientDict[div_id]["orientation"];
            var components = myOrientDict[div_id]["components"];
            for (var component in components){
                this.props.loadObject(components[component]);
            }
            this.props.setNGLOrientation(div_id, orientation);
        }
        this.props.selectVector(jsonOfView.selectionReducers.present.currentVector);
        this.props.setStageColor(jsonOfView.nglReducers.present.stageColor);
        this.props.setCompoundClasses(jsonOfView.selectionReducers.present.compoundClasses);
    };

    componentDidUpdate() {
        var hasBeenRefreshed = true
        if (this.props.uuid!="UNSET") {
            fetch("/api/viewscene/?uuid="+this.props.uuid)
                .then(function(response) {
                    return response.json();
                }).then(json => this.handleJson(json.results[0]))
        }
        for (var key in this.props.nglOrientations){
            if(this.props.nglOrientations[key]=="REFRESH") {
                hasBeenRefreshed = false;
            }
            if(this.props.nglOrientations[key]=="STARTED"){
                hasBeenRefreshed = false
            }
        }
        if (hasBeenRefreshed==true) {
            var store = JSON.stringify(getStore().getState());
            const csrfToken = this.getCookie("csrftoken");
            var fullState = {"state": store};
            if (this.state.saveType == "session") {
                var uuidString = this.props.sessionUuid;
            } else {
                var uuidString = this.props.snapshotUuid;
            }
            var title = 'need to define title';
            var username = DJANGO_CONTEXT["username"];
            var formattedState = {
                uuid: uuidString,
                title: title,
                sessionAuthor: username,
                scene: JSON.stringify(JSON.stringify(fullState))
            };
            fetch("/api/viewscene/", {
                method: "post",
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedState)
            }).then(function (response) {
                return response.json();
            }).then((myJson) => {
                this.updateFraggleBox(myJson);
            }).catch((error) => {
                this.deployErrorModal(error);
            });
        }
    }

    render() {
        if (this.props.savingState == true) {
            return <RingLoader className={override} sizeUnit={"px"} size={30} color={'#7B36D7'} loading={this.props.savingState}/>
        } else {
            if (this.props.sessionUuid == "unsetSession") {
                return (
                    <div>
                        <Button bsSize="sm" bsStyle="success" onClick={this.saveSnapshot}>Share current state</Button>
                        <Button bsSize="sm" bsStyle="success" onClick={this.newSession}>Start new session</Button>
                        <Button bsSize="sm" bsStyle="success" disabled>Save session</Button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Button bsSize="sm" bsStyle="success" onClick={this.saveSnapshot}>Share current state</Button>
                        <Button bsSize="sm" bsStyle="success" onClick={this.newSession}>Start new session</Button>
                        <Button bsSize="sm" bsStyle="success" onClick={this.saveSession}>Save session</Button>
                    </div>
                )
            }
        }
    }
}

function mapStateToProps(state) {
  return {
      nglOrientations: state.nglReducers.present.nglOrientations,
      savingState: state.apiReducers.present.savingState,
      uuid: state.nglReducers.present.uuid,
      sessionUuid: state.apiReducers.present.sessionUuid,
  }
}
const mapDispatchToProps = {
    setSavingState: apiActions.setSavingState,
    setOrientation: nglLoadActions.setOrientation,
    setNGLOrientation: nglLoadActions.setNGLOrientation,
    loadObject: nglLoadActions.loadObject,
    reloadApiState: apiActions.reloadApiState,
    reloadSelectionState: selectionActions.reloadSelectionState,
    setLatestFraggleBox: apiActions.setLatestFraggleBox,
    setErrorMessage: apiActions.setErrorMessage,
    selectVector: selectionActions.selectVector,
    setStageColor: nglLoadActions.setStageColor,
    setCompoundClasses: selectionActions.setCompoundClasses,
    setSessionUuid: apiActions.setSessionUuid,
    setSnapshotUuid: apiActions.setSnapshotUuid,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionManagement));
