# Database Schema

The application uses **Prisma 8 Composer** to manage a PostgreSQL database. Below are the core models backing the portfolio:

## Core Models

### `User`
Stores the main profile details for the portfolio owner.
- `id` (Int, PK)
- `name` (String)
- `email` (String, Unique)
- `bio` (String?)
- `avatar` (String?)
- `createdAt` (DateTime)

### `Experience`
Stores professional work history.
- `id` (Int, PK)
- `title` (String)
- `company` (String)
- `period` (String)
- `description` (String?)

### `Skill`
Stores categorized technical skills.
- `id` (Int, PK)
- `name` (String)
- `level` (Int)
- `category` (String)

### `Project`
Stores portfolio projects.
- `id` (Int, PK)
- `title` (String)
- `slug` (String, Unique)
- `description` (String?)
- `techStack` (String[])
- `githubUrl` (String?)
- `demoUrl` (String?)
- `imageUrl` (String?)
- `order` (Int)
- `createdAt` (DateTime)

### `BlogPost`
Content management for the blog.
- `id` (Int, PK)
- `title` (String)
- `slug` (String, Unique)
- `excerpt` (String?)
- `content` (String?)
- `authorId` (Int? -> User)
- `published` (Boolean)
- `viewCount` (Int)
- `createdAt` (DateTime)

### `PageView` (Custom Analytics)
In-App analytics tracker.
- `id` (Int, PK)
- `path` (String)
- `referrer` (String?)
- `userAgent` (String?)
- `createdAt` (DateTime)

### `Admin`
Credentials for the Admin dashboard.
- `id` (Int, PK)
- `username` (String, Unique)
- `password` (String)
- `createdAt` (DateTime)