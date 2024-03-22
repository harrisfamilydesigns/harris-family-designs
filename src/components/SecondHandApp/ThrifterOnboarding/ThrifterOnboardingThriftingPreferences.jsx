import React from 'react';
import { Button, Form, App, Alert, Checkbox, Row, Col, Spin } from 'antd';
import CardLayout from '../../shared/CardLayout';
import Typography from 'antd/es/typography/Typography';
import { useCurrentUser, users } from '../../../api';

const ThrifterOnboardingThriftingPreferences = ({ onNext, onPrev }) => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const { message } = App.useApp();

  const handleSubmit = async ({ preferences }) => {
    setSubmitting(true);
    try {
      const { error } = await users.updateCurrent({ preferences });
      if (error) throw new Error(error);
      message.success('Your thrifting preferences have been saved!');
      onNext();
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const preferenceSections = [
    {
      title: "Clothing",
      key: "clothing",
      options: [
        { key: "mens", title: "Men's" },
        { key: "womens", title: "Women's" },
        { key: "childrens", title: "Children's"}
      ]
    },
    {
      title: "Types of Clothing",
      key: "typesOfClothing",
      options: [
        { key: "casual", title: "Casual" },
        { key: "formal", title: "Formal" },
        { key: "sportswear", title: "Sportswear" },
        { key: "vintage", title: "Vintage" }
      ]
    },
    {
      title: "Accessories",
      key: "accessories",
      options: [
        { key: "jewelry", title: "Jewelry" },
        { key: "watches", title: "Watches" },
        { key: "bags", title: "Bags" },
        { key: "scarves", title: "Scarves" }
      ]
    },
    {
      title: "Footwear",
      key: "footwear",
      options: [
        { key: "sneakers", title: "Sneakers" },
        { key: "dressShoes", title: "Dress Shoes" },
        { key: "boots", title: "Boots" },
        { key: "sandals", title: "Sandals" }
      ]
    },
    {
      title: "Home Goods",
      key: "homeGoods",
      options: [
        { key: "furniture", title: "Furniture" },
        { key: "decor", title: "Decor" },
        { key: "kitchenware", title: "Kitchenware" },
        { key: "linens", title: "Linens" }
      ]
    },
    {
      title: "Entertainment",
      key: "entertainment",
      options: [
        { key: "books", title: "Books" },
        { key: "games", title: "Games" },
        { key: "dvds", title: "DVDs" },
        { key: "vinylRecords", title: "Vinyl Records" },
        { key: "electronics", title: "Electronics" }
      ]
    },
    {
      title: "Toys & Hobbies",
      key: "toysAndHobbies",
      options: [
        { key: "actionFigures", title: "Action Figures" },
        { key: "puzzles", title: "Puzzles" },
        { key: "craftSupplies", title: "Craft Supplies" },
        { key: "musicalInstruments", title: "Musical Instruments" }
      ]
    },
    {
      title: "Outdoor & Sporting Goods",
      key: "outdoorAndSportingGoods",
      options: [
        { key: "campingEquipment", title: "Camping Equipment" },
        { key: "fitnessEquipment", title: "Fitness Equipment" },
        { key: "bicycles", title: "Bicycles" },
        { key: "waterSports", title: "Water Sports" }
      ]
    },
    {
      title: "Art & Collectibles",
      key: "artAndCollectibles",
      options: [
        { key: "paintings", title: "Paintings" },
        { key: "sculptures", title: "Sculptures" },
        { key: "vintageCollectibles", title: "Vintage Collectibles" },
        { key: "antiques", title: "Antiques" }
      ]
    },
    {
      title: "Beauty & Personal Care",
      key: "beautyAndPersonalCare",
      options: [
        { key: "skincareProducts", title: "Skincare Products" },
        { key: "makeup", title: "Makeup" },
        { key: "haircareProducts", title: "Haircare Products" },
        { key: "perfumes", title: "Perfumes" }
      ]
    },
  ];

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin size="large" style={{marginTop: 16}}/>
    </div>
  );

  return (
    <CardLayout title="Select Your Thrifting Domains">
      <Typography.Paragraph>
        Every Thrifter has their niches. What categories spark joy for you? This helps us match you with customers who love what you love.
      </Typography.Paragraph>
      <Form
        name="thrifter-onboarding-thrifting-preferences"
        onFinish={handleSubmit}
        initialValues={{
          preferences: currentUser?.preferences || {}
        }}
        onChange={() => setError('')}
      >
        <Row>
          {preferenceSections.map(({title, key, options}) => (
            <Col span={24} xl={12} xxl={8} key={key}>
              <Typography.Title level={5} style={{marginTop: 0}}>{title}</Typography.Title>
              <Form.Item name={['preferences', key]}>
                <Checkbox.Group
                  options={options.map(({ key: optionKey, title: optionTitle }) => ({ label: optionTitle, value: optionKey }))}
                />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="text" onClick={onPrev}>Back</Button>
            <Button type="primary" htmlType="submit" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </Form.Item>
        {error && <Alert message={error} type="error" />}
      </Form>
    </CardLayout>
  );
};

export default ThrifterOnboardingThriftingPreferences;
