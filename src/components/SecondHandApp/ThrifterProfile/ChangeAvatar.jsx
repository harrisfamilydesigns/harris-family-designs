import { useState } from 'react';
import { Avatar, Button, Spin, Upload } from "antd"
import { thrifters, tokenProvider, uploads, useCurrentUser, useThrifter } from '../../../api';

const ChangeAvatar = () => {
  const { currentUser, isLoading: isUserLoading } = useCurrentUser();
  const { thrifter, isLoading: isThrifterLoading } = useThrifter(currentUser?.thrifterId);
  const isLoading = isUserLoading || isThrifterLoading;
  const [uploading, setUploading] = useState(false);

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin size="large" style={{marginTop: 16}}/>
    </div>
  );

  const updateThrifter = async (data) => {
    try {
      const { error } = await thrifters.update(thrifter.id, data);
      if (error) throw new Error(error.message);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Upload
      name="file"
      maxCount={1}
      action={uploads.uploadPath}
      headers={{Authorization: `Bearer ${tokenProvider.getToken()}`}}
      onChange={({ file }) => {
        if (file.status === 'uploading') {
          setUploading(true);
        } else {
          setUploading(false);
        }
        if (file.status === 'done') {
          const url = file?.response?.url;
          updateThrifter({avatarUrl: url})
        }
      }}
      showUploadList={uploading}
    >
      <Button
        style={{ width: 160, height: 160, margin: 0, padding: 0 }}
        type="dashed"
        shape="circle"
        icon={<Avatar src={thrifter?.avatarUrl} size={150} />}
      >
      </Button>
    </Upload>
  )
}

export default ChangeAvatar;
