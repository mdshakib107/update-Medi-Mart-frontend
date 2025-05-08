import BlogDetailsCard from "@/components/modules/blogs/BlogDetailsCard";
const blog = {
  id: "1",
  title: "The Rise of Quantum Computing",
  description:
    "Dive into the fascinating world of quantum computing, where traditional binary bits make way for qubits, unlocking unprecedented computational power. Explore the potential applications, challenges, and the race among tech giants to achieve quantum supremacy.",
  publish_date: "2025-03-01",
  author_name: "Mezbaul Abedin Persian",
  blog_image:
    "https://www.insights.onegiantleap.com/content/images/2023/10/Content-Hub-Blog---The-rise-of-quantum-computing.png",
  total_likes: "1200",
};

const BlogDetailsPage = () => {
  return (
    <div>
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
