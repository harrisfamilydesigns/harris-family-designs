import './App.css'

function App() {
  return (
    <>
      <header>
          <h1>Welcome to Harris Family Designs</h1>
          <p>Crafting Beauty, From Wear to Web - The Harris Family Touch</p>
      </header>

      <nav>
          <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#products">Our Products</a></li>
              <li><a href="#contact">Contact</a></li>
          </ul>
      </nav>

      <section id="about">
          <h2>About Us</h2>
          <p>
            {`Welcome to Harris Family Designs, where every item tells a story of transformation and every service is infused
            with a personal touch. From the heart of thrift culture, we curate and revitalize clothing and furniture, breathing
            new life into forgotten treasures. Our journey doesn't stop at tangible goods; it extends into the celebration of
            life's moments with bespoke event floral designs and into the digital realm through comprehensive web development
            solutions. At Harris Family Designs, we're not just a business; we're a family that grows with every project and
            every client. Discover the magic of reinvention with us, where your vision meets our creativity.`}
          </p>
      </section>

      <section id="products">
          <h2>Our Products</h2>
          <div className="product-grid">
              {/* Product items will be added here */}
          </div>
      </section>

      <footer>
          <p>Contact us at info@harrisfamilydesigns.com</p>
      </footer>
    </>
  )
}

export default App
