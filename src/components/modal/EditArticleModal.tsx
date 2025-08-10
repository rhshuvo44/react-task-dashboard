import { Button, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUpdateArticleMutation } from "../../redux/api/api";
import type { TArticle } from "../../types/tableType";

const { Option } = Select;

interface EditArticleModalProps {
  open: boolean;
  onClose: () => void;
  article: TArticle;
}

export const EditArticleModal = ({
  open,
  onClose,
  article,
}: EditArticleModalProps) => {
  const [formData, setFormData] = useState(article || {});
  const [updateArticle] = useUpdateArticleMutation();

  useEffect(() => {
    setFormData(article || {});
  }, [article]);

  const handleSave = async () => {
    if (!formData.title?.trim() || !formData.content?.trim()) {
      toast.error("Title and Content are required");
      return;
    }
    try {
      await updateArticle({
        id: Number(formData.id), // Ensure number type
        title: formData.title,
        content: formData.content,
        status: formData.status,
      }).unwrap();
      toast.success("Article updated successfully!");
      onClose();
    } catch {
      toast.error("Failed to update article");
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
