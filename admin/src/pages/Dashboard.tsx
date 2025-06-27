import { useState, useEffect, SetStateAction } from 'react';
import { Button, message, Input, Space } from 'antd';
import GameTable from '../components/GameTable';
import GameForm from '../components/GameForm';
import { Game } from '../types/game';
import { useGames, useAddGame, useUpdateGame, useDeleteGame } from '../api/hooks';

export default function Dashboard() {
  const { data, isLoading, error } = useGames();
  const games: Game[] = data ?? [];

  const [searchTerm, setSearchTerm] = useState('');
  const filtered = games.filter(g =>
    [g.id, g.name, g.publisher, g.type, g.baseGame]
      .filter(Boolean)
      .some(field => field!.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  );

  useEffect(() => {
    if (error) message.error(error.message);
  }, [error]);

  const [editing, setEditing] = useState<Game | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const onSuccess = () => {
    setModalOpen(false);
    setEditing(null);
    message.success('Success');
  };

  const addMut = useAddGame(onSuccess);
  const updMut = useUpdateGame(onSuccess);
  const delMut = useDeleteGame(onSuccess);

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
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search games"
          allowClear
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setSearchTerm(e.target.value)
          }
          style={{ width: 240 }}
        />
        <Button type="primary" onClick={handleAdd} loading={addMut.isPending || updMut.isPending}>
          Add game
        </Button>
      </Space>

      <GameTable
        data={filtered}
        loading={isLoading || addMut.isPending || updMut.isPending || delMut.isPending}
        onEdit={handleEdit}
        onDelete={id => delMut.mutate(id)}
      />

      <GameForm
        open={modalOpen}
        initial={editing}
        confirmLoading={addMut.isPending || updMut.isPending}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
