import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useGetClubs, useUpdateClub, useAddClub, useDeleteClub } from 'api/resources/GolfShotApp/clubs';

const ClubSelector = ({ selectedClub, onSelectClub }) => {
  const [addClubModalOpen, setAddClubModalOpen] = React.useState(false);
  const [editClubModalOpen, setEditClubModalOpen] = React.useState(false);
  const [editClub, setEditClub] = React.useState(null);
  const { data: clubs, isLoading: clubsLoading } = useGetClubs();
  const { updateClub } = useUpdateClub();
  const { addClub } = useAddClub();
  const { deleteClub } = useDeleteClub();

  const openAddClubModal = () => {
    setEditClubModalOpen(false);
    setAddClubModalOpen(true);
  };

  const openEditClubModal = (club) => {
    setAddClubModalOpen(false);
    setEditClub(club);
    setEditClubModalOpen(true);
  };

  const handleEditClub = async () => {
    try {
      await updateClub(editClub.id, editClub);
      setEditClubModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddClub = async (values) => {
    try {
      await addClub(values);
      setAddClubModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCancel = () => {
    setEditClub(null);
    setEditClubModalOpen(false);
  };

  const handleAddCancel = () => {
    setAddClubModalOpen(false);
  };

  const handleDeletePress = async (club) => {
    try {
      await deleteClub(club.id);
    } catch (error) {
      console.error(error);
    }
  };

  if (!clubs || clubsLoading) return <p>Loading clubs...</p>;

  return (
    <>
      <div style={styles.container}>
        <div className="flex flex-row justify-between items-center">
          <h4>Select Club</h4>
          <Button onClick={openAddClubModal}>Add Club</Button>
        </div>
        <ul className="mt-3" style={styles.list}>
          {clubs.map((club) => (
            <li
              key={club.id}
              style={{
                ...styles.item,
                backgroundColor: Number.parseInt(selectedClub.id) === Number.parseInt(club.id) ? 'lightgray' : 'white',
              }}
              onClick={() => onSelectClub(club)}
            >
              <div className="flex flex-row items-baseline justify-between">
                <div>
                  {club.name} - {club.carryDistanceYards}yd ({club.totalDistanceYardsPlusMinus}+/-) {club.dispersionRadiusYardsPlusMinus && `(${club.dispersionRadiusYardsPlusMinus} yd disp.)`}
                </div>
                <div>
                  <Button type="link" onClick={e => {
                    e.stopPropagation();
                    openEditClubModal(club);
                  }}
                  icon={<EditOutlined />}
                  />
                  <Button type="link" onClick={e => {
                    e.stopPropagation();
                    handleDeletePress(club);
                  }}
                    icon={<DeleteOutlined />}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal title={'Edit club'} open={editClubModalOpen} closeIcon={<CloseOutlined />} footer={null} onCancel={handleEditCancel}>
        <Form
          layout="vertical"
          onFinish={handleEditClub}
        >
          <Form.Item label="Name">
            <Input placeholder="ex. Driver" value={editClub?.name} onChange={(e) => setEditClub({...editClub, name: e.target.value})}/>
          </Form.Item>
          <Form.Item label="Carry Distance (yards)">
            <Input placeholder="ex. 250" value={editClub?.carryDistanceYards} onChange={(e) => setEditClub({...editClub, carryDistanceYards: e.target.value})}/>
          </Form.Item>
          <Form.Item label="Total Distance +/- (yards)">
            <Input placeholder="ex. 20" value={editClub?.totalDistanceYardsPlusMinus} onChange={(e) => setEditClub({...editClub, totalDistanceYardsPlusMinus: e.target.value})}/>
          </Form.Item>
          <Form.Item label="Dispersion Radius +/- (yards)">
            <Input placeholder="ex. 35" value={editClub?.dispersionRadiusYardsPlusMinus} onChange={(e) => setEditClub({...editClub, dispersionRadiusYardsPlusMinus: e.target.value})}/>
          </Form.Item>
          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">Update club</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title={'Add club'} open={addClubModalOpen} closeIcon={<CloseOutlined />} footer={null} onCancel={handleAddCancel}>
        <Form
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
    </>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: '10%',
    left: '10px',
    backgroundColor: 'white',
    padding: '10px',
    border: '1px solid black',
    zIndex: 10,
    borderRadius: '8px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    cursor: 'pointer',
    padding: '8px 12px',
    marginBottom: '5px',
    border: '1px solid black',
    borderRadius: '4px',
  },
};

export default ClubSelector;
