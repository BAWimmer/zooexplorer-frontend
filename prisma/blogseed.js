const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing records first (optional)
  await prisma.blog.deleteMany({});

  const blogPosts = [
    {
      title: "Conservation Success: Saving Endangered Species",
      date: new Date("2023-03-15"),
      excerpt: "Learn how community efforts and conservation programs are saving endangered species from extinction. Discover inspiring stories and innovative solutions that are making a difference.",
      author: "Jane Smith",
      readTime: "5 min read",
      imageUrl: "/images/blog1.jpg",
      videoUrl: "https://www.youtube.com/embed/SMly_BDdJlk",
      technicalDetails: "This post aggregates data from environmental agencies and local wildlife research centers. Hover over the title for more info."
    },
    {
      title: "Zoo Updates: New Interactive Exhibits",
      date: new Date("2023-04-10"),
      excerpt: "Our zoo has recently launched new interactive exhibits designed to educate and entertain visitors. Get an inside look at the latest features and improvements.",
      author: "John Doe",
      readTime: "3 min read",
      imageUrl: "/images/blog2.jpg",
      videoUrl: "https://www.youtube.com/embed/rjBdwSow0hY",
      technicalDetails: "Exhibit design includes augmented reality components and interactive digital displays for enhanced visitor engagement."
    },
    {
      title: "Wildlife Education: Understanding Animal Behavior",
      date: new Date("2023-05-05"),
      excerpt: "Join us as we explore the fascinating world of animal behavior and the importance of wildlife education. Learn how these insights help in conservation efforts.",
      author: "Alice Johnson",
      readTime: "4 min read",
      imageUrl: "/images/blog3.jpg",
      videoUrl: "https://www.youtube.com/embed/_yQJDdzEbio",
      technicalDetails: "The analysis uses ethological studies and behavioral science research to explain observed phenomena in natural habitats."
    },
    {
      title: "Behind the Scenes: A Day in the Life of Zookeepers",
      date: new Date("2023-06-12"),
      excerpt: "What's it like to work with exotic animals every day? Follow our zookeepers as they care for various species and maintain their habitats.",
      author: "Michael Brown",
      readTime: "6 min read",
      imageUrl: "/images/blog4.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      technicalDetails: "This article includes interviews with staff and data collected over three months of observations."
    },
    {
      title: "Climate Change and Wildlife: Adapting to New Challenges",
      date: new Date("2023-07-20"),
      excerpt: "How is climate change affecting wildlife populations? Learn about adaptation strategies and what zoos are doing to help protect vulnerable species.",
      author: "Sarah Williams",
      readTime: "7 min read",
      imageUrl: "/images/blog5.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      secondaryVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      technicalDetails: "Based on research from climate scientists and wildlife conservation experts across five continents."
    }
  ];

  for (const blog of blogPosts) {
    await prisma.blog.create({
      data: blog
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });