import React from 'react';
import { Typography, Layout } from 'antd';
const { Title, Paragraph } = Typography;

function LandingPage() {
  return (
    <>
      <Layout.Content className="md:container md:mx-auto m-5">
        <Title>Welcome to Harris Family Designs</Title>
        <Paragraph>
          Crafting Beauty, From Wear to Web - The Harris Family Touch
        </Paragraph>

        <section id="about">
          <Title level={2}>About Us</Title>
          <Paragraph>
            Welcome to Harris Family Designs, where every item tells a story of transformation and every service is infused
            with a personal touch. From the heart of thrift culture, we curate and revitalize clothing and furniture, breathing
            new life into forgotten treasures. Our journey doesn't stop at tangible goods; it extends into the celebration of
            life's moments with bespoke event floral designs and into the digital realm through comprehensive web development
            solutions. At Harris Family Designs, we're not just a business; we're a family that grows with every project and
            every client. Discover the magic of reinvention with us, where your vision meets our creativity.
          </Paragraph>
        </section>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        Contact us at info@harrisfamilydesigns.com
      </Layout.Footer>
    </>
  );
}

export default LandingPage;
