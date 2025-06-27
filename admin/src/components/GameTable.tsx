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
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id.localeCompare(b.id) },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Year',
      dataIndex: 'releaseYear',
      key: 'releaseYear',
      sorter: (a, b) => (a.releaseYear ?? 0) - (b.releaseYear ?? 0),
    },
    {
      title: 'Players',
      key: 'players',
      render: (_, record) =>
        record.players
          ? `${record.players.min}${record.players.max ? `–${record.players.max}` : ''}`
          : '-',
    },
    {
      title: 'Publisher',
      dataIndex: 'publisher',
      key: 'publisher',
      sorter: (a, b) => (a.publisher ?? '').localeCompare(b.publisher ?? ''),
    },
    { title: 'Base Game', dataIndex: 'baseGame', key: 'baseGame' },
    {
      title: 'Expansions',
      dataIndex: 'expansions',
      key: 'expansions',
      render: expansions => (expansions?.length ? expansions.join(', ') : '-'),
    },
    {
      title: 'Standalone',
      dataIndex: 'standalone',
      key: 'standalone',
      render: v => (v ? 'Yes' : 'No'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'BaseGame', value: 'BaseGame' },
        { text: 'Expansion', value: 'Expansion' },
      ],
      onFilter: (value, record) => record.type === value,
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
