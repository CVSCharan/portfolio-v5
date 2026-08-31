import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProjectsGrid from '@/components/ProjectsGrid'

describe('ProjectsGrid', () => {
  it('renders a list of projects correctly', () => {
    const mockProjects = [
      {
        id: 1,
        title: 'Test Project 1',
        slug: 'test-project-1',
        description: 'This is a test project',
        techStack: ['React', 'Vitest'],
        githubUrl: 'https://github.com/test/1',
        demoUrl: 'https://test.com/1',
        imageUrl: null,
        order: 1,
      },
      {
        id: 2,
        title: 'Test Project 2',
        slug: 'test-project-2',
        description: 'Another test project',
        techStack: ['Next.js'],
        githubUrl: null,
        demoUrl: null,
        imageUrl: '/test.jpg',
        order: 2,
      },
    ]

    render(<ProjectsGrid projects={mockProjects} />)

    // Check title
    expect(screen.getByText('My Projects')).toBeInTheDocument()

    // Check project 1
    expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    expect(screen.getByText('This is a test project')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vitest')).toBeInTheDocument()
    
    const githubLink = screen.getByText('GitHub')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/1')

    const demoLink = screen.getByText('Demo')
    expect(demoLink).toHaveAttribute('href', 'https://test.com/1')

    // Check project 2
    expect(screen.getByText('Test Project 2')).toBeInTheDocument()
    expect(screen.getByText('Another test project')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()

    // Project 2 has no links
    const githubLinks = screen.queryAllByText('GitHub')
    expect(githubLinks).toHaveLength(1) // Only from Project 1
  })

  it('renders an empty state if no projects are provided', () => {
    render(<ProjectsGrid projects={[]} />)
    expect(screen.getByText('My Projects')).toBeInTheDocument()
    const articles = screen.queryAllByRole('article')
    expect(articles).toHaveLength(0)
  })
})
