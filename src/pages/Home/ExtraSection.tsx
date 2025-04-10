import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { useEffect } from 'react';

// Testimonial Data
const testimonials = [
  {
    id: 1,
    name: 'Hasan Mahadi',
    role: 'Book Club Founder',
    content:
      'The collection is phenomenal! Found first editions I thought were lost forever. Shipping was faster than my local bookstore.',
    avatar: 'https://i.postimg.cc/WbXbkjvb/image.png',
    rating: 5,
  },
  {
    id: 2,
    name: 'Hasan Mahadi',
    role: 'University Professor',
    content:
      'My rare academic references arrived in perfect condition. The authentication certificates gave me complete peace of mind.',
    avatar: 'https://i.postimg.cc/WbXbkjvb/image.png',
    rating: 4,
  },
  {
    id: 3,
    name: 'Hasan Mahadi',
    role: 'Literary Blogger',
    content:
      'Their limited edition releases are stunning. The packaging feels like unwrapping a precious gift every single time.',
    avatar: 'https://i.postimg.cc/WbXbkjvb/image.png',
    rating: 3,
  },
];

// Blog Data
const blogPosts = [
  {
    id: 1,
    title: 'The Art of Collecting First Editions',
    excerpt:
      'Learn how to identify and preserve valuable first edition books in your personal collection.',
    image:
      'https://media.istockphoto.com/id/1336651648/photo/close-up-of-a-young-person-studying-science-topic-about-robotics-at-home-student-is-working.jpg?s=2048x2048&w=is&k=20&c=gR1gti0EQCvqwyzd9lUDUSUjIkon2cRhDsmneILRZs8=',
    date: 'May 15, 2023',
    category: 'Collecting',
  },
  {
    id: 2,
    title: 'Digital vs Physical: The Future of Reading',
    excerpt:
      'Exploring how traditional bookshops are adapting in the digital age while maintaining their charm.',
    image:
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'June 2, 2023',
    category: 'Industry',
  },
  {
    id: 3,
    title: 'Behind the Scenes: Our Book Restoration Process',
    excerpt:
      'A detailed look at how we breathe new life into antique and damaged books.',
    image:
      'https://images.pexels.com/photos/19975716/pexels-photo-19975716/free-photo-of-fingers-on-open-book.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'April 28, 2023',
    category: 'Process',
  },
];

// Styled Components
const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
}));

const TestimonialCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },
});

const BlogCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  minHeight: 300,
  overflow: 'hidden',
  '&:hover .blog-image': {
    transform: 'scale(1.05)',
  },
  '& .blog-content': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(0,0,0,0.7)',
    color: '#fff',
    padding: theme.spacing(3),
  },
}));

const EcommerceExtras = () => {
  useEffect(() => {
    AOS.init({ duration: 4000 });
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      {/* Testimonials Section */}
      <Box sx={{ mb: 10 }}>
        <Typography
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{ fontWeight: 700 }}
        >
          What Our Customers Say
        </Typography>
        <Typography
          data-aos="flip-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="dark:text-white"
          variant="subtitle1"
          color="text.secondary "
          align="center"
          sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
        >
          Trusted by bibliophiles, collectors, and casual readers alike
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
                <Typography paragraph sx={{ mb: 2 }}>
                  "{testimonial.content}"
                </Typography>
                <Box display="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Box key={i} component="span" sx={{ color: '#ffc107' }}>
                      ★
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </TestimonialCard>
          ))}
        </Box>
      </Box>

      {/* Blog Section */}
      <GradientBox sx={{ p: 6, mb: 10 }}>
        <Typography
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="dark:text-black"
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{ fontWeight: 700 }}
        >
          From Our Blog
        </Typography>
        <Typography
          data-aos="flip-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          variant="subtitle1"
          color="text.secondary"
          align="center"
          sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
        >
          Insights, stories, and expert advice for book lovers
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}
            >
              <Box
                className="blog-image"
                component="img"
                src={post.image}
                alt={post.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s',
                }}
              />
              <Box className="blog-content">
                <Typography
                  variant="overline"
                  color="primary.light"
                  gutterBottom
                >
                  {post.category} • {post.date}
                </Typography>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {post.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {post.excerpt}
                </Typography>
                <Typography
                  variant="button"
                  color="primary.light"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  <Link to="blogs"> Read More → </Link>
                </Typography>
              </Box>
            </BlogCard>
          ))}
        </Box>
      </GradientBox>

      {/* Newsletter CTA */}
      <Box
        sx={{
          backgroundColor: '#1f2937',
          color: '#fff',
          borderRadius: 2,
          p: 6,
          textAlign: 'center',
        }}
      >
        <Typography
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          variant="h4"
          component="h3"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Join Our Literary Community
        </Typography>
        <Typography
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          variant="subtitle1"
          sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
        >
          Get exclusive access to rare finds, special editions, and members-only
          events
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            maxWidth: 500,
            mx: 'auto',
            '& .MuiInputBase-root': {
              backgroundColor: '#fff',
              borderRadius: '4px 0 0 4px',
            },
          }}
        >
          <Box
            component="input"
            placeholder="Your email address"
            sx={{
              flexGrow: 1,
              border: 'none',
              padding: '12px 16px',
              fontSize: '1rem',
              outline: 'none',
            }}
          />

          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#1f2937', // Tailwind's bg-gray-800
              color: '#fff',
              borderRadius: '0 4px 4px 0',
              px: 4,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#374151', // Tailwind's bg-gray-700 for hover effect
              },
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EcommerceExtras;
