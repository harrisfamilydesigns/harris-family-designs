import { IconGlobe } from "@tabler/icons-react";
import { Alert, Button, Flex, Form, Input, Typography } from "antd";
import { useCurrentUser, useThrifter } from "../../../api";
import { useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const ChangeAddress = () => {
  const { currentUser, isLoading: isUserLoading } = useCurrentUser();
  const { thrifter, isLoading: isThrifterLoading } = useThrifter(currentUser?.thrifterId);
  const isLoading = isUserLoading || isThrifterLoading;
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  const { ref: placesWidgetRef } = usePlacesWidget({
    apiKey: googleMapsApiKey,
    onPlaceSelected: (place) => {
      form.setFieldsValue({ address: place.formatted_address });
    },
    options: {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    },
  });

  const handleSubmit = async ({ address }) => {
    setSubmitting(true);
    try {
      const { error } = await thrifters.update(thrifter.id, { address });
      if (error) throw new Error(error.message);
      setEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  // This is a workaround for the issue where the Enter key triggers the form submission
  // when the user is trying to select an address from the Google Places Autocomplete dropdown
  const handleKeyDown = (e) => {
    const placesWidget = placesWidgetRef.current;
    if (placesWidget && e.key === 'Enter') {
      e.preventDefault();
    }
  }

  const ShowAddress = () => {
    return (
      <Typography.Paragraph>
        <Flex align="center">
          <IconGlobe size={20}/>
          {thrifter.address}
          <Typography.Link onClick={() => setEditing(true)} style={{ marginLeft: 10 }}>
            Change
          </Typography.Link>
        </Flex>
      </Typography.Paragraph>
    )
  }

  const EditAddress = () => {
    return (
      <Form
        form={form}
        name="thrifter-address"
        initialValues={{
          address: thrifter.address
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter your address' }]}
        >
          <Input
            placeholder="Enter your address"
            ref={c => placesWidgetRef.current = c?.input}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={submitting}>
            Save
          </Button>
          <Button onClick={() => setEditing(false)} style={{ marginLeft: 10 }}>
            Cancel
          </Button>
        </Form.Item>
        {error && <Alert message={error} type="error" showIcon />}
      </Form>
    )
  }

  if (isLoading) return null;

  return editing ? <EditAddress /> : <ShowAddress />
}

export default ChangeAddress;
