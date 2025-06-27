import { Table, Space, Button, Popconfirm } from 'antd';
import type { TableColumnsType } from 'antd';
import { Game } from '../types/game';

export interface GameTableProps {
  data: Game[];
  onEdit: (g: Game) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export default function GameTable({ data, onEdit, onDelete, loading }: GameTableProps) {
  const columns: TableColumnsType<Game> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Year', dataIndex: 'releaseYear', key: 'releaseYear' },
    { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: t => (t === 'BaseGame' ? 'Base' : 'Expansion'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Popconfirm title="Delete this game?" onConfirm={() => onDelete(record.id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
}
