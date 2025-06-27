import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Switch } from 'antd';
import { Game } from '../../../functions/src/types/game';

const { Option } = Select;

export interface GameFormProps {
  open: boolean;
  initial?: Game | null;
  onCancel: () => void;
  onSubmit: (g: Game) => void;
}

export default function GameForm({ open, initial, onCancel, onSubmit }: GameFormProps) {
  const [form] = Form.useForm<Game>();

  useEffect(() => {
    if (initial) form.setFieldsValue(initial);
    else form.resetFields();
  }, [initial, form]);

  const handleOk = async () => {
    const values = await form.validateFields();
    onSubmit({ ...initial, ...values });
  };

  return (
    <Modal
      open={open}
      title={initial ? 'Edit game' : 'Add game'}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" initialValues={{ type: 'BaseGame', standalone: false }}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="id" label="ID" rules={[{ required: true }]}>
          <Input disabled={!!initial} />
        </Form.Item>
        <Form.Item name="publisher" label="Publisher" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="releaseYear" label="Release Year">
          <InputNumber min={1900} max={2100} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select>
            <Option value="BaseGame">BaseGame</Option>
            <Option value="Expansion">Expansion</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Standalone expansion" name="standalone" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}
