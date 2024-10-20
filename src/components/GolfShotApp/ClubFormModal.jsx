import { useClubContext } from "providers/GolfShotApp/ClubProvider";
import { Button, Form, Input, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useGetClubs, useUpdateClub, useAddClub, useDeleteClub } from 'api/resources/GolfShotApp/clubs';

const ClubFormModal = () => {
  const {
    closeModals,
    addClubModalOpen,
    editingClub,
    setEditingClub,
    setSelectedClub,
  } = useClubContext();
  const { data: clubs } = useGetClubs();
  const { addClub } = useAddClub();
  const { updateClub } = useUpdateClub();
  const { deleteClub } = useDeleteClub();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const handleAddClub = async (values) => {
    try {
      await addClub(values);
      addForm.resetFields();
      closeModals();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClub = async () => {
    try {
      await updateClub(editingClub.id, editingClub);
      setSelectedClub(editingClub);
      closeModals();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClub = async (club) => {
    try {
      await deleteClub(club.id);
      closeModals();
      setSelectedClub(!!clubs?.length && clubs[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return <>
    <Modal title={'Add club'} open={addClubModalOpen} closeIcon={<CloseOutlined />} footer={null} onCancel={closeModals}>
      <Form
        form={addForm}
        layout="vertical"
        onFinish={handleAddClub}
        initialValues={{
          name: '',
          carryDistanceYards: '',
          totalDistanceYardsPlusMinus: '',
          dispersionRadiusYardsPlusMinus: '',
        }}
        autoComplete='off'
      >
        <Form.Item label="Name" name="name">
          <Input placeholder="ex. Driver"/>
        </Form.Item>
        <Form.Item label="Carry Distance (yards)" name="carryDistanceYards">
          <Input placeholder="ex. 250"/>
        </Form.Item>
        <Form.Item label="Total Distance +/- (yards)" name="totalDistanceYardsPlusMinus">
          <Input placeholder="ex. 20"/>
        </Form.Item>
        <Form.Item label="Dispersion Radius +/- (yards)" name="dispersionRadiusYardsPlusMinus">
          <Input placeholder="ex. 35"/>
        </Form.Item>
        <Form.Item className="text-right">
          <Button type="primary" htmlType="submit">Add club</Button>
        </Form.Item>
      </Form>
    </Modal>

    <Modal title={'Edit club'} open={!!editingClub} closeIcon={<CloseOutlined />} footer={null} onCancel={closeModals}>
      <Form
        form={editForm}
        layout="vertical"
        onFinish={handleEditClub}
      >
        <Form.Item label="Name">
          <Input placeholder="ex. Driver" value={editingClub?.name} onChange={(e) => setEditingClub({...editingClub, name: e.target.value})}/>
        </Form.Item>
        <Form.Item label="Carry Distance (yards)">
          <Input placeholder="ex. 250" value={editingClub?.carryDistanceYards} onChange={(e) => setEditingClub({...editingClub, carryDistanceYards: e.target.value})}/>
        </Form.Item>
        <Form.Item label="Total Distance +/- (yards)">
          <Input placeholder="ex. 20" value={editingClub?.totalDistanceYardsPlusMinus} onChange={(e) => setEditingClub({...editingClub, totalDistanceYardsPlusMinus: e.target.value})}/>
        </Form.Item>
        <Form.Item label="Dispersion Radius +/- (yards)">
          <Input placeholder="ex. 35" value={editingClub?.dispersionRadiusYardsPlusMinus} onChange={(e) => setEditingClub({...editingClub, dispersionRadiusYardsPlusMinus: e.target.value})}/>
        </Form.Item>
        <div className="flex justify-between">
          <Form.Item>
            <Button type='primary' danger onClick={() => handleDeleteClub(editingClub)}>Delete</Button>
          </Form.Item>
          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">Update club</Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  </>
}

export default ClubFormModal;
