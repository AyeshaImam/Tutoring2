// src/pages/CourseDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetail.css';

const CourseDetail = () => {
  const { courseName } = useParams();

  const courses = {
    'Computer Science': [
      { title: 'Cyber Security', description: 'Learn how to protect networks and systems from digital attacks. Expected hours: 40.' },
      { title: 'Information Security', description: 'Understand the principles of protecting sensitive data. Expected hours: 35.' },
      { title: 'Data Structures and Algorithms', description: 'Explore essential data structures and algorithms in programming. Expected hours: 50.' },
      { title: 'Java Programming', description: 'Master the Java programming language and its applications. Expected hours: 60.' },
      { title: 'Python Programming', description: 'Dive into Python and its various libraries and frameworks. Expected hours: 50.' },
      { title: 'React Programming', description: 'Learn to build dynamic web applications using React. Expected hours: 40.' },
      { title: 'C++ Programming', description: 'Get hands-on experience with C++ and its applications. Expected hours: 45.' },
      { title: 'Database Management', description: 'Understand database concepts and management systems. Expected hours: 30.' },
      { title: 'Web Development', description: 'Explore the fundamentals of building web applications. Expected hours: 50.' },
      { title: 'Software Engineering', description: 'Learn software development methodologies and project management. Expected hours: 60.' },
    ],
    'Biology': [
      { title: 'Organs', description: 'Study the structure and function of various organs in the body. Expected hours: 30.' },
      { title: 'Cells', description: 'Explore the building blocks of life and their functions. Expected hours: 25.' },
      { title: 'Genetics', description: 'Understand the principles of genetics and heredity. Expected hours: 35.' },
      { title: 'Molecular Biology', description: 'Dive into the molecular mechanisms of biological processes. Expected hours: 40.' },
      { title: 'Ecology', description: 'Study the interactions between organisms and their environments. Expected hours: 30.' },
      { title: 'Evolution', description: 'Understand the mechanisms of evolution and natural selection. Expected hours: 35.' },
      { title: 'Microbiology', description: 'Explore the world of microorganisms and their impact. Expected hours: 40.' },
      { title: 'Botany', description: 'Learn about plant biology and its significance. Expected hours: 30.' },
      { title: 'Zoology', description: 'Study animal biology and behavior. Expected hours: 35.' },
      { title: 'Human Anatomy', description: 'Understand the human body and its systems. Expected hours: 50.' },
    ],
    'Chemistry': [
      { title: 'Organic Chemistry', description: 'Study the structure, properties, and reactions of organic compounds. Expected hours: 50.' },
      { title: 'Inorganic Chemistry', description: 'Understand the properties and behavior of inorganic compounds. Expected hours: 40.' },
      { title: 'Physical Chemistry', description: 'Explore the physical properties of molecules and reactions. Expected hours: 45.' },
      { title: 'Analytical Chemistry', description: 'Learn techniques for analyzing substances. Expected hours: 35.' },
      { title: 'Biochemistry', description: 'Study the chemical processes within living organisms. Expected hours: 50.' },
      { title: 'Environmental Chemistry', description: 'Explore the chemistry of the environment and its effects. Expected hours: 40.' },
      { title: 'Industrial Chemistry', description: 'Learn about the chemical processes in industries. Expected hours: 45.' },
      { title: 'Chemistry Lab Techniques', description: 'Get hands-on experience with common lab techniques. Expected hours: 30.' },
      { title: 'Stoichiometry', description: 'Understand the quantitative relationships in chemical reactions. Expected hours: 30.' },
      { title: 'Thermodynamics', description: 'Study the laws of energy transfer in chemical reactions. Expected hours: 40.' },
    ],
    'Physics': [
      { title: 'Classical Mechanics', description: 'Understand the laws of motion and forces. Expected hours: 50.' },
      { title: 'Thermodynamics', description: 'Explore the principles of heat and energy transfer. Expected hours: 40.' },
      { title: 'Electromagnetism', description: 'Study electric and magnetic fields and their interactions. Expected hours: 50.' },
      { title: 'Quantum Physics', description: 'Dive into the world of quantum mechanics. Expected hours: 60.' },
      { title: 'Optics', description: 'Learn about the behavior of light and its applications. Expected hours: 30.' },
      { title: 'Astrophysics', description: 'Explore the physics of the universe and celestial bodies. Expected hours: 50.' },
      { title: 'Nuclear Physics', description: 'Understand the principles of atomic structure and radioactivity. Expected hours: 40.' },
      { title: 'Fluid Dynamics', description: 'Study the behavior of fluids in motion. Expected hours: 35.' },
      { title: 'Acoustics', description: 'Learn about sound waves and their properties. Expected hours: 30.' },
      { title: 'Relativity', description: 'Explore Einstein’s theories and their implications. Expected hours: 50.' },
    ],
    'Math': [
      { title: 'Algebra', description: 'Master the fundamentals of algebraic expressions and equations. Expected hours: 40.' },
      { title: 'Geometry', description: 'Explore the properties and relations of points, lines, surfaces, and solids. Expected hours: 35.' },
      { title: 'Calculus', description: 'Learn about derivatives and integrals and their applications. Expected hours: 50.' },
      { title: 'Statistics', description: 'Understand data analysis, interpretation, and presentation. Expected hours: 40.' },
      { title: 'Trigonometry', description: 'Study the relationships between the angles and sides of triangles. Expected hours: 35.' },
      { title: 'Discrete Mathematics', description: 'Explore topics in logic, set theory, and combinatorics. Expected hours: 40.' },
      { title: 'Linear Algebra', description: 'Learn about vector spaces and linear transformations. Expected hours: 45.' },
      { title: 'Number Theory', description: 'Study properties and relationships of numbers. Expected hours: 40.' },
      { title: 'Mathematical Reasoning', description: 'Develop skills in logical reasoning and proof techniques. Expected hours: 30.' },
      { title: 'Applied Mathematics', description: 'Learn to apply mathematical principles to real-world problems. Expected hours: 50.' },
    ],
    'Psychology': [
      { title: 'Cognitive Psychology', description: 'Explore the mental processes of perception, memory, and learning. Expected hours: 35.' },
      { title: 'Developmental Psychology', description: 'Study the psychological changes throughout the lifespan. Expected hours: 30.' },
      { title: 'Social Psychology', description: 'Understand how individuals influence and are influenced by others. Expected hours: 40.' },
      { title: 'Clinical Psychology', description: 'Learn about psychological disorders and their treatment. Expected hours: 50.' },
      { title: 'Behavioral Psychology', description: 'Study the relationship between behavior and environment. Expected hours: 40.' },
      { title: 'Neuropsychology', description: 'Explore the relationship between brain function and behavior. Expected hours: 45.' },
      { title: 'Educational Psychology', description: 'Learn about learning processes and educational practices. Expected hours: 30.' },
      { title: 'Industrial-Organizational Psychology', description: 'Study psychology in the workplace. Expected hours: 35.' },
      { title: 'Forensic Psychology', description: 'Understand psychological principles in the legal system. Expected hours: 40.' },
      { title: 'Health Psychology', description: 'Explore the psychological aspects of health and illness. Expected hours: 50.' },
    ],
    'Geography': [
      { title: 'Physical Geography', description: 'Study the natural features of the Earth’s surface. Expected hours: 30.' },
      { title: 'Human Geography', description: 'Explore the relationship between humans and their environment. Expected hours: 35.' },
      { title: 'Geographic Information Systems', description: 'Learn about spatial data and mapping technologies. Expected hours: 40.' },
      { title: 'Cultural Geography', description: 'Study the impact of culture on geographical landscapes. Expected hours: 35.' },
      { title: 'Urban Geography', description: 'Explore the development and structure of urban areas. Expected hours: 30.' },
      { title: 'Environmental Geography', description: 'Understand the interaction between humans and the environment. Expected hours: 40.' },
      { title: 'Political Geography', description: 'Study the relationship between geography and political processes. Expected hours: 35.' },
      { title: 'Economic Geography', description: 'Explore the spatial aspects of economic activities. Expected hours: 40.' },
      { title: 'Globalization', description: 'Understand the effects of globalization on geography. Expected hours: 35.' },
      { title: 'Geospatial Analysis', description: 'Learn techniques for analyzing spatial data. Expected hours: 45.' },
    ],
    'Art': [
      { title: 'History of Art', description: 'Explore the evolution of art across different cultures and periods. Expected hours: 30.' },
      { title: 'Painting Techniques', description: 'Learn various painting styles and methods. Expected hours: 35.' },
      { title: 'Sculpture', description: 'Study the principles and techniques of sculpting. Expected hours: 40.' },
      { title: 'Digital Art', description: 'Explore the use of technology in art creation. Expected hours: 35.' },
      { title: 'Graphic Design', description: 'Learn the fundamentals of graphic design principles. Expected hours: 40.' },
      { title: 'Photography', description: 'Understand the art and technique of photography. Expected hours: 30.' },
      { title: 'Art Criticism', description: 'Develop skills in analyzing and critiquing art. Expected hours: 35.' },
      { title: 'Contemporary Art', description: 'Explore the themes and practices in contemporary art. Expected hours: 40.' },
      { title: 'Art Therapy', description: 'Learn about the therapeutic uses of art. Expected hours: 30.' },
      { title: 'Art and Society', description: 'Understand the role of art in social and cultural contexts. Expected hours: 35.' },
    ],
    'Business': [
      { title: 'Introduction to Business', description: 'Understand the fundamentals of business operations. Expected hours: 40.' },
      { title: 'Marketing Principles', description: 'Explore basic marketing concepts and strategies. Expected hours: 35.' },
      { title: 'Accounting Basics', description: 'Learn the principles of accounting and financial reporting. Expected hours: 50.' },
      { title: 'Business Law', description: 'Understand the legal aspects of business operations. Expected hours: 45.' },
      { title: 'Management Principles', description: 'Study the principles of effective management. Expected hours: 40.' },
      { title: 'Entrepreneurship', description: 'Learn how to start and manage a business. Expected hours: 50.' },
      { title: 'Human Resources', description: 'Explore the management of human resources in organizations. Expected hours: 45.' },
      { title: 'Operations Management', description: 'Understand the processes behind efficient business operations. Expected hours: 40.' },
      { title: 'Finance for Non-Financial Managers', description: 'Learn financial principles relevant to managers. Expected hours: 30.' },
      { title: 'Business Ethics', description: 'Study ethical principles in business practices. Expected hours: 35.' },
    ],
    'History': [
      { title: 'Ancient Civilizations', description: 'Explore the development of ancient societies and their impact on the modern world. Expected hours: 40.' },
      { title: 'Middle Ages', description: 'Study the events and themes of the medieval period. Expected hours: 45.' },
      { title: 'Modern History', description: 'Understand the changes in the world from the 18th century to present. Expected hours: 50.' },
      { title: 'World Wars', description: 'Analyze the causes and effects of the World Wars. Expected hours: 55.' },
      { title: 'Cold War', description: 'Examine the political tensions and conflicts during the Cold War era. Expected hours: 50.' },
      { title: 'American History', description: 'Study the history of the United States and its impact on the world. Expected hours: 40.' },
      { title: 'Cultural History', description: 'Explore the evolution of culture and its societal impacts. Expected hours: 35.' },
      { title: 'Economic History', description: 'Understand the development of economies through time. Expected hours: 40.' },
      { title: 'Social Movements', description: 'Study major social movements and their impact on society. Expected hours: 45.' },
      { title: 'Historical Research Methods', description: 'Learn how to conduct historical research and analysis. Expected hours: 30.' },
    ],
    'Environmental Science': [
      { title: 'Ecosystems', description: 'Explore the various ecosystems and their components. Expected hours: 40.' },
      { title: 'Biodiversity', description: 'Study the importance and variety of life forms on Earth. Expected hours: 35.' },
      { title: 'Environmental Policies', description: 'Understand policies aimed at protecting the environment. Expected hours: 30.' },
      { title: 'Sustainability', description: 'Learn practices that promote sustainability and environmental health. Expected hours: 45.' },
      { title: 'Climate Change', description: 'Examine the science and impact of climate change. Expected hours: 50.' },
      { title: 'Natural Resources', description: 'Study the management and conservation of natural resources. Expected hours: 40.' },
      { title: 'Environmental Ethics', description: 'Explore ethical considerations in environmental issues. Expected hours: 35.' },
      { title: 'Pollution', description: 'Understand the sources and effects of pollution on the environment. Expected hours: 30.' },
      { title: 'Conservation Biology', description: 'Learn strategies for conserving biological diversity. Expected hours: 50.' },
      { title: 'Field Studies', description: 'Conduct field studies to observe environmental phenomena. Expected hours: 45.' },
    ],
    'Statistics': [
      { title: 'Descriptive Statistics', description: 'Learn techniques for summarizing data. Expected hours: 30.' },
      { title: 'Inferential Statistics', description: 'Explore methods for making predictions based on data samples. Expected hours: 40.' },
      { title: 'Probability Theory', description: 'Understand the principles of probability. Expected hours: 35.' },
      { title: 'Regression Analysis', description: 'Study relationships between variables through regression techniques. Expected hours: 45.' },
      { title: 'Hypothesis Testing', description: 'Learn how to test hypotheses in statistical research. Expected hours: 50.' },
      { title: 'Statistical Software', description: 'Get hands-on experience with statistical software tools. Expected hours: 30.' },
      { title: 'Sampling Methods', description: 'Understand techniques for selecting samples from populations. Expected hours: 40.' },
      { title: 'Data Visualization', description: 'Explore methods for visualizing data effectively. Expected hours: 35.' },
      { title: 'Time Series Analysis', description: 'Study how to analyze data collected over time. Expected hours: 45.' },
      { title: 'Statistical Consulting', description: 'Learn how to provide statistical advice and support. Expected hours: 50.' },
    ],
  };

  const courseDetails = courses[courseName] || [];

  const handleEnroll = (courseTitle) => {
    console.log(`Enrolling in ${courseTitle}`);
  };

  return (
    <div className="course-detail-container">
      <div className="course-detail-header">
        <h1>{courseName}</h1>
        <p className="course-detail-subtitle">
          Master the fundamentals and advanced concepts with our comprehensive curriculum
        </p>
      </div>

      <div className="course-topics-container">
        <h2>Available Topics</h2>
        <div className="topics-grid">
          {courseDetails.map((subtopic, index) => (
            <div key={index} className="topic-card">
              <div className="topic-content">
                <h3>{subtopic.title}</h3>
                <div className="topic-details">
                  <p>{subtopic.description}</p>
                  <div className="topic-meta">
                    <span className="duration">
                      <i className="far fa-clock"></i>
                      {subtopic.description.match(/Expected hours: (\d+)/)[1]} Hours
                    </span>
                  </div>
                </div>
              </div>
              <button 
                className="enroll-button" 
                onClick={() => handleEnroll(subtopic.title)}
              >
                Enroll Now
                <span className="button-icon">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
