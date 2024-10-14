export const metadata = {
  title: 'Harris Family Designs',
  description: 'Harris Family Designs',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}

export default RootLayout;
