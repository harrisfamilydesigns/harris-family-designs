import React from 'react';
import { Button, App, Typography, Form, Upload, Input, Spin, Alert } from 'antd';
import CardLayout from '../../shared/CardLayout';
import { useCurrentUser, useThrifter, thrifters, uploads, tokenProvider } from '../../../api';
import { urlForPath } from '../../../api/request/utils';

// Card 8: Profile Photo and Bio
// Title: "Showcase Your Thrifter Persona"
// Description: "Upload a profile picture and write a short bio. This adds a personal touch to your profile, making customers more excited to receive boxes from you."
// Fields: Profile photo upload, Bio text area
// Action: Finish button

const ThrifterOnboardingProfilePhotoAndBio = ({onNext, onPrev}) => {
  const { currentUser, isLoading: isUserLoading } = useCurrentUser();
  const { thrifter, isLoading: isThrifterLoading } = useThrifter(currentUser?.thrifterId);
  const isLoading = isUserLoading || isThrifterLoading;
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const {message} = App.useApp();
  const [form] = Form.useForm();

  const handleSubmit = async ({avatarUrl, bio}) => {
    setSubmitting(true);
    try {
      const {error} = await thrifters.update(thrifter.id, {avatarUrl, bio});
      if (error) throw new Error(error.message);
      message.success('Your profile photo and bio have been saved!');
      onNext();
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin size="large" style={{marginTop: 16}}/>
    </div>
  );

  return (
    <CardLayout title="Showcase Your Thrifter Persona">
      <Typography.Paragraph>
        Upload a profile picture and write a short bio. This adds a personal touch to your profile, making customers more excited to receive boxes from you.
      </Typography.Paragraph>
      <Form
        name="thrifter-onboarding-profile-photo-and-bio"
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          avatarUrl: thrifter?.avatarUrl,
          bio: thrifter?.bio,
        }}
        onChange={() => setError('')}
      >
        <Form.Item
          label="Profile Picture"
          name="avatarUrl"
          rules={[
            {
              required: true,
              message: 'Please upload a profile picture.',
            },
          ]}
        >
          {/* TODO: Extract url and headers and handle form Errors*/}
          <Upload
            listType="picture-card"
            accept="image/*"
            maxCount={1}
            name="file"
            defaultFileList={thrifter?.avatarUrl ? [{
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: thrifter.avatarUrl,
            }] : []}
            headers={{ Authorization: `Bearer ${tokenProvider.getToken()}` }}
            action={urlForPath(uploads.uploadPath)}
            onChange={async ({ file, fileList, event }) => {
              if (file.status === 'done') {
                const url = file?.response?.url;
                form.setFieldsValue({ avatarUrl: url });
              }
            }
          }
          >
            <div>
              <Button>Upload</Button>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Bio"
          name="bio"
          rules={[
            {
              required: true,
              message: 'Please write a short bio.',
            },
          ]}
        >
          <Input.TextArea
            placeholder="Write a short bio"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <Button
              onClick={onPrev}
            >Back</Button>
            <Button
              type="primary"
              htmlType='submit'
              disabled={submitting}
            >Finish</Button>
          </div>
        </Form.Item>
        { error && <Alert message={error} type="error" /> }
      </Form>
    </CardLayout>
  );
}

export default ThrifterOnboardingProfilePhotoAndBio;
