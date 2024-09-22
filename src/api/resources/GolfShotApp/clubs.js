import useSWR, { mutate } from 'swr';
import {
  getClubs,
  addClub,
  updateClub,
  deleteClub,
  resetDefaultClubs
} from 'controllers/GolfShotApp/clubs';

// Fetch clubs
export const useGetClubs = (options = {}) => {
  const { data, error, isLoading } = useSWR(`/clubs`, getClubs, {
    ...options
  });

  return { data, error, isLoading }
};

// Update club
export const useUpdateClub = (options = {}) => {
  const update = async (id, params) => {
    try {
      // Perform update
      await updateClub(id, params);
      // Mutate the `/clubs` cache to revalidate
      await mutate(`/clubs`);
    } catch (error) {
      throw new Error(error);
    }
  };

  return { updateClub: update }
};

// Add club
export const useAddClub = (options = {}) => {
  const add = async (params) => {
    try {
      // Perform creation
      await addClub(params);
      // Mutate the `/clubs` cache to revalidate
      await mutate(`/clubs`);
    } catch (error) {
      throw new Error(error);
    }
  };

  return { addClub: add }
}

// Delete club
export const useDeleteClub = (options = {}) => {
  const del = async (id) => {
    try {
      // Perform deletion
      await deleteClub(id);
      // Mutate the `/clubs` cache to revalidate
      await mutate(`/clubs`);
    } catch (error) {
      throw new Error(error);
    }
  };

  return { deleteClub: del }
}

export const useResetDefaultClubs = (options = {}) => {
  const reset = async () => {
    try {
      // Perform reset
      await resetDefaultClubs();
      // Mutate the `/clubs` cache to revalidate
      await mutate(`/clubs`);
    } catch (error) {
      throw new Error(error);
    }
  };

  return { resetDefaultClubs: reset }
}
