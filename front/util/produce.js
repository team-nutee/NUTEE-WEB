import { enableES5, produce } from 'immer';

const produces = (...args) => {
  enableES5();
  return produce(...args);
};
export default produces;