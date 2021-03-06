/**
 * Created by abradley on 03/03/2018.
 */
// Define all of the actions in my application
// NGL loaders and deleters
export const LOAD_OBJECT = 'LOAD_OBJECT';
export const DELETE_OBJECT = 'DELETE_OBJECT';
export const LOAD_OBJECT_SUCCESS = 'LOAD_OBJECT_SUCCESS';
export const LOAD_OBJECT_FAILURE = 'LOAD_OBJECT_FAILURE';
export const DELETE_OBJECT_SUCCESS = 'DELETE_OBJECT_SUCCESS';
export const DELETE_OBJECT_FAILURE = 'DELETE_OBJECT_FAILURE';
// NGL scene setters
export const SET_COLOR = 'SET_COLOR';
export const SET_STYLE = 'SET_STYLE';
export const SET_SPIN = 'SET_SPIN';
export const SET_WATER = 'SET_WATER';
export const SET_HYDROGEN = 'SET_HYDROGEN';
export const SET_STAGE_COLOR = 'SET_STAGE_COLOR';
export const SET_NGL_PROT_STYLE = 'SET_NGL_PROT_STYLE';
export const REDEPLOY_VECTORS = 'REDEPLOY_VECTORS';
// Target, Site, Molecule, Protein, Compound
export const LOAD_TARGETS = 'LOAD_TARGETS';
export const LOAD_PROTEINS = 'LOAD_PROTEINS';
export const LOAD_MOL_GROUPS = 'LOAD_MOL_GROUPS';
export const LOAD_MOLECULES = 'LOAD_MOLECULES';
export const LOAD_COMPOUNDS = 'LOAD_COMPOUNDS';
// Load data from the API
export const GET_FROM_API = 'GET_FROM_API';
export const GET_FROM_API_SUCCESS = 'GET_FROM_API_SUCCESS';
export const GET_FROM_API_FAILURE = 'GET_FROM_API_FAILURE';
export const RECEIVE_DATA_FROM_API = 'RECEIVE_DATA_FROM_API';
export const SET_TARGET_ID_LIST = 'SET_TARGET_ID_LIST';
export const SET_TARGET_ON = 'SET_TARGET_ON';
export const SET_MOL_GROUP_LIST = 'SET_MOL_GROUP_LIST';
export const SET_MOLECULE_LIST = 'SET_MOLECULE_LIST';
export const SET_MOL_GROUP_ON = 'SET_MOL_GROUP_ON';
export const OBJECT_LOADING = 'OBJECT_LOADING';
export const DELETE_OBJECT_TYPE = 'DELETE_OBJECT_TYPE';
export const SET_TO_BUY_LIST = 'SET_TO_BUY_LIST:';
export const APPEND_TO_BUY_LIST = 'APPEND_TO_BUY_LIST';
export const REMOVE_FROM_TO_BUY_LIST = 'REMOVE_FROM_TO_BUY_LIST';
export const POST_TO_API = 'POST_TO_API';
export const POST_TO_API_SUCCESS = 'POST_TO_API_SUCESS';
export const POST_TO_API_FAILURE = 'POST_TO_API_FAILURE';
// Pandda stuff
export const SET_PANNDA_EVENT_LIST = 'SET_PANNDA_EVENT_LIST';
export const SET_PANNDA_SITE_ON = 'SET_PANNDA_SITE_ON';
export const SET_PANNDA_EVENT_ON = 'SET_PANNDA_EVENT_ON';
export const SET_PANNDA_SITE_LIST = 'SET_PANNDA_SITE_LIST';
// Setting the display
export const SET_APP_ON = 'SET_APP_ON';
// Data related to network
export const GET_FULL_GRAPH = 'GET_FULL_GRAPH';
export const GOT_FULL_GRAPH = 'GOT_FULL_GRAPH';
export const SELECT_VECTOR = 'SELECT_VECTOR';
export const SET_MOL = 'SET_MOL';
export const SET_VECTOR_LIST = 'SET_VECTOR_LIST';
// State broadcast
export const SET_NGL_ORIENTATION = 'SET_NGL_ORIENTATION';
export const SET_ORIENTATION = 'SET_ORIENTATION';
export const SET_UUID = 'SET_UUID';
export const SET_LOADING_STATE = 'SET_LOADING_STATE';
export const SET_HOTSPOT_LIST = 'SET_HOTSPOT_LIST';
export const SET_HOTSPOT_ON = 'SET_HOTSPOT_ON';
export const SET_DUCK_YANK_DATA = 'SET_DUCK_YANK_DATA';
export const SET_FRAGMENT_DISPLAY_LIST = 'SET_FRAGMENT_DISPLAY_LIST';
export const APPEND_FRAGMENT_DISPLAY_LIST = 'APPEND_FRAGMENT_DISPLAY_LIST';
export const REMOVE_FROM_FRAGMENT_DISPLAY_LIST = 'REMOVE_FROM_FRAGMENT_DISPLAY_LIST';
export const SET_COMPLEX_LIST = 'SET_COMPLEX_LIST';
export const APPEND_COMPLEX_LIST = 'APPEND_COMPLEX_LIST';
export const REMOVE_FROM_COMPLEX_LIST = 'REMOVE_FROM_COMPLEX_LIST';
export const SET_VECTOR_ON_LIST = 'SET_VECTOR_ON_LIST';
export const APPEND_VECTOR_ON_LIST = 'APPEND_VECTOR_ON_LIST';
export const REMOVE_FROM_VECTOR_ON_LIST = 'REMOVE_FROM_VECTOR_ON_LIST';
export const SET_HIGHLIGHTED = 'SET_HIGHLIGHTED';
export const SET_COMPOUND_CLASSES = 'SET_COMPOUND_CLASSES';
export const SET_CURRENT_COMPOUND_CLASS = 'SET_CURRENT_COMPOUND_CLASS';
export const RELOAD_SELECTION_STATE = 'RELOAD_SELECTION_STATE';
export const RELOAD_API_STATE = 'RELOAD_API_STATE';
export const SET_SAVING_STATE = 'SET_SAVING_STATE';
export const SET_SESH_LIST_SAVING = 'SET_SESH_LIST_SAVING';
export const SET_LATEST_SESSION = 'SET_LATEST_SESSION';
export const SET_LATEST_SNAPSHOT = 'SET_LATEST_SNAPSHOT';
export const SET_SESSION_ID = 'SET_SESSION_ID';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_TARGET_UNRECOGNISED = 'SET_TARGET_UNRECOGNISED';
export const SET_BOND_COLOR_MAP = 'SET_BOND_COLOR_MAP';
export const SET_SESSION_ID_LIST = 'SET_SESSION_ID_LIST';
export const UPDATE_SESSION_ID_LIST = 'UPDATE_SESSION_ID_LIST';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_SESSION_TITLE = 'SET_SESSION_TITLE';
