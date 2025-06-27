import { useState } from 'react';
import { Button, message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import GameTable from '../components/GameTable';
import GameForm from '../components/GameForm';
import { getGames, addGame, updateGame, deleteGame } from '../api/games';
import { Game } from '../../../functions/src/types/game';

export default function Dashboard() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Game | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data = [], isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: getGames,
  });

  const addMut = useMutation({ mutationFn: addGame, onSuccess: invalidate });
  const updMut = useMutation({ mutationFn: updateGame, onSuccess: invalidate });
  const delMut = useMutation({ mutationFn: deleteGame, onSuccess: invalidate });

  function invalidate() {
    qc.invalidateQueries({ queryKey: ['games'] });
    setModalOpen(false);
    setEditing(null);
    message.success('Success');
  }

  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (g: Game) => {
    setEditing(g);
    setModalOpen(true);
  };

  const handleSubmit = (g: Game) => {
    if (editing) updMut.mutate(g);
    else addMut.mutate(g);
  };

  return (
    <>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={handleAdd}>
        Add game
      </Button>
      <GameTable
        data={data}
        loading={isLoading || addMut.isPending || delMut.isPending || updMut.isPending}
        onEdit={handleEdit}
        onDelete={id => delMut.mutate(id)}
      />
      <GameForm
        open={modalOpen}
        initial={editing}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
