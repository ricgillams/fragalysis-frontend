/**
 * Created by abradley on 03/03/2018.
 */
import {
    LOAD_OBJECT,
    LOAD_OBJECT_SUCCESS,
    LOAD_OBJECT_FAILURE,
    OBJECT_LOADING,
    DELETE_OBJECT,
    DELETE_OBJECT_FAILURE,
    DELETE_OBJECT_SUCCESS,
    DELETE_OBJECT_TYPE,
    SET_ORIENTATION,
    SET_NGL_ORIENTATION,
    SET_LOADING_STATE,
    SET_STAGE_COLOR,
    SET_NGL_PROT_STYLE,
    REDEPLOY_VECTORS,
} from "./actonTypes";


export const loadObject = function (group) {
    console.log("ACTIONS: " + group);
    return {
        type: LOAD_OBJECT,
        group: group
    };
}

export const objectLoading = function (group) {
    console.log("ACTIONS: " + group);
    return {
        type: OBJECT_LOADING,
        group: group
    };
}

export const setOrientation = function (div_id, orientation){
    console.log("ACTIONS: " + orientation + " " + div_id);
        return {
        type: SET_ORIENTATION,
        orientation: orientation,
            div_id: div_id,
    };
}

export const loadObjectSuccess = function (group) {
    console.log("ACTIONS: " + group);
    return {
        type: LOAD_OBJECT_SUCCESS,
        group: group,
        success: true
    };
}

export const deleteObjectType = function (object_type) {
    console.log("ACTIONS: " + object_type);
    return {
        type: DELETE_OBJECT_TYPE,
        object_type: object_type
    }
}

export const setNGLOrientation = function (div_id, orientation){
    console.log("ACTIONS: " + orientation + " " + div_id);
        return {
        type: SET_NGL_ORIENTATION,
        orientation: orientation,
            div_id: div_id,
    };
}

export const loadObjectFailure = function (group) {
    console.log("ACTIONS: " + group);
    return {
        type: LOAD_OBJECT_FAILURE,
        group: group,
        success: false
    };
}


export const deleteObject = function (group) {
    console.log("ACTIONS: " + group);
    return {
        type: DELETE_OBJECT,
        group: group
    };
}

export const deleteObjectSuccess = function (group) {
    console.log("ACTIONS: " + group);
    return {
        type: DELETE_OBJECT_SUCCESS,
        group: group,
        success: true
    };
}

export const deleteObjectFailure = function (group) {
    console.log("ACTIONS: " + group);
    return {
        type: DELETE_OBJECT_FAILURE,
        group: group,
        success: false
    };
}

export const setLoadingState = function (bool) {
    console.log("ACTIONS: setting loading state to " + bool);
    return {
        type: SET_LOADING_STATE,
        loadingState: bool
    };
}

export const setStageColor = function (stageColor) {
    console.log("ACTIONS: " + stageColor);
    return {
        type: SET_STAGE_COLOR,
        stageColor: stageColor
    };
}

export const setNglProtStyle = function (nglProtStyle) {
    console.log("ACTIONS: " + nglProtStyle);
    return {
        type: SET_NGL_PROT_STYLE,
        nglProtStyle: nglProtStyle
    };
}

export const redeployVectors = function (objectsWereInView) {
    console.log("ACTIONS: " + objectsWereInView);
    return {
        type: REDEPLOY_VECTORS,
        objectsWereInView: objectsWereInView
    }
}