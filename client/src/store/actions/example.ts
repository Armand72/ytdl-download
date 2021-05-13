// import API from "./../api/axios";
import { exempleMutation } from '../reducers/exemple.slice';
import { AppDispatch } from '../store';

// export const getFood = (idChild) => {
//   try {
//     API.get(`food/${idChild}`).then((response) =>
//       dispatch(response.data)
//     );
//   } catch (err) {
//     const errors = err.response;

//     if (errors) {
//       console.log(errors);
//     }
//   }
// };
// eslint-disable-next-line import/prefer-default-export
export const exempleAction = () => async (
  dispatch: AppDispatch,
): Promise<void> => {
  // const data = await API.get(`food/${idChild}`)

  dispatch(exempleMutation('salut'));
};
