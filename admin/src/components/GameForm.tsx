import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Switch } from 'antd';
import { Game } from '../types/game';

export interface GameFormProps {
  open: boolean;
  initial?: Game | null;
  onCancel: () => void;
  onSubmit: (g: Game) => void;
  confirmLoading?: boolean;
}

export default function GameForm({
  open,
  initial,
  onCancel,
  onSubmit,
  confirmLoading = false,
}: GameFormProps) {
  const [form] = Form.useForm<Game>();

  useEffect(() => {
    if (initial) {
      form.setFieldsValue(initial);
    } else {
      form.resetFields();
    }
  }, [initial, form]);

  const handleOk = async () => {
    const values = await form.validateFields();
    onSubmit(values as Game);
  };

  return (
    <Modal
      open={open}
      title={initial ? 'Edit Game' : 'Add Game'}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
    >
      <Form form={form} layout="vertical" initialValues={{ type: 'BaseGame', standalone: false }}>
        <Form.Item name="id" label="ID" rules={[{ required: true, message: 'Please enter an ID' }]}>
          <Input disabled={!!initial} />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter a name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="publisher" label="Publisher">
          <Input />
        </Form.Item>

        <Form.Item name="releaseYear" label="Release Year">
          <InputNumber min={1900} max={2100} style={{ width: '100%' }} placeholder="e.g. 2025" />
        </Form.Item>

        <Form.Item
          name={['players', 'min']}
          label="Min Players"
          rules={[{ required: true, message: 'Please enter min players' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name={['players', 'max']} label="Max Players">
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="baseGame" label="Base Game ID">
          <Input placeholder="Enter parent game ID, if any" />
        </Form.Item>

        <Form.Item name="expansions" label="Expansions">
          <Select mode="tags" style={{ width: '100%' }} placeholder="Enter expansion IDs" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please select a type' }]}
        >
          <Select
            options={[
              { label: 'BaseGame', value: 'BaseGame' },
              { label: 'Expansion', value: 'Expansion' },
            ]}
          />
        </Form.Item>

        <Form.Item name="standalone" label="Standalone expansion" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}
