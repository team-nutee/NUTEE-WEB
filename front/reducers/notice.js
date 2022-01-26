import produce from '../util/produce';

export const initialState = {
  noticeTitles: [], // 공지사항 타이틀
  noticeHrefs: [], // 공지사항 링크
};

export const LOAD_HAKSA_NOTICE_REQUEST = 'LOAD_HAKSA_NOTICE_REQUEST';
export const LOAD_HAKSA_NOTICE_SUCCESS = 'LOAD_HAKSA_NOTICE_SUCCESS';
export const LOAD_HAKSA_NOTICE_FAILURE = 'LOAD_HAKSA_NOTICE_FAILURE';

export const LOAD_SOOUP_NOTICE_REQUEST = 'LOAD_SOOUP_NOTICE_REQUEST';
export const LOAD_SOOUP_NOTICE_SUCCESS = 'LOAD_SOOUP_NOTICE_SUCCESS';
export const LOAD_SOOUP_NOTICE_FAILURE = 'LOAD_SOOUP_NOTICE_FAILURE';

export const LOAD_HAKJUM_NOTICE_REQUEST = 'LOAD_HAKJUM_NOTICE_REQUEST';
export const LOAD_HAKJUM_NOTICE_SUCCESS = 'LOAD_HAKJUM_NOTICE_SUCCESS';
export const LOAD_HAKJUM_NOTICE_FAILURE = 'LOAD_HAKJUM_NOTICE_FAILURE';

export const LOAD_JANGHAK_NOTICE_REQUEST = 'LOAD_JANGHAK_NOTICE_REQUEST';
export const LOAD_JANGHAK_NOTICE_SUCCESS = 'LOAD_JANGHAK_NOTICE_SUCCESS';
export const LOAD_JANGHAK_NOTICE_FAILURE = 'LOAD_JANGHAK_NOTICE_FAILURE';

export const LOAD_ILBAN_NOTICE_REQUEST = 'LOAD_ILBAN_NOTICE_REQUEST';
export const LOAD_ILBAN_NOTICE_SUCCESS = 'LOAD_ILBAN_NOTICE_SUCCESS';
export const LOAD_ILBAN_NOTICE_FAILURE = 'LOAD_ILBAN_NOTICE_FAILURE';

export const LOAD_HANGSA_NOTICE_REQUEST = 'LOAD_HANGSA_NOTICE_REQUEST';
export const LOAD_HANGSA_NOTICE_SUCCESS = 'LOAD_HANGSA_NOTICE_SUCCESS';
export const LOAD_HANGSA_NOTICE_FAILURE = 'LOAD_HANGSA_NOTICE_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_HAKSA_NOTICE_REQUEST: {
      break;
    }
    case LOAD_HAKSA_NOTICE_SUCCESS: {
      draft.noticeTitles[0] = [];
      draft.noticeHrefs[0] = [];
      action.data.splice(5).forEach((e) => {
        draft.noticeTitles[0].push(e.title);
        draft.noticeHrefs[0].push(e.href);
      });
      break;
    }
    case LOAD_HAKSA_NOTICE_FAILURE: {
      break;
    }
    case LOAD_SOOUP_NOTICE_REQUEST: {
      break;
    }
    case LOAD_SOOUP_NOTICE_SUCCESS: {
      draft.noticeTitles[1] = [];
      draft.noticeHrefs[1] = [];
      action.data.splice(5).forEach((e) => {
        draft.noticeTitles[1].push(e.title);
        draft.noticeHrefs[1].push(e.href);
      });
      break;
    }
    case LOAD_SOOUP_NOTICE_FAILURE: {
      break;
    }
    case LOAD_HAKJUM_NOTICE_REQUEST: {
      break;
    }
    case LOAD_HAKJUM_NOTICE_SUCCESS: {
      draft.noticeTitles[2] = [];
      draft.noticeHrefs[2] = [];
      action.data.splice(5).forEach((e) => {
        draft.noticeTitles[2].push(e.title);
        draft.noticeHrefs[2].push(e.href);
      });
      break;
    }
    case LOAD_HAKJUM_NOTICE_FAILURE: {
      break;
    }
    case LOAD_JANGHAK_NOTICE_REQUEST: {
      break;
    }
    case LOAD_JANGHAK_NOTICE_SUCCESS: {
      draft.noticeTitles[3] = [];
      draft.noticeHrefs[3] = [];
      action.data.splice(5).forEach((e) => {
        draft.noticeTitles[3].push(e.title);
        draft.noticeHrefs[3].push(e.href);
      });
      break;
    }
    case LOAD_JANGHAK_NOTICE_FAILURE: {
      break;
    }
    case LOAD_ILBAN_NOTICE_REQUEST: {
      break;
    }
    case LOAD_ILBAN_NOTICE_SUCCESS: {
      draft.noticeTitles[4] = [];
      draft.noticeHrefs[4] = [];
      action.data.splice(5).forEach((e) => {
        draft.noticeTitles[4].push(e.title);
        draft.noticeHrefs[4].push(e.href);
      });
      break;
    }
    case LOAD_ILBAN_NOTICE_FAILURE: {
      break;
    }
    case LOAD_HANGSA_NOTICE_REQUEST: {
      break;
    }
    case LOAD_HANGSA_NOTICE_SUCCESS: {
      draft.noticeTitles[5] = [];
      draft.noticeHrefs[5] = [];
      action.data.splice(5).forEach((e) => {
        draft.noticeTitles[5].push(e.title);
        draft.noticeHrefs[5].push(e.href);
      });
      break;
    }
    case LOAD_HANGSA_NOTICE_FAILURE: {
      break;
    }
    default: {
      break;
    }
  }
});

export default reducer;
