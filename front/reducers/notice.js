import produce from '../util/produce';

export const initialState = {
    noticeContents: [], // 크롤링 데이터
    noticeHrefs: [], // 크롤링 데이터 링크
};

export const LOAD_NOTICE_REQUEST = 'LOAD_NOTICE_REQUEST';
export const LOAD_NOTICE_SUCCESS = 'LOAD_NOTICE_SUCCESS';
export const LOAD_NOTICE_FAILURE = 'LOAD_NOTICE_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
        switch (action.type) {
            case LOAD_NOTICE_REQUEST: {
                break;
            }
            case LOAD_NOTICE_SUCCESS: {
                draft.noticeContents = action.data.content;
                draft.noticeHrefs = action.data.hrefs;
                break;
            }
            case LOAD_NOTICE_FAILURE: {
                break;
            }
            default: {
                break;
            }
        }
    });

export default reducer;