import {
  combineReducers,
  createAction,
  handleActions,
} from "metabase/lib/redux";

export const DEFAULT_EMBED_OPTIONS = {
  top_nav: false,
  side_nav: false,
  search: false,
  new_button: false,
  breadcrumbs: false,
  logo: false,
  header: true,
  additional_info: false,
  action_buttons: true,
  premium_offering: false,
} as const;

export const SET_OPTIONS = "metabase/embed/SET_OPTIONS";
export const setOptions = createAction(SET_OPTIONS);

const options = handleActions(
  {
    [SET_OPTIONS]: (state, { payload }) => ({
      ...DEFAULT_EMBED_OPTIONS,
      ...payload,
    }),
  },
  {},
);

// eslint-disable-next-line import/no-default-export -- deprecated usage
export default combineReducers({
  options,
});
