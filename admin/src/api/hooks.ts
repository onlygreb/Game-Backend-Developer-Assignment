import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGames, addGame, updateGame, deleteGame } from './games';
import { Game } from '../types/game';

export function useGames() {
  return useQuery<Game[], Error>({
    queryKey: ['games'],
    queryFn: getGames,
  });
}

export function useAddGame(onSuccess: () => void) {
  const qc = useQueryClient();
  return useMutation<Game, Error, Game>({
    mutationFn: addGame,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['games'] });
      onSuccess();
    },
  });
}

export function useUpdateGame(onSuccess: () => void) {
  const qc = useQueryClient();
  return useMutation<Game, Error, Game>({
    mutationFn: updateGame,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['games'] });
      onSuccess();
    },
  });
}

export function useDeleteGame(onSuccess: () => void) {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteGame,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['games'] });
      onSuccess();
    },
  });
}
