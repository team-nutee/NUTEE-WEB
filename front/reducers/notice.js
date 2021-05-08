import produce from '../util/produce';

export const initialState = {
  noticeTitles: [], // 크롤링 데이터
  noticeHrefs: [], // 크롤링 데이터 링크
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
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 6; i++) {
        draft.noticeTitles[0].push(action.data[i].title);
        draft.noticeHrefs[0].push(action.data[i].href);
      }
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
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 6; i++) {
        draft.noticeTitles[1].push(action.data[i].title);
        draft.noticeHrefs[1].push(action.data[i].href);
      }
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
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 6; i++) {
        draft.noticeTitles[2].push(action.data[i].title);
        draft.noticeHrefs[2].push(action.data[i].href);
      }
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
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 6; i++) {
        draft.noticeTitles[3].push(action.data[i].title);
        draft.noticeHrefs[3].push(action.data[i].href);
      }
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
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 6; i++) {
        draft.noticeTitles[4].push(action.data[i].title);
        draft.noticeHrefs[4].push(action.data[i].href);
      }
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
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 6; i++) {
        draft.noticeTitles[5].push(action.data[i].title);
        draft.noticeHrefs[5].push(action.data[i].href);
      }
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
