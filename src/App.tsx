function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPageLayout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/post/:id" element={<PostView />} />
      </Routes>
    </Router>
  );
}
