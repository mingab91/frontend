import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../common/axios'

// action 생성
const LOAD_FOLDERS = 'LOAD_FOLDERS';
const DEL_FOLDERS = 'DEL_FOLDERS';

// action creators
const loadFolders = createAction(LOAD_FOLDERS, (list) => ({ list }));
const delFolderss = createAction(DEL_FOLDERS, (coupon_id) => ({coupon_id}));

// initialState
const initialState = {
  list: [],
};

// 찜한목록 불러오기
const getFoldersMiddleware = () => {
  return async (dispatch) => {
    try{
      const res = await apis.getFolders();
      dispatch(loadFolders(res.data.coupons));
    }catch(e){
      console.log(e);
    }
  };
};

export const delFoldersMiddleware = (coupon_id) => {
  return async (dispatch, getState, { history }) => {
    try{
      await apis.delFolders(coupon_id);
      dispatch(delFolderss(coupon_id));
      history.push('/salebox');
    }catch(e){
      console.log(e);
    }
  }
};

// reducer
export default handleActions(
  {
    [LOAD_FOLDERS]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),
    [DEL_FOLDERS]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.coupon_id);
        if (idx !== -1) {
          draft.list.splice(idx, 1);
        }
      }),
  },
  initialState
);

const actionCreators = {
  getFoldersMiddleware,
  delFoldersMiddleware,
};

export { actionCreators };
