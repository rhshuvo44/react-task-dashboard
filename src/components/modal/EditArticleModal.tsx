import { Button, Input, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useUpdateArticleMutation } from "../../redux/api/api";

const { Option } = Select;

interface EditArticleModalProps {
  open: boolean;
  onClose: () => void;
  article: {
    id: string;
    title: string;
    content: string;
    status: string;
    [key: string]: any;
  };
}

export const EditArticleModal = ({ open, onClose, article }) => {
  const [formData, setFormData] = useState(article || {});
  const [updateArticle] = useUpdateArticleMutation();

  useEffect(() => {
    setFormData(article || {});
  }, [article]);

  const handleSave = async () => {
    if (!formData.title?.trim() || !formData.content?.trim()) {
      message.error("Title and Content are required");
      return;
    }
    try {
      await updateArticle(formData).unwrap();
      message.success("Article updated successfully!");
      onClose();
    } catch {
      message.error("Failed to update article");
    }
  };

  return (
    <Modal
      title="Edit Article"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save Changes
        </Button>,
      ]}
    >
      <Input
        placeholder="Title"
        value={formData.title || ""}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        style={{ marginBottom: 10 }}
      />
      <Input.TextArea
        placeholder="Content"
        rows={4}
        value={formData.content || ""}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        style={{ marginBottom: 10 }}
      />
      <Select
        style={{ width: "100%" }}
        value={formData.status || "Draft"}
        onChange={(value) => setFormData({ ...formData, status: value })}
      >
        <Option value="Published">Published</Option>
        <Option value="Draft">Draft</Option>
      </Select>
    </Modal>
  );
};
