import { API_URL } from "../../apiConfig";

// Action Types
export const SET_USER_ID = 'SET_USER_ID';
export const CLEAR_USER_ID = 'CLEAR_USER_ID';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const CLEAR_USER_DETAILS = 'CLEAR_USER_DETAILS';

// Action Creators
export const setUserId = (userId) => ({
  type: SET_USER_ID,
  payload: userId,
});

export const clearUserId = () => ({
  type: CLEAR_USER_ID,
});

export const setUserDetails = (userDetails) => ({
  type: SET_USER_DETAILS,
  payload: userDetails,
});

export const clearUserDetails = () => ({
  type: CLEAR_USER_DETAILS,
});

// Thunk action creators
export const fetchUserDetails = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      headers: {
        'x-auth-token': localStorage.getItem('x-auth-token'),
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
    const userDetails = await response.json();
    dispatch(setUserDetails(userDetails));
  } catch (error) {
    console.error('Error fetching user details:', error);
    // You might want to dispatch an error action here
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('x-auth-token');
  dispatch(clearUserId());
  dispatch(clearUserDetails());
};
