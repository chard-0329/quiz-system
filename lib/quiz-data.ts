export interface Question {
  id: string
  text: string
  options: string[]
  correctIndex: number
}

export interface Quiz {
  id: string
  title: string
  description: string
  categoryId: string
  difficulty: "easy" | "medium" | "hard"
  questionCount: number
  timePerQuestion: number // in seconds
  questions: Question[]
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string // lucide icon name
  quizCount: number
  color: string
}

export interface QuizAttempt {
  quizId: string
  quizTitle: string
  categoryId: string
  score: number
  totalQuestions: number
  percentage: number
  completedAt: string
  timeTaken: number // in seconds
}

export interface UserProfile {
  id: string
  name: string
  avatar: string
  totalQuizzes: number
  totalScore: number
  averageScore: number
  streak: number
  joinedAt: string
  attempts: QuizAttempt[]
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  avatar: string
  totalScore: number
  quizzesCompleted: number
  averageScore: number
  acedCount: number
}

export const categories: Category[] = [
  {
    id: "science",
    name: "Science",
    description: "Explore the wonders of physics, chemistry, and biology",
    icon: "Atom",
    quizCount: 3,
    color: "hsl(220, 72%, 50%)",
  },
  {
    id: "history",
    name: "History",
    description: "Journey through the ages and test your knowledge of the past",
    icon: "Landmark",
    quizCount: 3,
    color: "hsl(38, 92%, 50%)",
  },
  {
    id: "technology",
    name: "Technology",
    description: "From coding to gadgets, how tech-savvy are you?",
    icon: "Cpu",
    quizCount: 3,
    color: "hsl(152, 60%, 42%)",
  },
  {
    id: "geography",
    name: "Geography",
    description: "Navigate the world and test your geographical knowledge",
    icon: "Globe",
    quizCount: 3,
    color: "hsl(280, 65%, 55%)",
  },
  {
    id: "literature",
    name: "Literature",
    description: "Dive into the world of books, authors, and literary classics",
    icon: "BookOpen",
    quizCount: 3,
    color: "hsl(340, 75%, 55%)",
  },
  {
    id: "sports",
    name: "Sports",
    description: "From football to swimming, prove your sports expertise",
    icon: "Trophy",
    quizCount: 3,
    color: "hsl(12, 76%, 55%)",
  },
]

export const quizzes: Quiz[] = [
  // Science Quizzes
  {
    id: "sci-basics",
    title: "Science Fundamentals",
    description: "Test your understanding of basic scientific concepts",
    categoryId: "science",
    difficulty: "easy",
    questionCount: 5,
    timePerQuestion: 20,
    questions: [
      { id: "s1", text: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "O2"], correctIndex: 0 },
      { id: "s2", text: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctIndex: 1 },
      { id: "s3", text: "What is the speed of light approximately?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correctIndex: 0 },
      { id: "s4", text: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctIndex: 2 },
      { id: "s5", text: "How many bones are in the adult human body?", options: ["186", "206", "226", "256"], correctIndex: 1 },
    ],
  },
  {
    id: "sci-physics",
    title: "Physics Challenges",
    description: "Put your physics knowledge to the test",
    categoryId: "science",
    difficulty: "medium",
    questionCount: 5,
    timePerQuestion: 25,
    questions: [
      { id: "p1", text: "What is Newton's second law of motion?", options: ["F = ma", "E = mc^2", "PV = nRT", "V = IR"], correctIndex: 0 },
      { id: "p2", text: "What is the unit of electrical resistance?", options: ["Volt", "Ampere", "Ohm", "Watt"], correctIndex: 2 },
      { id: "p3", text: "Which particle has a positive charge?", options: ["Electron", "Neutron", "Proton", "Photon"], correctIndex: 2 },
      { id: "p4", text: "What is the SI unit of force?", options: ["Joule", "Newton", "Pascal", "Watt"], correctIndex: 1 },
      { id: "p5", text: "What type of energy is stored in a stretched rubber band?", options: ["Kinetic", "Thermal", "Elastic Potential", "Chemical"], correctIndex: 2 },
    ],
  },
  {
    id: "sci-advanced",
    title: "Advanced Science",
    description: "Only for true science enthusiasts",
    categoryId: "science",
    difficulty: "hard",
    questionCount: 5,
    timePerQuestion: 30,
    questions: [
      { id: "a1", text: "What is the Heisenberg Uncertainty Principle about?", options: ["Energy conservation", "Position and momentum", "Wave-particle duality", "Quantum entanglement"], correctIndex: 1 },
      { id: "a2", text: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"], correctIndex: 2 },
      { id: "a3", text: "What is the most abundant element in the universe?", options: ["Oxygen", "Carbon", "Helium", "Hydrogen"], correctIndex: 3 },
      { id: "a4", text: "What is Avogadro's number approximately?", options: ["6.022 x 10^23", "3.14 x 10^15", "1.602 x 10^-19", "9.81 x 10^10"], correctIndex: 0 },
      { id: "a5", text: "Which force is responsible for radioactive decay?", options: ["Gravitational", "Electromagnetic", "Strong nuclear", "Weak nuclear"], correctIndex: 3 },
    ],
  },
  // History Quizzes
  {
    id: "hist-world",
    title: "World History Basics",
    description: "Essential world history knowledge",
    categoryId: "history",
    difficulty: "easy",
    questionCount: 5,
    timePerQuestion: 20,
    questions: [
      { id: "h1", text: "In which year did World War II end?", options: ["1943", "1944", "1945", "1946"], correctIndex: 2 },
      { id: "h2", text: "Who was the first President of the United States?", options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"], correctIndex: 1 },
      { id: "h3", text: "Which ancient civilization built the pyramids?", options: ["Roman", "Greek", "Egyptian", "Mesopotamian"], correctIndex: 2 },
      { id: "h4", text: "What was the Renaissance?", options: ["A war", "A cultural rebirth", "A disease", "A dynasty"], correctIndex: 1 },
      { id: "h5", text: "Who wrote the Declaration of Independence?", options: ["Ben Franklin", "George Washington", "Thomas Jefferson", "John Adams"], correctIndex: 2 },
    ],
  },
  {
    id: "hist-ancient",
    title: "Ancient Civilizations",
    description: "Journey into the ancient world",
    categoryId: "history",
    difficulty: "medium",
    questionCount: 5,
    timePerQuestion: 25,
    questions: [
      { id: "ha1", text: "What was the capital of the Roman Empire?", options: ["Athens", "Rome", "Constantinople", "Alexandria"], correctIndex: 1 },
      { id: "ha2", text: "Who was the first Emperor of China?", options: ["Qin Shi Huang", "Kublai Khan", "Sun Tzu", "Confucius"], correctIndex: 0 },
      { id: "ha3", text: "Which river was essential to Ancient Egypt?", options: ["Tigris", "Euphrates", "Nile", "Ganges"], correctIndex: 2 },
      { id: "ha4", text: "What was the Greek city-state known for its military?", options: ["Athens", "Corinth", "Thebes", "Sparta"], correctIndex: 3 },
      { id: "ha5", text: "Who was Alexander the Great's teacher?", options: ["Socrates", "Plato", "Aristotle", "Homer"], correctIndex: 2 },
    ],
  },
  {
    id: "hist-modern",
    title: "Modern History",
    description: "Events that shaped the modern world",
    categoryId: "history",
    difficulty: "hard",
    questionCount: 5,
    timePerQuestion: 30,
    questions: [
      { id: "hm1", text: "What treaty ended World War I?", options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Vienna", "Treaty of Ghent"], correctIndex: 1 },
      { id: "hm2", text: "When did the Berlin Wall fall?", options: ["1987", "1988", "1989", "1990"], correctIndex: 2 },
      { id: "hm3", text: "Who led India's independence movement?", options: ["Jawaharlal Nehru", "Subhas Chandra Bose", "Mahatma Gandhi", "Bhagat Singh"], correctIndex: 2 },
      { id: "hm4", text: "What was the Cold War primarily between?", options: ["UK and France", "USA and USSR", "China and Japan", "Germany and Italy"], correctIndex: 1 },
      { id: "hm5", text: "In what year was the United Nations established?", options: ["1942", "1945", "1948", "1950"], correctIndex: 1 },
    ],
  },
  // Technology Quizzes
  {
    id: "tech-basics",
    title: "Tech Fundamentals",
    description: "Basic technology concepts everyone should know",
    categoryId: "technology",
    difficulty: "easy",
    questionCount: 5,
    timePerQuestion: 20,
    questions: [
      { id: "t1", text: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correctIndex: 0 },
      { id: "t2", text: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Central Power Unit"], correctIndex: 0 },
      { id: "t3", text: "What is the main function of RAM?", options: ["Store files permanently", "Temporary data storage", "Connect to internet", "Display graphics"], correctIndex: 1 },
      { id: "t4", text: "Who co-founded Apple Inc.?", options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Jeff Bezos"], correctIndex: 1 },
      { id: "t5", text: "What does URL stand for?", options: ["Uniform Resource Locator", "Universal Reference Link", "Unified Resource Library", "Upload Resource Location"], correctIndex: 0 },
    ],
  },
  {
    id: "tech-programming",
    title: "Programming 101",
    description: "Test your programming knowledge",
    categoryId: "technology",
    difficulty: "medium",
    questionCount: 5,
    timePerQuestion: 25,
    questions: [
      { id: "tp1", text: "Which language is primarily used for web styling?", options: ["JavaScript", "Python", "CSS", "Java"], correctIndex: 2 },
      { id: "tp2", text: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Interface", "Application Process Integration"], correctIndex: 0 },
      { id: "tp3", text: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], correctIndex: 1 },
      { id: "tp4", text: "What is Git primarily used for?", options: ["Web hosting", "Version control", "Database management", "Testing"], correctIndex: 1 },
      { id: "tp5", text: "What does SQL stand for?", options: ["Simple Query Language", "Structured Question Language", "Structured Query Language", "Standard Query Logic"], correctIndex: 2 },
    ],
  },
  {
    id: "tech-ai",
    title: "AI & Machine Learning",
    description: "How much do you know about artificial intelligence?",
    categoryId: "technology",
    difficulty: "hard",
    questionCount: 5,
    timePerQuestion: 30,
    questions: [
      { id: "tai1", text: "What is a neural network inspired by?", options: ["Computer circuits", "Human brain", "Internet topology", "Solar systems"], correctIndex: 1 },
      { id: "tai2", text: "What does GPT stand for?", options: ["General Purpose Technology", "Generative Pre-trained Transformer", "Graphical Processing Tool", "Global Pattern Tracking"], correctIndex: 1 },
      { id: "tai3", text: "What is overfitting in machine learning?", options: ["Model too simple", "Model memorizes training data", "Model runs too fast", "Model uses too little data"], correctIndex: 1 },
      { id: "tai4", text: "Which algorithm is used for classification?", options: ["K-means", "Linear regression", "Decision tree", "PCA"], correctIndex: 2 },
      { id: "tai5", text: "What is reinforcement learning based on?", options: ["Supervised labels", "Unsupervised clustering", "Reward and punishment", "Data augmentation"], correctIndex: 2 },
    ],
  },
  // Geography Quizzes
  {
    id: "geo-world",
    title: "World Geography",
    description: "How well do you know our planet?",
    categoryId: "geography",
    difficulty: "easy",
    questionCount: 5,
    timePerQuestion: 20,
    questions: [
      { id: "g1", text: "What is the largest continent?", options: ["Africa", "North America", "Asia", "Europe"], correctIndex: 2 },
      { id: "g2", text: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], correctIndex: 1 },
      { id: "g3", text: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], correctIndex: 2 },
      { id: "g4", text: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctIndex: 3 },
      { id: "g5", text: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], correctIndex: 1 },
    ],
  },
  {
    id: "geo-capitals",
    title: "Capital Cities",
    description: "Match the capital to its country",
    categoryId: "geography",
    difficulty: "medium",
    questionCount: 5,
    timePerQuestion: 20,
    questions: [
      { id: "gc1", text: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correctIndex: 2 },
      { id: "gc2", text: "What is the capital of Brazil?", options: ["Rio de Janeiro", "Sao Paulo", "Brasilia", "Salvador"], correctIndex: 2 },
      { id: "gc3", text: "What is the capital of Turkey?", options: ["Istanbul", "Ankara", "Izmir", "Antalya"], correctIndex: 1 },
      { id: "gc4", text: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Montreal", "Ottawa"], correctIndex: 3 },
      { id: "gc5", text: "What is the capital of Myanmar?", options: ["Yangon", "Mandalay", "Naypyidaw", "Bago"], correctIndex: 2 },
    ],
  },
  {
    id: "geo-extreme",
    title: "Extreme Geography",
    description: "The toughest geography questions",
    categoryId: "geography",
    difficulty: "hard",
    questionCount: 5,
    timePerQuestion: 30,
    questions: [
      { id: "ge1", text: "What is the driest desert in the world?", options: ["Sahara", "Gobi", "Atacama", "Antarctic"], correctIndex: 2 },
      { id: "ge2", text: "Which country has the most time zones?", options: ["Russia", "USA", "France", "China"], correctIndex: 2 },
      { id: "ge3", text: "What is the deepest point in the ocean?", options: ["Tonga Trench", "Mariana Trench", "Java Trench", "Puerto Rico Trench"], correctIndex: 1 },
      { id: "ge4", text: "Which strait separates Europe from Africa?", options: ["Bosphorus", "Malacca", "Gibraltar", "Hormuz"], correctIndex: 2 },
      { id: "ge5", text: "What is the highest waterfall in the world?", options: ["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"], correctIndex: 2 },
    ],
  },
  // Literature Quizzes
  {
    id: "lit-classics",
    title: "Classic Literature",
    description: "Test your knowledge of literary classics",
    categoryId: "literature",
    difficulty: "easy",
    questionCount: 5,
    timePerQuestion: 20,
    questions: [
      { id: "l1", text: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correctIndex: 1 },
      { id: "l2", text: "What is the first book of the Harry Potter series?", options: ["Chamber of Secrets", "Prisoner of Azkaban", "Philosopher's Stone", "Goblet of Fire"], correctIndex: 2 },
      { id: "l3", text: "Who wrote '1984'?", options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"], correctIndex: 1 },
      { id: "l4", text: "What is the name of the hobbit in 'Lord of the Rings'?", options: ["Gandalf", "Aragorn", "Frodo", "Legolas"], correctIndex: 2 },
      { id: "l5", text: "Who wrote 'Pride and Prejudice'?", options: ["Charlotte Bronte", "Emily Bronte", "Jane Austen", "Mary Shelley"], correctIndex: 2 },
    ],
  },
  {
    id: "lit-authors",
    title: "Famous Authors",
    description: "Can you match the author to their work?",
    categoryId: "literature",
    difficulty: "medium",
    questionCount: 5,
    timePerQuestion: 25,
    questions: [
      { id: "la1", text: "Who wrote 'The Great Gatsby'?", options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"], correctIndex: 1 },
      { id: "la2", text: "Who authored 'One Hundred Years of Solitude'?", options: ["Pablo Neruda", "Isabel Allende", "Gabriel Garcia Marquez", "Mario Vargas Llosa"], correctIndex: 2 },
      { id: "la3", text: "Who wrote 'The Odyssey'?", options: ["Virgil", "Sophocles", "Homer", "Euripides"], correctIndex: 2 },
      { id: "la4", text: "Who is the author of 'Don Quixote'?", options: ["Miguel de Cervantes", "Federico Garcia Lorca", "Jorge Luis Borges", "Gabriel Garcia Marquez"], correctIndex: 0 },
      { id: "la5", text: "Who wrote 'War and Peace'?", options: ["Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Ivan Turgenev"], correctIndex: 1 },
    ],
  },
  {
    id: "lit-modern",
    title: "Modern Literature",
    description: "Contemporary literary masterpieces",
    categoryId: "literature",
    difficulty: "hard",
    questionCount: 5,
    timePerQuestion: 30,
    questions: [
      { id: "lm1", text: "Who wrote 'Beloved'?", options: ["Alice Walker", "Toni Morrison", "Maya Angelou", "Zora Neale Hurston"], correctIndex: 1 },
      { id: "lm2", text: "What year was 'The Catcher in the Rye' published?", options: ["1945", "1949", "1951", "1955"], correctIndex: 2 },
      { id: "lm3", text: "Who authored 'Norwegian Wood'?", options: ["Haruki Murakami", "Yukio Mishima", "Kazuo Ishiguro", "Banana Yoshimoto"], correctIndex: 0 },
      { id: "lm4", text: "Which novel features the character Atticus Finch?", options: ["The Color Purple", "To Kill a Mockingbird", "Of Mice and Men", "East of Eden"], correctIndex: 1 },
      { id: "lm5", text: "Who wrote 'Slaughterhouse-Five'?", options: ["Joseph Heller", "Kurt Vonnegut", "Norman Mailer", "Thomas Pynchon"], correctIndex: 1 },
    ],
  },
  // Sports Quizzes
  {
    id: "sports-general",
    title: "General Sports",
    description: "A mix of sports trivia for everyone",
    categoryId: "sports",
    difficulty: "easy",
    questionCount: 5,
    timePerQuestion: 20,
    questions: [
      { id: "sp1", text: "How many players are on a basketball team on the court?", options: ["4", "5", "6", "7"], correctIndex: 1 },
      { id: "sp2", text: "Which sport is played at Wimbledon?", options: ["Golf", "Cricket", "Tennis", "Polo"], correctIndex: 2 },
      { id: "sp3", text: "How many rings are on the Olympic flag?", options: ["4", "5", "6", "7"], correctIndex: 1 },
      { id: "sp4", text: "In which sport can you score a 'hole-in-one'?", options: ["Tennis", "Basketball", "Golf", "Baseball"], correctIndex: 2 },
      { id: "sp5", text: "What is the national sport of Japan?", options: ["Karate", "Judo", "Sumo Wrestling", "Baseball"], correctIndex: 2 },
    ],
  },
  {
    id: "sports-football",
    title: "Football Knowledge",
    description: "Test your football (soccer) expertise",
    categoryId: "sports",
    difficulty: "medium",
    questionCount: 5,
    timePerQuestion: 25,
    questions: [
      { id: "sf1", text: "Which country has won the most FIFA World Cups?", options: ["Germany", "Argentina", "Brazil", "Italy"], correctIndex: 2 },
      { id: "sf2", text: "How long is a standard football match?", options: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"], correctIndex: 1 },
      { id: "sf3", text: "What is the maximum number of substitutions in a match?", options: ["3", "4", "5", "6"], correctIndex: 2 },
      { id: "sf4", text: "Where was the 2022 FIFA World Cup held?", options: ["Russia", "Brazil", "Qatar", "Japan"], correctIndex: 2 },
      { id: "sf5", text: "Who holds the record for most Ballon d'Or awards?", options: ["Cristiano Ronaldo", "Lionel Messi", "Johan Cruyff", "Michel Platini"], correctIndex: 1 },
    ],
  },
  {
    id: "sports-olympics",
    title: "Olympic Legends",
    description: "How well do you know the Olympics?",
    categoryId: "sports",
    difficulty: "hard",
    questionCount: 5,
    timePerQuestion: 30,
    questions: [
      { id: "so1", text: "Where were the first modern Olympic Games held?", options: ["Paris", "London", "Athens", "Rome"], correctIndex: 2 },
      { id: "so2", text: "Who has the most Olympic gold medals ever?", options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Mark Spitz"], correctIndex: 1 },
      { id: "so3", text: "Which year were the Olympics first televised?", options: ["1928", "1936", "1948", "1952"], correctIndex: 1 },
      { id: "so4", text: "What sport was added to the 2020 Olympics?", options: ["Skateboarding", "Cricket", "Rugby", "Golf"], correctIndex: 0 },
      { id: "so5", text: "Which city has hosted the most Olympic Games?", options: ["Paris", "London", "Tokyo", "Los Angeles"], correctIndex: 1 },
    ],
  },
]

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: "u1", name: "Alex Chen", avatar: "AC", totalScore: 2850, quizzesCompleted: 32, averageScore: 89, acedCount: 18 },
  { rank: 2, userId: "u2", name: "Sarah Kim", avatar: "SK", totalScore: 2720, quizzesCompleted: 30, averageScore: 91, acedCount: 20 },
  { rank: 3, userId: "u3", name: "Marcus Johnson", avatar: "MJ", totalScore: 2580, quizzesCompleted: 28, averageScore: 92, acedCount: 16 },
  { rank: 4, userId: "u4", name: "Priya Patel", avatar: "PP", totalScore: 2340, quizzesCompleted: 26, averageScore: 90, acedCount: 14 },
  { rank: 5, userId: "u5", name: "James Wilson", avatar: "JW", totalScore: 2100, quizzesCompleted: 25, averageScore: 84, acedCount: 10 },
  { rank: 6, userId: "u6", name: "Emma Davis", avatar: "ED", totalScore: 1980, quizzesCompleted: 23, averageScore: 86, acedCount: 12 },
  { rank: 7, userId: "u7", name: "Ravi Singh", avatar: "RS", totalScore: 1820, quizzesCompleted: 22, averageScore: 83, acedCount: 8 },
  { rank: 8, userId: "current", name: "You", avatar: "YU", totalScore: 0, quizzesCompleted: 0, averageScore: 0, acedCount: 0 },
  { rank: 9, userId: "u8", name: "Olivia Brown", avatar: "OB", totalScore: 1540, quizzesCompleted: 20, averageScore: 77, acedCount: 5 },
  { rank: 10, userId: "u9", name: "Liam Garcia", avatar: "LG", totalScore: 1320, quizzesCompleted: 18, averageScore: 73, acedCount: 3 },
]
